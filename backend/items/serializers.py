from django.contrib.auth import get_user_model
from rest_framework import serializers

from items.models import Tags, Category, Item

User = get_user_model()

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tags
        fields = ['id','name']

class CategorySerializer(serializers.ModelSerializer):
   
    class Meta:
        model = Category
        fields = ['id','name']

class ItemSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    category = CategorySerializer(required=False)
    tags = TagSerializer(many=True, required=False)
    class Meta: 
        model = Item
        fields = ['id','name', 'price', 'category', 'tags', 'quantity', 'image']

    def create(self, validated_data):
        category_data = validated_data.pop('category')
        tags_data = validated_data.pop('tags')
        category, category_created = Category.objects.get_or_create(name=category_data.get('name'))
        item = Item.objects.create(**validated_data, category=category)
       
        for tag_data in tags_data:
            tag, tag_created = Tags.objects.get_or_create(name=tag_data.get('name'))
            item.tags.add(tag)
            item.save()

        return item

    def update(self, instance, validate_data):
        category_data = validate_data.pop('category')
        tags_data = validate_data.pop('tags')
        category, category_created = Category.objects.get_or_create(name=category_data.get('name'))
        instance.name = validate_data.get('name', instance.name)
        instance.price = validate_data.get('price', instance.price)
        instance.quantity = validate_data.get('quantity', instance.quantity)
        instance.image = validate_data.get('image', instance.image
        )
        instance.category = category
        instance.tags.clear()
        instance.save() 

        for tag_data in tags_data:
            tag, tag_created = Tags.objects.get_or_create(name=tag_data.get('name'))
            instance.tags.add(tag)
            instance.save()
        return instance
