from select import select
from statistics import mode
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# Create your models here.
class UserManager(BaseUserManager):
    def create_user(self, username, password, email,**extra_fields):
        """
        Creates and saves a Usser with the given email and password.
        """
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self, username, email, password, **extra_fields):
        """
        create and save a superuser  with the given email and password.
        """
        extra_fields.setdefault("is_admin", True)
        extra_fields.setdefault("is_active", True)
        extra_fields.setdefault("is_staff", True)
        return self.create_user(username, password, email, **extra_fields)

class User(AbstractBaseUser):
    username = models.CharField(max_length=40, unique=True)
    email = models.CharField(max_length=50, unique=True)
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    REQUIRED_FIELDS = ['email', 'first_name', 'last_name']
    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'email'

    objects = UserManager()
    
    def __str__(self):
        return self.email
    
    def has_perm(user, perm, obj=None):
        # Does the use have a specific permission?
        # Simplest possible answer: Yes, always
        return True
    
    def has_module_perms (self, app_label):
        # Does the user have permissions to view the app 'app_label'?
        # simplest possible answer: Yes, always
        return True

class UserAddress(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_address", blank=True, null=True)
    label = models.CharField(max_length=200, null=True)
    district = models.CharField(max_length=200, null=True)
    city = models.CharField(max_length=50, null=True)
    postal_code = models.CharField(max_length=8, null=True)
    telephone = models.CharField(max_length=10, null=True)
    mobile_no = models.CharField(max_length=16, null=True)

    def __str__(self):
        return self.user_id.username 