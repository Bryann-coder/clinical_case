# Clinical Case API

Ce projet est une API REST développée avec Django et Django Rest Framework. L'objectif est de fournir un backend pour une application de gestion de cas cliniques. La première fonctionnalité implémentée est un service d'authentification robuste et sécurisé.

Le projet est configuré pour utiliser une base de données PostgreSQL, hébergée sur Railway pour la production et le staging, et peut être utilisé avec une base de données locale (PostgreSQL ou SQLite) pour le développement.

## Fonctionnalités Actuelles

*   **Authentification par Token** : Connexion sécurisée via des tokens d'API.
*   **Gestion des Rôles** : Deux types d'utilisateurs sont définis : `ADMIN` et `EXPERT`.
*   **Création d'Utilisateurs Contrôlée** : Seuls les administrateurs peuvent créer de nouveaux comptes.
*   **Flux de Premier Mot de Passe** : Un mot de passe temporaire est généré à la création d'un compte, et l'utilisateur est forcé de le changer lors de sa première connexion.

## Structure du Projet

Voici une description de l'utilité de chaque fichier et dossier clé du projet.

```
clinical_case/
├── .env                  # Fichier (ignoré par git) pour stocker les secrets et variables d'environnement.
├── manage.py             # Utilitaire de ligne de commande pour interagir avec le projet Django.
├── README.md             # Ce fichier.
|
├── accounts/             # Notre application Django dédiée à la gestion des comptes utilisateurs.
│   ├── migrations/       # Contient les fichiers de migration de la base de données pour cette app.
│   ├── __init__.py       # Indique que 'accounts' est un package Python.
│   ├── admin.py          # Configure l'affichage des modèles de cette app dans l'interface d'admin.
│   ├── apps.py           # Fichier de configuration de l'application 'accounts'.
│   ├── models.py         # Définit la structure de la base de données (le modèle CustomUser).
│   ├── permissions.py    # Contient les classes de permission personnalisées pour l'API.
│   ├── serializers.py    # Définit comment les données du modèle sont converties en JSON (et vice-versa).
│   ├── tests.py          # Fichier pour écrire les tests unitaires de l'application.
│   ├── urls.py           # Définit les routes (endpoints) spécifiques à l'application 'accounts'.
│   └── views.py          # Contient la logique métier des endpoints de l'API (ex: login, createUser).
|
└── cases_api/            # Le package principal du projet Django.
    ├── __init__.py       # Indique que 'cases_api' est un package Python.
    ├── asgi.py           # Point d'entrée pour les serveurs web asynchrones (non utilisé pour l'instant).
    ├── settings.py       # Fichier principal de configuration du projet (apps, base de données, etc.).
    ├── urls.py           # Fichier principal des routes du projet. Il inclut les urls des autres apps.
    └── wsgi.py           # Point d'entrée pour les serveurs web synchrones (le plus commun).
```

## Installation et Lancement

Suivez ces étapes pour mettre en place un environnement de développement local.

1.  **Cloner le dépôt**
    ```bash
    git clone <url_de_votre_depot>
    cd clinical_case
    ```

2.  **Créer et activer un environnement virtuel**
    ```bash
    # Pour Windows
    python -m venv venv
    .\venv\Scripts\activate

    # Pour macOS/Linux
    python3 -m venv venv
    source venv/bin/activate
    ```

3.  **Installer les dépendances**
    D'abord, créez un fichier `requirements.txt` s'il n'existe pas :
    
    Puis installez les dépendances :
    ```bash
    pip install -r requirements.txt
    ```

4.  **Configurer les variables d'environnement**
    Créez un fichier `.env` à la racine du projet en vous basant sur votre configuration. Pour un développement local avec SQLite (plus simple) :
    ```env
    # Fichier .env pour développement local avec SQLite
    # Aucune variable n'est nécessaire, Django utilisera SQLite par défaut si DATABASE_URL est absente.
    # Assurez-vous que settings.py a une configuration de fallback pour SQLite.
    ```
    Pour un développement local avec PostgreSQL :
    ```env
    # Fichier .env pour développement local avec PostgreSQL
    DATABASE_URL=postgres://VOTRE_USER:VOTRE_PASS@localhost:5432/VOTRE_DB_NAME
    ```

5.  **Lancer les migrations**
    Cette commande crée les tables dans votre base de données en se basant sur les modèles.
    ```bash
    python manage.py migrate
    ```

6.  **Créer un super-utilisateur (Admin)**
    Suivez les instructions pour créer votre premier compte administrateur.
    ```bash
    python manage.py createsuperuser
    ```
    **Important :** Après la création, assignez-lui le rôle `ADMIN` :
    ```bash
    python manage.py shell
    >>> from accounts.models import CustomUser
    >>> admin = CustomUser.objects.get(username='votre_username_admin')
    >>> admin.role = 'ADMIN'
    >>> admin.must_change_password = False
    >>> admin.save()
    >>> exit()
    ```

7.  **Lancer le serveur de développement**
    ```bash
    python manage.py runserver
    ```
    L'API sera accessible à l'adresse `http://127.0.0.1:8000`.

## Commandes et Pratiques de Base

### Gestion des Migrations

Les migrations sont la façon dont Django propage les changements de vos modèles (dans `models.py`) à votre base de données.

*   **Pour détecter les changements et créer un fichier de migration :**
    Chaque fois que vous modifiez un modèle (ajoutez un champ, supprimez un modèle, etc.), vous devez lancer cette commande.
    ```bash
    python manage.py makemigrations accounts
    ```
    Cela créera un nouveau fichier dans `accounts/migrations/`.

*   **Pour appliquer les migrations à la base de données :**
    Cette commande exécute les fichiers de migration qui n'ont pas encore été appliqués.
    ```bash
    python manage.py migrate
    ```

*   **Pour annuler toutes les migrations d'une application (utile en cas de conflit) :**
    **Attention :** cela supprime les tables de la base de données pour cette application.
    ```bash
    python manage.py migrate accounts zero
    ```

### Utilisation du Shell Django

Le shell interactif vous permet d'exécuter du code Python dans le contexte de votre projet Django. C'est extrêmement utile pour le débogage et la manipulation de données.

```bash
python manage.py shell
```

### Tester l'API

Il est recommandé d'utiliser un client API comme [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/) pour tester les endpoints. Les principaux endpoints actuels sont :

| Méthode | Endpoint                    | Description                                       | Accès         |
| :------ | :-------------------------- | :------------------------------------------------ | :------------ |
| `POST`  | `/api/auth/login/`          | Se connecter pour obtenir un token.               | Public        |
| `POST`  | `/api/auth/users/create/`   | Créer un nouvel utilisateur (Expert ou Admin).    | Admin requis  |
| `POST`  | `/api/auth/change-password/`| Changer le mot de passe de l'utilisateur connecté. | Authentifié   |