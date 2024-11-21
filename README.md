# SinergiIA API

Backend API for SinergiIA landing page and blog management system.

## Environment Variables

Copy `.env.example` to `.env` and fill in the required values:

```bash
DB_TOKEN=           # Turso database token
OPENAI_API_KEY=     # OpenAI API key
ADMIN_PASSWORD=     # Admin panel password
ADMIN_TOKEN=        # JWT token for admin authentication
```

## Development

```bash
npm install
npm run dev
```




## Deployment

This project is configured for deployment on Render. The `render.yaml` file contains the deployment configuration.