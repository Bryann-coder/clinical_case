from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate, get_user_model
from .serializers import UserCreateSerializer, ChangePasswordSerializer
from .permissions import IsAdminUser

CustomUser = get_user_model()

class LoginView(APIView):
    """
    Vue pour l'authentification des utilisateurs.
    Prend 'username' et 'password' et retourne un token d'authentification.
    """
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        # On attend 'username' au lieu de 'name'
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({'error': 'Username and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

        # On authentifie avec 'username'
        user = authenticate(request, username=username, password=password)

        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'user_id': user.pk,
                'username': user.username, # On retourne 'username'
                'role': user.role,
                'must_change_password': user.must_change_password,
            })
        
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class UserCreateView(generics.CreateAPIView):
    """
    Vue pour créer un nouvel utilisateur. Accessible uniquement par les administrateurs.
    """
    queryset = CustomUser.objects.all()
    serializer_class = UserCreateSerializer
    permission_classes = [IsAdminUser]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        return Response({
            'message': 'User created successfully.',
            'user_id': user.id,
            'username': user.username, # On retourne 'username'
            'role': user.role,
            'temporary_password': user.temporary_password
        }, status=status.HTTP_201_CREATED)


class ChangePasswordView(generics.GenericAPIView):
    """
    Vue pour que l'utilisateur connecté change son mot de passe.
    """
    serializer_class = ChangePasswordSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message': 'Password changed successfully.'}, status=status.HTTP_200_OK)