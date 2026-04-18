# 🐳 Docker Dev Setup Guide

This project uses `docker-compose.dev.yaml` for running services in development mode.

---

## 🚀 RUN ALL SERVICES (Backend + Frontend + DB)

### ▶️ Start everything at once

```bash
docker compose -f docker-compose.dev.yaml up --build
```

👉 This will start:

* Backend (Node.js)
* Frontend (Vite/React)
* Database (MySQL)

---

### ▶️ Run in background (detached mode)

```bash
docker compose -f docker-compose.dev.yaml up --build -d
```

---

### 🛑 Stop all services

```bash
docker compose -f docker-compose.dev.yaml down
```

---

### 🔁 Restart all services

```bash
docker compose -f docker-compose.dev.yaml restart
```

---

### 📜 View logs for all services

```bash
docker compose -f docker-compose.dev.yaml logs -f
```

---

### 🔍 Check running containers

```bash
docker ps
```

---

### 💣 Full reset (clean everything)

```bash
docker compose -f docker-compose.dev.yaml down -v
docker system prune -a -f
docker compose -f docker-compose.dev.yaml up --build
```

---

### ✅ Recommended Workflow

```bash
# Start everything
docker compose -f docker-compose.dev.yaml up --build

# Debug if needed
docker compose -f docker-compose.dev.yaml logs -f

# Stop when done
docker compose -f docker-compose.dev.yaml down
```



## 🚀 Run Services Individually

### ▶️ Run only backend

```bash
docker compose -f docker-compose.dev.yaml up --build backend
```

### ▶️ Run only frontend

```bash
docker compose -f docker-compose.dev.yaml up --build frontend
```

### ▶️ Run only database (MySQL)

```bash
docker compose -f docker-compose.dev.yaml up --build db
```

---

## 🛑 Stop Services

### Stop specific service

```bash
docker compose -f docker-compose.dev.yaml stop backend
docker compose -f docker-compose.dev.yaml stop frontend
docker compose -f docker-compose.dev.yaml stop db
```

### Stop everything

```bash
docker compose -f docker-compose.dev.yaml down
```

---

## 🔁 Rebuild Services

```bash
docker compose -f docker-compose.dev.yaml up --build backend
docker compose -f docker-compose.dev.yaml up --build frontend
docker compose -f docker-compose.dev.yaml up --build db
```

---

## 📜 Logs

### View logs

```bash
docker compose -f docker-compose.dev.yaml logs backend
docker compose -f docker-compose.dev.yaml logs frontend
docker compose -f docker-compose.dev.yaml logs db
```

### Follow logs (live)

```bash
docker compose -f docker-compose.dev.yaml logs -f backend
```

---

## 🧑‍💻 Enter Containers

### Backend container

```bash
docker exec -it backend_dev sh
```

### Frontend container

```bash
docker exec -it frontend_dev sh
```

---

## 🗄️ Access MySQL Database

### Open MySQL CLI

```bash
docker exec -it mysql_dev mysql -u root -p
```

Enter password:

```
root
```

---

### Connect directly to database

```bash
docker exec -it mysql_dev mysql -u root -proot app_db
```

---

## 🧪 Useful MySQL Commands

```sql
SHOW DATABASES;
USE app_db;
SHOW TABLES;
```

---

## 🔍 Check Running Containers

```bash
docker ps
```

---

## 💣 Clean Everything (Reset)

```bash
docker compose -f docker-compose.dev.yaml down -v
docker system prune -a -f
```

---

## ⚡ Optional Shortcut (Alias)

```bash
alias dcdev="docker compose -f docker-compose.dev.yaml"
```

### Usage:

```bash
dcdev up --build backend
dcdev logs -f
dcdev down
```

---

## ⚠️ Notes

* Always use `-f docker-compose.dev.yaml` (default file is different)
* Use `--build` when you change Dockerfile or dependencies
* If facing issues, run full clean reset

---

## ✅ Recommended Dev Flow

```bash
# Start backend
docker compose -f docker-compose.dev.yaml up --build backend

# Check logs
docker compose -f docker-compose.dev.yaml logs -f backend

# Stop when done
docker compose -f docker-compose.dev.yaml down
```

---
