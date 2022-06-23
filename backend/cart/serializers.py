from re import sub
import uuid
from django.contrib.auth import get_user_model
from rest_framework import serializers

from cart.models import Order, OrderItem
from items.serializers import ItemSerializer
from items.models import Item

User = get_user_model()

class OrderItemSerializer(serializers.ModelSerializer):
    item = ItemSerializer()

    class Meta: 
        model = OrderItem
        fields = ['id', 'order','item', 'quantity']
    
    def create(self, validated_data):
        item_data = validated_data.pop('item')
        order_id = validated_data.pop('order').id
        item = Item.objects.get(id=item_data.get('id'))
        order = Order.objects.get(id=order_id)
        order_item, created = OrderItem.objects.get_or_create(order=order, item=item)
        print(order_item, created)
        if not created:
            print("Item already exists")
            order_item.quantity += 1
            order_item.save()
        return order_item

class OrderItemUpdateSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = OrderItem
        fields = ['id', 'quantity']

    def update(self, instance,validate_data):

        instance.quantity = validate_data.get('quantity', instance.quantity)
        print(instance.quantity)
        instance.save()
        # calculating cart total after updating quantity
        cart = instance.order
        cart_items = cart.order_items.all()
        cart_total = 0
        
        for item in cart_items:
            sub_total = item.item.price * item.quantity
            cart_total += sub_total

        cart.total = cart_total
        cart.save()
        print("cart total calculated")
        print("cart total: ", cart.total)
        

        return instance


class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True, required=False)

    class Meta:
        model = Order
        fields = ['id', 'user', 'date_ordered', 'complete', 'transaction_id','order_items', 'total']
    
    def create(self, validated_data):
        print(f"validated_data: {validated_data}")
        
        user_id = validated_data.pop('user').id
        print(f"user_id: {user_id}")
        user = User.objects.get(id=user_id)
        order = Order.objects.create(user=user)
        return order

    def update(self, instance, validated_data):
        instance.transaction_id = uuid.uuid1()
        instance.complete = True
        instance.save()

        return instance