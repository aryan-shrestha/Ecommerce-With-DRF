from django.contrib import admin
from account.models import User, UserAddress


# Register your models here.

admin.site.register(User)
admin.site.register(UserAddress)