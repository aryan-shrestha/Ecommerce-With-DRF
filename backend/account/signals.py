from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model

from cart.models import Order

User = get_user_model()

@receiver(post_save, sender=User)
def post_save_create_user_cart(sender, instance, created, **kwargs):
    
    if created:
        Order.objects.create(user=instance)
