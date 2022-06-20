from django.contrib import admin
from items.models import Tags, Category, Item

# Register your models here.

admin.site.register(Tags)
admin.site.register(Category)
admin.site.register(Item)