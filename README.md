# Voiture Shop — Spring Boot + React + PostgreSQL + Docker

## Prérequis
- Docker Desktop installé
- Node.js installé (pour le frontend)

## Lancer le projet

### 1. Cloner le repo
git clone https://github.com/mounaad/SpringDataRest.git

cd SpringDataRest

### 2. Lancer le backend + base de données
docker-compose up -d --build

### 3. Vérifier que les containers tournent
docker ps

### 4. Lancer le frontend
cd src/main/webapp/reactjs

npm install

npm start

## URLs
- Frontend React  : http://localhost:3000
- Backend API     : http://localhost:9090/api/voitures

## Architecture
- Frontend  : React (port 3000)
- Backend   : Spring Boot (port 9090)
- Database  : PostgreSQL (port 5432)
