from django.db.models.signals import post_save
from django.dispatch import receiver

from django.core.mail import EmailMessage
from django.conf import settings
from django.template.loader import render_to_string

from cart.models import Order

@receiver(post_save, sender=Order)
def post_save_create_new_order(sender, instance, created, **kwargs):

    if instance.complete == True:
        obj = Order.objects.create(user=instance.user)

@receiver(post_save, sender=Order)
def post_save_send_order_confirmation_mail(sender, instance, created, **kwargs):

    template = render_to_string('cart/email_template.html', {'username': instance.user.username, 'transaction_id': instance.transaction_id})

    if instance.complete == True:
        email = EmailMessage(
            'Order has been placed',
            template,
            settings.EMAIL_HOST_USER,
            ['aryanshrestha183@gmail.com'],
        )
        email.fail_silently = False
        email.send()
        print("email send")