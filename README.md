# 🎮 GameLib API

API REST de gestion de jeux vidéo — Express, Prisma, MySQL.

## Lancement avec Docker

```bash
docker-compose up --build
```

L'API tourne sur `http://localhost:3000`.

## Lancement en local

```bash
npm install
npx prisma migrate dev
npm run dev
```

## Routes

| Méthode | Route      | Description          |
| ------- | ---------- | -------------------- |
| GET     | /health    | Health check         |
| GET     | /games     | Lister tous les jeux |
| GET     | /games/:id | Récupérer un jeu     |
| POST    | /games     | Créer un jeu         |
| PUT     | /games/:id | Modifier un jeu      |
| DELETE  | /games/:id | Supprimer un jeu     |

## Tests

```bash
npm test
```

## Lint

```bash
npm run lint
```
