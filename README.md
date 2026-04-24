# 📝 TodoApp MERN — Chaîne DevOps complète

> Mini-projet DevOps — IT Business School 2026  
> Implémentation d'une chaîne CI/CD de bout en bout sur une application MERN Stack

---

## 📋 Description du projet

Application de gestion de tâches (Todo) développée avec la stack **MERN** :
- **MongoDB** — base de données NoSQL
- **Express.js** — API REST backend
- **React + Vite** — interface utilisateur frontend
- **Node.js** — runtime JavaScript

L'objectif principal est **l'industrialisation DevOps** : conteneurisation, CI/CD automatisé, déploiement Kubernetes, sécurité intégrée et monitoring.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│                  UTILISATEUR                    │
│              http://localhost:5173              │
└───────────────────┬─────────────────────────────┘
                    │
         ┌──────────▼──────────┐
         │   Frontend (React)  │  :5173
         │      Vite + Docker  │
         └──────────┬──────────┘
                    │ API calls /api
         ┌──────────▼──────────┐
         │  Backend (Express)  │  :5000
         │  Node.js + Docker   │
         └──────────┬──────────┘
                    │ mongoose
         ┌──────────▼──────────┐
         │  MongoDB 4.4        │  :27017
         │  Volume persistant  │
         └─────────────────────┘
```

---

## 🛠️ Stack technique

| Couche       | Technologie            | Version  |
|-------------|------------------------|----------|
| Frontend    | React + Vite           | 18 / 5   |
| Backend     | Node.js + Express      | 20 / 4   |
| Base données| MongoDB                | 4.4      |
| Container   | Docker + Compose       | latest   |
| CI/CD       | GitHub Actions         | —        |
| Qualité     | SonarQube              | —        |
| Sécurité    | Trivy + Semgrep        | —        |
| Orchestration| Kubernetes (Minikube) | 1.28+    |
| GitOps      | ArgoCD                 | —        |
| Monitoring  | Prometheus + Grafana   | —        |

---

## 📁 Structure du projet

```
projetmern/
├── .github/
│   └── workflows/
│       └── ci.yml              # Pipeline CI/CD GitHub Actions
├── backend/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── .env.example
│   ├── package.json
│   └── src/
│       ├── server.js
│       ├── config/db.js
│       ├── controllers/todoController.js
│       ├── models/Todo.js
│       └── routes/todoRoutes.js
├── frontend/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── .env.example
│   ├── vite.config.js
│   ├── package.json
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── api.js
│       └── components/
├── k8s/
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
│   ├── frontend-deployment.yaml
│   ├── frontend-service.yaml
│   └── mongo-deployment.yaml
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## 🚀 Lancement rapide (Local avec Docker)

### Prérequis

- [Docker](https://docs.docker.com/get-docker/) installé
- [Docker Compose](https://docs.docker.com/compose/) installé

### Commandes

```bash
# 1. Cloner le repository
git clone https://github.com/azizlejmi12/to-do.git
cd projetmern

# 2. Lancer toute la stack en arrière-plan
docker compose up --build -d

# 3. Vérifier que les services tournent
docker compose ps

# 4. Accéder à l'application
# Frontend : http://localhost:5173
# Backend  : http://localhost:5000
# MongoDB  : localhost:27017
```

### Arrêter les services

```bash
# Arrêter sans supprimer les données
docker compose down

# Arrêter ET supprimer les volumes (reset complet)
docker compose down -v
```

---

## 🔬 Tests et qualité

```bash
# Lancer les tests backend
cd backend && npm test

# Lancer le linter backend
cd backend && npm run lint

# Lancer les tests frontend
cd frontend && npm test

# Lancer le linter frontend
cd frontend && npm run lint
```

---

## 🔄 Pipeline CI/CD

Le pipeline GitHub Actions se déclenche automatiquement à chaque push :

```
push → checkout → install → lint → tests → SonarQube → Docker build → push image
                                                                              ↓
                                                                    ArgoCD sync → Kubernetes
```

Voir `.github/workflows/ci.yml` pour le détail.

---

## 🌿 Stratégie Git

| Branche       | Rôle                          |
|--------------|-------------------------------|
| `main`       | Production — code stable      |
| `dev`        | Développement — intégration   |
| `feat/*`     | Nouvelles fonctionnalités     |
| `bugfix/*`   | Corrections de bugs           |
| `hotfix/*`   | Corrections urgentes en prod  |

**Workflow** : `feat/xxx` → `dev` → `main` (via Pull Request)

---

## 🔐 Variables d'environnement

Copier `.env.example` vers `.env` et remplir les valeurs :

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```



---

## 📊 Monitoring

- **Prometheus** : `http://localhost:9090`
- **Grafana** : `http://localhost:3000` (admin/admin)
- **Métriques app** : `http://localhost:5000/metrics`

---

## 👤 Auteur

**Lejmi mohamed aziz** — IT Business School 2026  
Projet : Mini Projet DevOps — Chaîne CI/CD complète