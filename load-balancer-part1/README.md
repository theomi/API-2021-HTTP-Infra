# Labo HTTP Infra

## Load balancing: avec plusieurs serveurs noeuds

Hadrien Louis & Théo Mirabile

| ⚠ Cette partie utilise Traefik. Pour savoir comment nous l'avons installé / configuré, se rendre [à cette partie](https://github.com/theomi/API-2021-HTTP-Infra/tree/master/traefik) |
| - |

## Introduction

L'intérêt du _load balancing_ (équilibrage des charges) est qu'il est facile d'adapter le nombre de serveurs HTTP au nombre de requêtes client, et ce en temps réel. De plus, cela permet de prévenir l'indisponibilité du service en cas de panne d'un serveur, car le système de load balancing va aiguiller les requêtes vers un autre serveur disponible.

Dans ces deux parties additionnelles, nous mettons en œuvre deux manières de déterminer sur quel serveur la requête est aiguillée :

- le _round-robin_, qui va attribuer tour à tour chaque requête à un serveur différent, et ce de manière cyclique (deux requêtes consécutives d'un même client vont donc être attribuées à deux serveurs HTTP distincts)
- le _sticky session_, qui, par le biais d'un cookie, va attribuer un serveur HTTP fixe à chaque client. Deux requêtes consécutives de ce même client seront donc traitées par le même serveur HTTP.

Dans les deux cas, si le serveur censé traiter la requête n'est plus disponible, le _load balancer_ va sélectionner un serveur alternatif pour traiter cette requête.

## Utilisation de `whoami`

Afin de faciliter les tests du bon fonctionnement de l'infrastructure, nous avons décidé d'utiliser l'image `traefik/whoami` qui consiste en un serveur HTTP basique qui, à chaque requête, retourne les en-têtes détaillés de cette dernière.
Voici un exemple d'utilisation :
![Exemple d'utilisation de whoami](figures/whoami_example.png)

Pour la suite de cette partie, nous allons donc démarrer plusieurs instances de whoami en parallèle, puis effectuer des requêtes. Cela permettra de voir sur quelle instance la requête a été aiguillée.

## Mise en place

Commençons par ajouter un nouveau service à notre fichier `docker-compose.yml` :

```
  # On nomme le service "whoami"
whoami:
    image: traefik/whoami # On demande à utiliser l'image de whoami
    restart: always       # Configure le redémarrage automatique
    depends_on:
      - reverse-proxy   # Le service n'est lancé qu'après le reverse proxy
    networks:
      - net-rproxy        # On ajoute le service au même réseau Docker
```

De plus, nous devons ajouter les `labels` liés à Traefik, comme expliqué dans la partie précédente. La configuration finale est la suivante :

```
  whoami:
    image: traefik/whoami
    restart: always
    labels:
      - traefik.enable=true
      - traefik.http.routers.whoami.rule=Host(`localhost`) && PathPrefix(`/whoami`)
      - traefik.http.routers.whoami.middlewares=whoami-stripprefix
      - traefik.http.middlewares.whoami-stripprefix.stripprefix.prefixes=/whoami
      - traefik.http.routers.whoami.entrypoints=web
    depends_on:
        - reverse-proxy
    networks:
      - net-rproxy
```

## Scalabilité des instances

Grâce à Docker compose, il est très facile de créer des instances multiples d'un même service en utilisant l'option `--scale` dans la commande de lancement.

Dans le cadre de ce laboratoire, nous avons décidé de créer 4 instances de whoami.

## Round-robin par défaut
