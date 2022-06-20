from django.urls import path

from cart.views import OrderDetailView, OrderCreateView ,OrderItemDetailView, OrderItemCreateView
urlpatterns = [
    path("<int:pk>/", OrderDetailView.as_view()),
    path("create/", OrderCreateView.as_view()),
    path("order_item/<int:pk>/", OrderItemDetailView.as_view()),
    path("order_item/add/", OrderItemCreateView.as_view()),
]