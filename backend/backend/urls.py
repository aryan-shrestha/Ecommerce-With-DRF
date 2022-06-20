from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


from rest_framework.views import APIView
from rest_framework.response import Response


class ApiHomeView(APIView):
    
    def get(self, request, format=None):
        urlPatterns = {
            'api/token/': 'get refresh and access token',
            'api/token/refresh/': 'get new access token using refresh token',
            'user/list/': 'get users list and create new user',
            'user/detail/<int:pk>/': 'get user details',
            'user/change_password/<int: pk>/': 'get user details',
            
            'item/list/': 'list all items',
            'item/create': 'create new items',
            'item/detail/<int:pk>/': 'details of an item',
            'item/update_delete/<int:pk>/': 'updating item detail allowed for admin only',
            '/item/list/?search=shirt' : 'search given keyword',
            
            'cart/create/': 'create new cart after an exsiting car is checked out',
            'cart/<int:pk>/' : 'active user id, gets current user cart',
            
            'cart/order_item/add/': 'add item to cart',
            'cart/order_item/<int:pk>': 'update quantity or remove item from cart',
        }

        return Response(urlPatterns)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

urlpatterns = [
    path('', TemplateView.as_view(template_name="index.html")),
    path('admin/', admin.site.urls),
    path('user/', include('account.urls')),
    path('item/', include('items.urls')),
    path('cart/', include('cart.urls')),
    path('api/', ApiHomeView.as_view()),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]


urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)



"""
api/token/                      get refresh and access token
api/token/refresh/              get new access token using refresh token

user/list/                      get users list
user/detail/<int:pk>/           get user details
user/change_password/<int:pk>/  change password

item/list/                      list all items
item/detail/<int:pk>/           details of an item
update_delete/<int:pk>/         allowed for admin only

cart/<int:pk>/                  active user id, gets current user cart
cart/create/                    create new cart after an existing cart is check out
order_item/add/                 add item to cart
cart/order_item/<int:pk>        update quanity or remove item from a cart

"""