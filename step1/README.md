# Labo HTTP Infra

## Etape 1 : Serveur HTTP statique sous nginx

Hadrien Louis & Théo Mirabile

## Choix de l'environnement

Pour cette partie, nous avons décidé de choisir le serveur web `nginx` car il comporte également des fonctionnalités de `reverse-proxy` qui nous seront utiles pour la suite.

## Construction de l'image Docker

Pour construire l'image Docker, nous avons tout d'abord créé un Dockerfile en y spécifiant tout le nécessaire afin de faire tourner nginx. Pour ce faire, il faut se baser sur la dernière image nginx puis exposer le port 80 et ne surtout pas oublier de copier les sources du projet dans `/data/www` ainsi que copier le fichier de configuration nginx au bon emplacement `/etc/nginx/nginx.conf`

Nous avons également choisi de reproduire cette étape mais cette fois-ci en utilisant `docker compose` car cela permet de combiner plusieurs services (donc plusieurs images Docker) en un seul container. Bien que cela ne soit pas indispensable pour cette partie (car nous ne déployons qu'un seul service qui est nginx) cela nous a semblé judicieux car on peut y spécifier les ports et volumes directement ce qui simplifie l'utilisation et cela nous sera très utile par la suite. Il y a donc dans ce dossier un fichier `docker-compose.yml` contenant toute la configuration nécessaire pour faire tourner nginx. Que le container soit lancé via le Dockerfile ou via `docker-compose` le résultat est le même. 

## Site web statique

Le template du site web statique a été récupéré sur le site [HTML5 UP](https://html5up.net/). Quelques modifications ont été faites afin de l'adapter au projet

## Configuration nginx

Pour configurer correctement nginx et comme indiqué plus haut, un fichier de configuration `nginx.conf` a été créé et est ensuite copié dans le container au bon emplacement. Ce fichier contient les instructions de bases pour faire tourner un serveur nginx minimal et remplace ainsi le fichier de configuration de base de nginx.

```nginx
http {
    server {
        # Specifies the root directory that will be used to search for a file
        root /data/www;

        # Defines files that will be used as an index.  
        index index.html;

        # Configures logging
        error_log  /var/log/nginx/error.log;
        access_log /var/log/nginx/access.log;
        
        # Sets configuration depending on a request URI. 
        location / {
            root /data/www;
            index index.html;
            include  /etc/nginx/mime.types;
        }
    }
}
```

## Différences entre Dockerfile et `docker-compose`

Une différence importante qu'il y a entre la lancement de notre container nginx via le Dockerfile ou via `docker-compose` concerne les fichiers. En effet lors du lancement avec le Dockerfile, l'instruction `COPY` va copier les fichiers à l'emplacement souhaité. Cependant, avec `docker-compose` des "volumes" sont créés mais de type "bind-mounts" dans notre cas. Cela signifie que par exemple le fichier de configuration `nginx.conf` est monté dans le container.  

La différence entre un volume est un bind mounts est définie ainsi :

> When you use a bind mount, a file or directory on the host machine is mounted into a container. The file or directory is referenced by its absolute path on the host machine. By contrast, when you use a volume, a new directory is created within Docker’s storage directory on the host machine, and Docker manages that directory’s contents.

L'avantage dans notre cas est qu'avec l'utilisation de bind-mounts, la configuration nginx peut être modifiée à la volée et en la rechargeant elle peut être de suite prise en compte. Il n'est plus nécessaire de redémarrer le container comme avec les Dockerfile.

## Scripts

Comme pour le laboratoire précédent, nous avons décidé de créer 4 différents scripts bash nous permettant de nous simplifier la tâche lors de la manipulation des containers. Ces divers scripts se retrouvent de manière similaire dans presque toutes les étapes de ce labo car ils sont très pratiques. Voici leur fonctionnalité :

- `build-images.sh` Permet de construire le/les images de l'étape en question
- `start.sh` Permet de démarrer le/les containers basés sur les images créées précédemment. De manière générale, les containers ont souvent un port de mappé
- `stop.sh` Permet de stopper le/les containers
- `start_noport.sh` Permet de démarrer le/les containers basés sur les images créées précédemment mais cette fois ci sans mapper de port.
