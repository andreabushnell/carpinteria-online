from django.db import models

''' 
AbstractUser is part of Django's authentication system, by using it, setting up authentication fields, permissions, etc. from scratch can be avoided.
Additionally, AbstractUser will allow fields to be added later, with User this can be problematic. For more customization, AbstractBaseUser could also be used.
'''
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    ROLE_CHOICES = (
        # A user must be either an admin or a client
        ('admin', 'Admin'),
        ('client', 'Client'), 
    )

    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='client')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            models.Index(fields=['email']),
        ]

    def is_admin(self):
        return self.role == 'admin'