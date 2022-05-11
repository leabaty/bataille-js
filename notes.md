## ToDo
### Utiliser un Guide de style
Comme celui d'Airbnb par exemple : https://github.com/airbnb/javascript.
Permet de linter le code, de donner une ligne de conduite pour créer du code cohérent et lisible pour tous. 
3 choses à revoir : les double quote, les console log et... ? 

### fonction ```createDeck```
Complexité algorythmique : Eviter de runner la boucle une deuxième fois pour pusher les noms. 
Au lieu de ça, utiliser le push dans la boucle afin d'y mettre les names avec % 13

### Pour débugger : Utiliser le débugger VSCode


## Done
### fonction ```checkGameOver```
Renvoyer directement true/false au lieu de stocker ça dans une variable, et utiliser le résultat de la fonction comme test 

### regrouper les fonctions de jeu
dans une seule fonction à lancer dans les deux cas de if => évite de "lire en double"

### Séparer la logique de l'action 
Regrouper les variables dans l'ordre d'exécution, puis regrouper : 
1. L'initialisation
2. La logique 
3. L'action 

Eventuellement, créer plusieurs fichiers avec des méthodes.
