# MarkIt - Lightweight Markdown Editor

MarkIt is a simple, lightweight Markdown editor with a clean interface and no authentication
requirements. It provides basic CRUD operations for Markdown documents.

## Project Structure

The project consists of two main components:

```
markit/
├── markit-frontend/  # Next.js frontend
└── markit-backend/   # Spring Boot backend
```

## Features

- Create, read, update, and delete Markdown documents
- Download documents for offline use
- Real-time Markdown preview
- Simple and intuitive interface
- No authentication required
- Lightweight and fast

## Technology Stack

### Frontend

- [Next.js](https://nextjs.org/) - React framework
- Modern JavaScript/TypeScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- Responsive design

### Backend

- [Spring Boot](https://spring.io/projects/spring-boot) - Java-based backend framework
- RESTful API design
- [PostgreSQL](https://www.postgresql.org/) - Relational database for document storage
- JPA/Hibernate for ORM

## Getting Started

### Prerequisites

- Node.js (v16.x or higher)
- npm or yarn
- Java 17 or higher
- Maven or Gradle
- PostgreSQL database

### Installation

#### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd markit/markit-backend
   ```

2. Build the Spring Boot application:
   ```bash
   ./mvnw clean install
   ```
3. Run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```
   The backend server will start on http://localhost:8080

#### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd markit/markit-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The frontend application will be available at http://localhost:3000

## API Endpoints

| Method | Endpoint              | Description                   |
| ------ | --------------------- | ----------------------------- |
| GET    | `/api/documents`      | Get all documents             |
| GET    | `/api/documents/{id}` | Get a specific document by ID |
| POST   | `/api/documents`      | Create a new document         |
| PUT    | `/api/documents/{id}` | Update an existing document   |
| DELETE | `/api/documents/{id}` | Delete a document             |

## Configuration

### Backend Configuration

The backend configuration can be modified in the `application.properties` or `application.yml` file
located in the `src/main/resources` directory. Make sure to configure your PostgreSQL database
connection settings:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/markit
    username: postgres
    password: yourpassword
  jpa:
    hibernate:
      ddl-auto: update
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect
```

### Frontend Configuration

Environment variables for the frontend can be set in `.env.local` file in the root of the frontend
directory.

## Development

This project follows a decoupled architecture where:

- The frontend communicates with the backend via RESTful API calls
- The backend handles data persistence and business logic
- Both can be developed and tested independently

## Deployment

### Backend Deployment

The Spring Boot application can be packaged as a JAR file:

```bash
./mvnw package
```

Run the JAR file:

```bash
java -jar target/markit-backend-0.0.1-SNAPSHOT.jar
```

### Frontend Deployment

Build the Next.js application for production:

```bash
npm run build
# or
yarn build
```

Start the production server:

```bash
npm start
# or
yarn start
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by the need for a simple, no-frills Markdown editor
- Built with modern web technologies for optimal performance
