from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model


from cart.serializers import OrderItemUpdateSerializer, OrderSerializer, OrderItemSerializer
from cart.models import Order, OrderItem

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


    # Returns cart
    def put(self, request, pk, format=None):
        order_item = OrderItem.objects.get(id=pk)
        serializer = OrderItemUpdateSerializer(order_item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            cart = OrderSerializer(order_item.order).data
            print("views line 38, Cart Total: ", order_item.order.total)
            return Response(cart, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        order_item = OrderItem.objects.get(id=pk)
        order = order_item.order
        order_item.delete()
        order.calculate_cart_total()
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
    List all the orders/carts of the requested user
    """
    # requires user id 
    def get(self, request, pk, format=None):
        user = User.objects.get(id=pk)
        order = Order.objects.filter(user=user, complete=False)[0]
        serializer = OrderSerializer(order)
        return Response(serializer.data)
    
    # requires cart id 
    def put(self, request, pk, format=None):
        order = Order.objects.get(id=pk)
        serializer = OrderSerializer(order, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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