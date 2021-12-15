# Labo HTTP Infra

## Etape 2 : Serveur HTTP dynamique avec express.js

Hadrien Louis & Théo Mirabile

---

## Installation de node.js et de Chance.js

### Initialisation du projet npm

On crée tout d'abord un répertoire `src` qui contiendra les sources de notre application web.

- On initialise ensuite un projet npm :

```sh
npm init
```

On peut donner un nom à notre projet, une version, un descriptif, le nom de notre point d'entrée, et d'autres informations. Dans le cas de ce labo, nous avons renseigné le nom et la version par défaut, ainsi que le nom de l'auteur.

### Installation de Chance.js

Pour installer Chance.js, on lance la commande

```sh
npm install chance
```

dans le répertoire de notre projet npm (`src`).

## Création du Dockerfile et construction de l'image

Il faut tout d'abord créer un Dockerfile qui va effectuer les opérations suivantes :

- Récupérer la dernière version de l'image de node.js sur Docker Hub

- Copier les sources de notre application web sur le container

- Demander à node de lancer l'application

Au final, le contenu du fichier Dockerfile est :

```
FROM node:16.13.1

WORKDIR ../
COPY ./src /opt/app

CMD ["node", "/opt/app/index.js"]
```

On peut ensuite construire notre image Docker en exécutant la commande suivante, dans le même répertoire que celui du Dockerfile :

```
docker build -t theomi/no
de .
```

## Installation de express.js

Pour installer express.js, il suffit d'exécuter cette commande dans le répertoire de notre projet npm :

```sh
npm install --save express
```

## Implémentation de l'application web

On doit tout d'abord créer nos variables afin d'instancier :

```js
// Instanciation de Chance.js
let Chance = require("chance");
let chance = new Chance();

// Instanciation d'express.js
let express = require("express");
const { accepts } = require("express/lib/request");
let app = express();
```
