# PostgreSQL + Express + Docker Compose

This project sets up a basic Node.js application using Express.js and PostgreSQL, with the environment managed by Docker Compose. Follow the instructions below to get started.

---

## Features
- **Express.js**: A web application framework for building APIs and web applications.
- **PostgreSQL**: A powerful, open-source relational database system.
- **Docker Compose**: Simplifies managing and running multi-container Docker applications.

---

## Prerequisites
Make sure you have the following installed on your machine:

- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) (Optional, for local development outside Docker)

---

## Project Structure
```
.
├── docker-compose.yml       # Docker Compose configuration file
├── package.json             # Node.js dependencies and scripts
│   ├── controllers
│   │   └── user.js          # User business logic
│   ├── utils
│   │   └── database.js          # datbase
│   ├── models
│   │   └── user.js          # User model definition
│   ├── index.js               # Express application setup
│   └── routes
│       └── user.js    # Example user-related routes
└── README.md                # Project documentation
```

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Environment Variables
Create a `.env` file in the project root and define the following environment variables:

```
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=database_name
POSTGRES_HOST=node_db
POSTGRES_PORT=5432
```

Make sure the variables match the configuration in `docker-compose.yml`.

### 3. Install Dependencies (Optional, for local development)
If you plan to run the Node.js application locally without Docker, install the dependencies:
```bash
npm install
```

### 4. Start the Application Using Docker Compose
To start the application and database:
```bash
docker-compose up --build
```
This will:
- Start a PostgreSQL container.
- Start the Express.js application.

### 5. Access the Application
- **API Endpoints**: The Express application will be available at `http://localhost:3000`.
- **Database**: PostgreSQL will be available at `localhost:5432`. You can connect using a database client such as [pgAdmin](https://www.pgadmin.org/) or `psql`.

---

## Example API Endpoints
The following example assumes the Express app includes a `User` model with basic CRUD functionality:

- **Create a User** (POST):
  ```bash
  POST http://localhost:3000/users
  Content-Type: application/json

  {
    "name": "John Doe",
    "email": "johndoe@example.com"
  }
  ```

- **Get All Users** (GET):
  ```bash
  GET http://localhost:3000/users
  ```

---

## Docker Compose Configuration
**`docker-compose.yml`**:
```yaml
version: '3.9'

services:
  node_app:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/app
    depends_on:
      - node_db
    environment:
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=${POSTGRES_DB}
      - POSTGRES_HOST=${POSTGRES_HOST}

  node_db:
    image: postgres:14
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    ports:
      - "5432:5432"
```

---

## Running Database Migrations
If you are using Sequelize for migrations, you can run the migrations inside the Docker container:
```bash
docker exec -it <container_name> npx sequelize-cli db:migrate
```

---

## Stopping the Application
To stop and remove the containers:
```bash
docker-compose down
```

---

## Troubleshooting

### Common Issues
1. **Port Conflicts**:
   - Ensure ports `3000` (for the Node.js app) and `5432` (for PostgreSQL) are not already in use.

2. **Database Connection Errors**:
   - Double-check the environment variables in `.env`.
   - Ensure the PostgreSQL container is running.

3. **Docker Build Errors**:
   - Run `docker-compose down --volumes` to remove existing containers and volumes, then rebuild with `docker-compose up --build`.

### Logs
Check logs for debugging:
```bash
docker-compose logs node_app
```

---

## License
This project is licensed under the MIT License. Feel free to use and modify it as needed.

---

## Contributing
Pull requests and suggestions are welcome! Please open an issue or submit a PR if you'd like to improve this project.

