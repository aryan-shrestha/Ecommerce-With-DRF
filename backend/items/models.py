from django.db import models

# Create your models here.

class Tags(models.Model):
    name = models.CharField(max_length=50, null=True, blank=True)
    
    def __str__(self):
        return self.name

class Category(models.Model):
    name = models.CharField(max_length=50, null=True, blank=True)

    def __str__(self):
        return self.name

class Item(models.Model):
    name = models.CharField(max_length=50, null=True, blank=True)
    price = models.IntegerField(default=0, null=True, blank=True)
    category = models.ForeignKey(Category, null=True, blank=True, on_delete=models.CASCADE, related_name="item_category")
    tags = models.ManyToManyField(Tags, related_name="item_tags", null=True, blank=True)
    quantity = models.IntegerField(default=0, null=True, blank=True)
    image = models.ImageField(upload_to='images/', null=True, blank=True)

    def __str__(self):
        return self.name