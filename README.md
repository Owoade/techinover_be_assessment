# Techinnover Backend Take-Home Assessment: Basic E-Commerce System

## Project Overview

This project is a backend API for a simple e-commerce system built using NestJS. The system allows unauthenticated users to view approved products, authenticated users to manage their products, and an admin to manage both users and products. The API includes robust user authentication, role-based access control, and product management features.

## Objectives

- Implement a secure and maintainable backend API.
- Ensure proper role-based access control for different user types.
- Provide thorough API documentation using Swagger.
- Follow best practices in code quality, validation, error handling, and performance optimization.

## Folder Structure

The `src` folder is organized as follows:

- **cache/**: Configuration for Redis.
- **db/**: Contains the database configuration, schema, and migrations.
- **decorators/**: Contains decorators for input validation, request context storage, and API documentation.
- **environment/**: Contains environment variables.
- **interceptors/**: Contains request interceptors for authorization.
- **modules/**: Contains all required modules. Each module typically includes:
  - **model/**: Represents a table in the database.
  - **repository/**: Contains logic for communicating with the database.
  - **service/**: Contains business logic.
  - **controller/**: Contains logic that interfaces with HTTP requests.
  - **type/**: Contains type definitions for all module components.
- **validators/**: Contains validation schemas for request payloads.
- **swagger/**: Contains schemas and configurations for API documentation.
- **utils/**: Contains utility functions.

## Prerequisites

Before setting up the project, ensure you have the following installed:

- Docker or [Node.js (v18.x or later), PostgreSQL, and Redis]
- Git for version control

## Installation

You can set up the project using one of the following methods:

### Docker Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Owoade/techinover_be_assessment.git
   cd techinover_be_assessment
   ```

2. **Build and Run the Application**

   ```bash
   npm run start:docker
   ```

   This will automatically build and start the application using Docker.

### Manual Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Owoade/techinover_be_assessment.git
   cd techinover_be_assessment
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   Run the following command to set up the environment variables:

   ```bash
   cp .env.example .env
   ```

   Alternatively, you can create a `.env` file and copy the content of `.env.example` into the `.env` file.

   For manual setup, the following environment variables need to be set:

   - **DATABASE_USER**: Your database username.
   - **DATABASE_PASSWORD**: Your database password.
   - **DATABASE_NAME**: The name of the database to use.
   - **DATABASE_PORT**: The port number for the database.
   - **DATABASE_HOST**: The host address for the database.
   - **JWT_TOKEN_PASSPHRASE**: The passphrase used to sign JWT tokens.
   - **REDIS_URL**: The URL for connecting to the Redis instance.
   - **DATABASE_SSL_MODE**: SSL mode for database connection (`on` or `off`).
   - **REDIS_SSL_MODE**: SSL mode for Redis connection (`on` or `off`).

   A sample `.env.example` file is provided in the repository to help you set up these variables. Populate the values accordingly.

4. **Run build**

   ```bash
   npm run build
   ```

4. **Set Up the Database**

   Ensure that PostgreSQL is running and accessible. Run migrations to set up the database schema:

   ```bash
   npm run migrate
   ```

5. **Start the Server**

   ```bash
   npm run start:dev
   ```

   The API should now be running locally on `http://localhost:3000`.

## Running the Application Locally

To run the application locally:

1. **Ensure Port Availability**

   - Make sure port `3000` is free on your local machine for the application.
   - If using Docker, ensure the following ports are free:
     - `5432` for PostgreSQL
     - `6379` for Redis

2. **Follow Installation Instructions**

   - Follow the steps under either the Docker Setup or Manual Setup section to set up the project.

3. **Access the API**

   - Once the application is running, you can access the API at `http://localhost:3000`.

A sample `.env.example` file is provided in the repository to help you set up these variables. Populate the values accordingly.

## API Documentation

API documentation is available and can be accessed locally once the server is running. Open your browser and navigate to `http://localhost:3000/api` to explore the available endpoints, request/response schemas, and more.

