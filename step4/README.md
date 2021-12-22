# Labo HTTP Infra

## Etape 1 : Serveur HTTP statique sous nginx

Hadrien Louis & Théo Mirabile

---

## Choix de l'environnement

Pour cette partie, nous avons décidé de choisir le serveur web `nginx` car il comporte également des fonctionnalités de `reverse-proxy` qui nous seront utiles pour la suite.

## Construction de l'image Docker

Pour construire l'image Docker, nous avons choisi d'utiliser `docker compose` car cela permet de combiner plusieurs services (donc plusieurs images Docker) en un seul container. Bien que cela ne soit pas indispensable pour cette partie (car nous ne déployons qu'un seul service qui est nginx) cela nous a semblé judicieux car on peut y spécifier les ports et volumes directement ce qui simplifie l'utilisation.

## Volumes

Nous avons effectué deux liaisons entre le container et le système de fichiers hôte :

- Le fichier de configuration `nginx.conf`, permettant de modifier la configuration du serveur web
- Le répertoire `src`qui contient tous les fichiers sources de notre site web statique
