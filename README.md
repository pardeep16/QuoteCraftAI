# QuoteCraftAI

A full-stack application for generating and managing quotes with AI-powered features.

## Project Structure

- **Backend**: Spring Boot REST API (Java)
- **Frontend**: React + TypeScript + Vite

## Prerequisites

Before running the application, ensure you have the following installed:

- **Java 17+** - [Download](https://adoptopenjdk.net/)
- **Node.js 18+** - [Download](https://nodejs.org/)
- **Maven** - Included with backend (`mvnw`)
- **npm or yarn** - Included with Node.js

## Running the Application

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Build the project:
   ```bash
   ./mvnw clean build
   ```
   On Windows:
   ```bash
   mvnw.cmd clean build
   ```

3. Set required environment variables:
   ```bash
   export AI_API_KEY=your_gemini_api_key
   export GOOGLE_CLIENT_ID=your_google_client_id
   ```
   On Windows (Command Prompt):
   ```bash
   set AI_API_KEY=your_gemini_api_key
   set GOOGLE_CLIENT_ID=your_google_client_id
   ```
   On Windows (PowerShell):
   ```bash
   $env:AI_API_KEY="your_gemini_api_key"
   $env:GOOGLE_CLIENT_ID="your_google_client_id"
   ```

4. Run the Spring Boot application with VM options:
   ```bash
   ./mvnw spring-boot:run -Dspring-boot.run.jvmArguments="-DAI_API_KEY=$AI_API_KEY -DGOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID"
   ```
   On Windows:
   ```bash
   mvnw.cmd spring-boot:run -Dspring-boot.run.jvmArguments="-DAI_API_KEY=%AI_API_KEY% -DGOOGLE_CLIENT_ID=%GOOGLE_CLIENT_ID%"
   ```

   The backend API will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend/quotecraft-ui
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the frontend directory with the API endpoint:
   ```
   VITE_API_BASE_URL=http://localhost:8080
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The frontend will typically start on `http://localhost:5173`

## Building for Production

### Backend

Build the JAR file:
```bash
cd backend
./mvnw clean package
```

Run the JAR file with required VM options:
```bash
java -DAI_API_KEY=your_gemini_api_key -DGOOGLE_CLIENT_ID=your_google_client_id -jar target/quotecraft-apis-0.0.1-SNAPSHOT.jar
```

Or set environment variables first, then run:
```bash
export AI_API_KEY=your_gemini_api_key
export GOOGLE_CLIENT_ID=your_google_client_id
java -DAI_API_KEY=$AI_API_KEY -DGOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID -jar target/quotecraft-apis-0.0.1-SNAPSHOT.jar
```

### Frontend

Build the frontend for production:
```bash
cd frontend/quotecraft-ui
npm run build
# or
yarn build
```

The production build will be in the `dist/` directory.

## Configuration

### Required Environment Variables

The backend requires the following environment variables/VM options to be set:

- **AI_API_KEY**: Gemini API key for generating AI quotes
  - Get it from [Google AI Studio](https://makersuite.google.com/app/apikey)
  - Pass as: `-DAI_API_KEY=your_key`

- **GOOGLE_CLIENT_ID**: Google OAuth 2.0 Client ID for authentication
  - Get it from [Google Cloud Console](https://console.cloud.google.com/)
  - Pass as: `-DGOOGLE_CLIENT_ID=your_client_id`

### Backend Configuration

Backend configuration: `backend/src/main/resources/application.yaml`

### Frontend Configuration

Frontend API configuration: Set `VITE_API_BASE_URL` environment variable

## Development

For development, run both the backend and frontend simultaneously:

Before starting, set the required environment variables:
```bash
export AI_API_KEY=your_gemini_api_key
export GOOGLE_CLIENT_ID=your_google_client_id
```

Then in separate terminals:
1. Terminal 1: 
   ```bash
   cd backend && mvnw spring-boot:run -Dspring-boot.run.jvmArguments="-DAI_API_KEY=$AI_API_KEY -DGOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID"
   ```
2. Terminal 2: 
   ```bash
   cd frontend/quotecraft-ui && npm run dev
   ```

## Troubleshooting

- **Port 8080 in use**: Change the backend port in `application.yaml`
- **Port 5173 in use**: Vite will automatically use the next available port
- **Dependencies not installing**: Delete `node_modules` and run `npm install` again
