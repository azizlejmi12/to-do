# Simple Todo App MERN

## Structure

- `backend`: API Express + MongoDB (Mongoose)
- `frontend`: React + Vite

## Variables d'environnement

### Backend

Copier `backend/.env.example` vers `backend/.env`:

```bash
cp backend/.env.example backend/.env
```

### Frontend

Copier `frontend/.env.example` vers `frontend/.env`:

```bash
cp frontend/.env.example frontend/.env
```

## Installation (plus tard, quand Node sera dispo)

```bash
cd backend && npm install
cd ../frontend && npm install
```

## Lancement local

Terminal 1:

```bash
cd backend
npm run dev
```

Terminal 2:

```bash
cd frontend
npm run dev
```

Frontend: http://localhost:5173
Backend: http://localhost:5000

## Endpoints API

- `GET /api/health`
- `GET /api/todos`
- `POST /api/todos` body: `{ "title": "..." }`
- `PATCH /api/todos/:id/toggle`
- `DELETE /api/todos/:id`

## Lancement avec Docker

Depuis la racine du projet:

```bash
docker compose up --build
```

Acces:

- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- MongoDB: mongodb://localhost:27017

Arreter les conteneurs:

```bash
docker compose down
```

Arreter et supprimer aussi le volume Mongo:

```bash
docker compose down -v
```
