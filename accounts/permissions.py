from rest_framework import permissions

class IsAdminUser(permissions.BasePermission):
    """
    Permission personnalisée pour autoriser uniquement les utilisateurs avec le rôle 'ADMIN'.
    """
    def has_permission(self, request, view):
        # L'utilisateur doit être authentifié et avoir le rôle ADMIN
        return request.user and request.user.is_authenticated and request.user.role == 'ADMIN'