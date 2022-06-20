from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model


from cart.serializers import OrderItemUpdateSerializer, OrderSerializer, OrderItemSerializer
from cart.models import Order, OrderItem
from items.models import Item
# Create your views here.

User = get_user_model()

class OrderItemDetailView(APIView):
    
    permission_classes = [IsAuthenticated]

    """
    Retrieve, Update and Delete order item
    Update details of cart Item basically change quantity of the item or remove the item from the cart
    """
    def get(self, request, pk, format=None):
        order_item = OrderItem.objects.get(id=pk)
        serializer = OrderItemSerializer(order_item)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        order_item = OrderItem.objects.get(id=pk)
        serializer = OrderItemUpdateSerializer(order_item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        order_item = OrderItem.objects.get(id=pk)
        order_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class OrderItemCreateView(APIView):
    permission_classes = [IsAuthenticated]
    """
    Create a new order Item,
    Add to Cart 
    """
    def post(self, request, format=None):
        serializer = OrderItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
class OrderDetailView(APIView):
    permission_classes = [IsAuthenticated]
    """
    List all th orders/carts of the requested user
    """
    def get(self, request, pk, format=None):
        user = User.objects.get(id=pk)
        order = Order.objects.filter(user=user, complete=False)
        serializer = OrderSerializer(order, many=True)
        return Response(serializer.data)

class OrderCreateView(APIView):
    permission_classes = [IsAuthenticated]
    """
    Create a new order object
    create new cart after existing cart checks out
    """
    def post(self, request, format=None):
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)