# Labo HTTP Infra

## Load balancing: round-robin vs sticky sessions

Hadrien Louis & Théo Mirabile

| ⚠ Cette partie utilise Traefik. Pour savoir comment nous l'avons installé / configuré, se rendre [à cette partie](https://github.com/theomi/API-2021-HTTP-Infra/tree/master/traefik) |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |

## Introduction

L'intérêt du _load balancing_ (équilibrage des charges) est qu'il est facile d'adapter le nombre de serveurs HTTP au nombre de requêtes client, et ce en temps réel. De plus, cela permet de prévenir l'indisponibilité du service en cas de panne d'un serveur, car le système de load balancing va aiguiller les requêtes vers un autre serveur disponible.

Dans cette partie, nous mettons en œuvre deux manières de déterminer sur quel serveur la requête est aiguillée :

- le _round-robin_, qui va attribuer tour à tour chaque requête à un serveur différent, et ce de manière cyclique (deux requêtes consécutives d'un même client vont donc être attribuées à deux serveurs HTTP distincts)
- le _sticky session_, qui, par le biais d'un cookie, va attribuer un serveur HTTP fixe à chaque client. Deux requêtes consécutives de ce même client seront donc traitées par le même serveur HTTP.

Dans les deux cas, si le serveur censé traiter la requête n'est plus disponible, le _load balancer_ va sélectionner un serveur alternatif pour traiter cette requête.

## Installation

Afin de faciliter les tests du bon fonctionnement de l'infrastructure, nous avons décidé d'utiliser l'image `traefik/whoami` qui consiste en un serveur HTTP basique qui, à chaque requête, retourne les en-têtes détaillés de cette dernière.

![Exemple d'utilisation de whoami](figures/whoami_example.png)

## Résultat obtenu
