# Express TypeScript Backend

## Description
This is a simple backend server built with Express and TypeScript. It uses a JSON file as a database to store form submissions.

## Endpoints
- `GET /ping`: Returns `true` to indicate that the server is running.
- `POST /submit`: Accepts form submissions with `name`, `email`, `phone`, `github_link`, and `stopwatch_time`.
- `GET /read`: Retrieves a submission by its index.

## Setup and Running
1. Clone the repository:
   ```sh
   git clone <your-github-repo-url>
   cd express-typescript-backend
