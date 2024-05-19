# Itunes Seeker App

## Description
Itunes Seeker est une application React Native qui permet aux utilisateurs de rechercher des artistes, des morceaux et des albums de musique via l'API iTunes. Les utilisateurs peuvent également ajouter des morceaux à leurs favoris et les consulter dans un écran dédié.

## Fonctionnalités
- **Recherche de Musique** : Recherchez des artistes, des morceaux et des albums de musique.
- **Affichage des Résultats** : Affichez les résultats de recherche avec des détails.
- **Favoris** : Ajoutez et supprimez des morceaux des favoris.
- **Affichage des Favoris** : Affichez tous les morceaux favoris en un seul endroit.

## Écrans
1. **SearchScreen** : Écran principal pour rechercher de la musique.
2. **TrackResultScreen** : Écran affichant les détails d'un morceau sélectionné.
3. **ArtistResultScreen** : Écran affichant les détails d'un artiste sélectionné.
4. **AlbumResultScreen** : Écran affichant les détails d'un album sélectionné.
5. **FavoritesScreen** : Écran affichant tous les morceaux favoris.

## Installation
1. Clonez le dépôt :
    ```sh
    git clone https://github.com/QuentinBoulay/itunes-seeker.git
    ```
2. Accédez au répertoire du projet :
    ```sh
    cd itunes-seeker
    ```
3. Installez les dépendances :
    ```sh
    yarn install
    ```
4. Lancez l'application :
    ```sh
    yarn start
    ```

## Dépendances
- `react-native`
- `react-navigation`
- `react-native-vector-icons`
- `@react-native-async-storage/async-storage`
- `react-native-select-dropdown`
