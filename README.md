# Coconut Play API

OTINA Dylan Code permanent : OTID17029902

### Installation

Avant tous, il vous faudra installer les librairies dont aura besoin cette application web pour fonctionner.

Pour ce faire, executer la commande suivante :

```
npm install
```

### Database

J'ai utilisé principalement MongoDB Atlas, la version Cloud de MongoDB. Si vous voulez utiliser la version locale, il faut faire deux,trois changements très simples avant de lancer l'application :

```
Aller dans le fichier .env et changer l'URI par votre adresse pour votre database locale.
Décommenter le code permettant la génération de données dans votre database.
Commenter la ligne app.listen étant donné qu'il y aura un doublon.
```

Si vous voulez utiliser la version cloud, vous n'avez rien à faire de plus que de lancer l'application.

### Lancer l'application

Pour lancer l'application vous devrez utiliser la commande suivante :

```
npm run start
```

Puis, vous rendre à l'adresse suivante :

```
http:/localhost:3000
```

### Users générés

```
Username : lild4437
Email : test1@gmail.com
password : test123
statut : admin


Username : lebofred
Email : test2@gmail.com
password : basketball
statut : membre


Username : gatojunior
Email : test3@gmail.com
password : ceciestuntest
statut : admin


Username : chillbeatsdu51
Email : test4@gmail.com
password : jeanne
statut : membre
```
