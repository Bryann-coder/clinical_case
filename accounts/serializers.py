from rest_framework import serializers
from django.contrib.auth import get_user_model, password_validation
from django.utils.crypto import get_random_string

CustomUser = get_user_model()

class UserCreateSerializer(serializers.ModelSerializer):
    """
    Serializer pour la création de nouveaux utilisateurs par un admin.
    Génère un mot de passe temporaire.
    """
    class Meta:
        model = CustomUser
        # On utilise maintenant username et email
        fields = ('id', 'username', 'email', 'role') 

    def create(self, validated_data):
        temporary_password = get_random_string(10)
        
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''), # L'email est maintenant requis par le modèle
            role=validated_data['role'],
            password=temporary_password
        )
        
        user.temporary_password = temporary_password
        return user

class ChangePasswordSerializer(serializers.Serializer):
    """
    Serializer pour que l'utilisateur change son mot de passe.
    """
    new_password = serializers.CharField(required=True, style={'input_type': 'password'})

    def validate_new_password(self, value):
        password_validation.validate_password(value, self.context['request'].user)
        return value

    def save(self):
        user = self.context['request'].user
        user.set_password(self.validated_data['new_password'])
        user.must_change_password = False
        user.save()
        return user