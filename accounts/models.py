from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = 'ADMIN', 'Admin'
        EXPERT = 'EXPERT', 'Expert'

    # AbstractUser a déjà les champs:
    # username, email, password, first_name, last_name, is_staff, is_active, etc.

    # Nous ajoutons simplement nos champs personnalisés
    role = models.CharField(max_length=50, choices=Role.choices, blank=True, null=True)
    must_change_password = models.BooleanField(default=True)

    # USERNAME_FIELD est déjà 'username' par défaut dans AbstractUser, donc pas besoin de le redéfinir.
    # REQUIRED_FIELDS est ['email'] par défaut, ce qui est parfait.

    def __str__(self):
        return self.username