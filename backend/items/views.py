from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from items.serializers import CategorySerializer, ItemSerializer
from items.models import Category, Item
from items.myPaginations import MyPageNumberPagination

# Create your views here.

User = get_user_model()

class ItemListView(ListAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    # filter backends
    filter_backends = [SearchFilter, OrderingFilter, DjangoFilterBackend, ]
    search_fields = ['name', 'category__name', 'tags__name']        # search will occuer on following fields
    filterset_fields = ['category', 'tags']                         # filter will apply on following fields
    ordering_fields = ['price']                                     # ordering can be done as per price
    pagination_class = MyPageNumberPagination                       # shows 5 items per page

class ItemCreateView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    """
    Create new item
    """
    # def get(self, request, format=None):
    #     items = Item.objects.all()
    #     serializer = ItemSerializer(items, many=True)
    #     return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ItemDetailView(APIView):
    """
    Retrive, Update and Delete Item
    """
    def get(self, request, pk, format=None):
        item = Item.objects.get(id=pk)
        serializer = ItemSerializer(item)
        return Response(serializer.data)

class ItemUpdateDeletelView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    
    def put(self, request, pk, format=None):
        item = Item.objects.get(id=pk)
        serializer = ItemSerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        item = Item.objects.get(id=pk)
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class CategoryListView(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
