from django.urls import path
from account.views import UserListView, UserDetailView, UserPasswordChangeView

urlpatterns = [
    path('list/', UserListView.as_view()),
    path('detail/<int:pk>/', UserDetailView.as_view()),
    path('change_password/<int:pk>/', UserPasswordChangeView.as_view())
]