from this import s
from django.db import models
from django.contrib.auth import get_user_model

from items.models import Item
# Create your models here.

User = get_user_model()

class Order(models.Model):
   user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
   date_ordered = models.DateTimeField(auto_now_add=True, null=True, blank=True)
   complete = models.BooleanField(default=False, null=True, blank=True)
   transaction_id = models.CharField(max_length=200, null=True, blank=True)
   total = models.IntegerField(default=0, null=True, blank=True)

   def __str__(self):
       return f"{self.user.username}_completed_{self.complete}"
    
   def calculate_cart_total(self):
       cart_total = 0
       items = self.order_items.all()

       for item in items:
           sub_total = item.item.price * item.quantity
           cart_total += sub_total
       
       self.total = cart_total
       self.save()

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, null=True, blank=True, related_name="order_items")
    item = models.ForeignKey(Item, on_delete=models.CASCADE, null=True, blank=True)
    quantity = models.IntegerField(default=1, blank=True, null=True)

    def __str__(self):
        return f"{self.order.id}_{self.item.name}"

