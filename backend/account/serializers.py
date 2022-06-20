from statistics import mode
from wsgiref import validate
from django.contrib.auth import get_user_model
from rest_framework import serializers


from account.models import UserAddress

User = get_user_model()

class UserAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAddress
        fields = ['label', 'district', 'city', 
                'postal_code','telephone', 'mobile_no']

class UserCreateSerializer(serializers.ModelSerializer):
    user_address = UserAddressSerializer(many=True, required=False)
    password = serializers.CharField(write_only=True, required=True)
    class Meta:
        model = User
        fields = ['pk','username', 'email', 'password', 'first_name', 'last_name', 'user_address']

    def create(self, validated_data):
        addresses_data = validated_data.pop('user_address')
        password = validated_data.pop('password')
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        for address_data in addresses_data:
            address = UserAddress.objects.create(user_id=user, **address_data)
        return user
    
class UserUpdateSerializer(serializers.ModelSerializer):
    """
    This serializer doesnot require password field
    """
    user_address = UserAddressSerializer(many=True)
    class Meta:
        model = User
        fields = ['username', 'email','first_name', 'last_name', 'user_address']

    def update(self, instance, validated_data):
        addresses_data = validated_data.pop('user_address')
        addresses = (instance.user_address).all()
        addresses = list(addresses)
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.save()

        for address_data in addresses_data:
            address = addresses.pop(0)
            address.label = address_data.get('label', address.label)
            address.district = address_data.get('district', address.district)
            address.city = address_data.get('city', address.city)
            address.postal_code = address_data.get('postal_code', address.postal_code)
            address.telephone = address_data.get('telephone', address.telephone)
            address.mobile_no = address_data.get('mobile_no', address.mobile_no)
            address.save()
        return instance

class UserPasswordChangeSerializer(serializers.ModelSerializer):
    """
    This serializer is to change the password
    """
    old_password = serializers.CharField(write_only=True, required=True) 
    password = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model= User
        fields = ('old_password', 'password', 'password2')
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "password fields didn't match."})
        
        return attrs
    
    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError({"old_password": "Old password is not correct"})
        return value

    def update(self, instance, validated_data):
        instance.set_password(validated_data['password'])
        instance.save()

        return instance