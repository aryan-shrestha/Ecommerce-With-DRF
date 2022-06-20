from django.urls import path
from items.views import CategoryListView, ItemDetailView, ItemListView, ItemCreateView,ItemUpdateDeletelView

urlpatterns = [
    path('list/', ItemListView.as_view()),
    path('create/', ItemCreateView.as_view()),
    path('detail/<int:pk>/', ItemDetailView.as_view()),
    path('update_delete/<int:pk>/', ItemUpdateDeletelView.as_view()),
    path('category_list/', CategoryListView.as_view()),
]