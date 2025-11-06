from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    # Ajout de nos champs personnalisés à l'affichage en liste
    list_display = ('username', 'email', 'role', 'is_staff', 'must_change_password')
    
    # Ajout de nos champs personnalisés aux formulaires d'édition et de création
    # On prend les fieldsets de base de UserAdmin et on ajoute une nouvelle section
    fieldsets = UserAdmin.fieldsets + (
        ('Custom Fields', {'fields': ('role', 'must_change_password')}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ('role',)}),
    )

admin.site.register(CustomUser, CustomUserAdmin)