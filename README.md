# Nonprofit Compliance Checker

A full-stack Angular + Node.js microapp that lets users check a nonprofit organization’s compliance status via the Nonprofit Check Plus API.

---

## 📋 Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (v16 or later) & **npm**
- **Angular CLI**

  ```bash
  npm install -g @angular/cli
  ```

- **Docker** & **Docker Compose** (optional, for containerized setup)

---

## 🔧 Environment Variables

Create a `.env` file in both the **frontend/** and **backend/** directories and populate as shown below.

### Frontend (`frontend/.env`)

```ini
# Base URL for API calls (proxied to backend)
VITE_API_BASE_URL=http://localhost:4200/api

# Static token to simulate authentication
VITE_AUTH_TOKEN=your_hardcoded_token_here
```

### Backend (`backend/.env`)

```ini
# Port where Express listens
env PORT=3000

# Nonprofit Check Plus API endpoint & key
API_BASE_URL=https://pactman.org/nonprofitcheckplus-api\ nAPI_KEY=your_api_key_here

# Token your frontend will send for simple auth
AUTH_TOKEN=your_hardcoded_token_here
```

> **Note:** Use a library like `dotenv` in your backend to load these variables before your app starts.

---

## 🔒 Authentication Setup

This microapp uses a **static bearer token** to simulate real-world auth. The backend will reject any requests that do not include a matching token in the `Authorization` header.

1. **Set** `VITE_AUTH_TOKEN` and `AUTH_TOKEN` to the same value in their respective `.env` files.

2. **Frontend**: Angular should attach the token via an HTTP interceptor.

   ```ts
   // example auth.interceptor.ts
   import { Injectable } from "@angular/core";
   import {
     HttpInterceptor,
     HttpRequest,
     HttpHandler,
   } from "@angular/common/http";
   import { environment } from "../environments/environment";

   @Injectable()
   export class AuthInterceptor implements HttpInterceptor {
     intercept(req: HttpRequest<any>, next: HttpHandler) {
       const token = import.meta.env.VITE_AUTH_TOKEN;
       const authReq = req.clone({
         setHeaders: { Authorization: `Bearer ${token}` },
       });
       return next.handle(authReq);
     }
   }
   ```

3. **Backend**: Validate the incoming header before proxying to the external API.

   ```js
   // example middleware in Express (backend/src/auth.js)
   module.exports = (req, res, next) => {
     const authHeader = req.headers.authorization;
     if (!authHeader || authHeader.split(" ")[1] !== process.env.AUTH_TOKEN) {
       return res.status(401).json({ error: "Unauthorized" });
     }
     next();
   };
   ```

---

## 🚀 Local Development

Follow these steps to get the app up and running on your machine:

1. **Clone the repository**

   ```bash
   git clone <your-repo-url> nonprofit-compliance-checker
   cd nonprofit-compliance-checker
   ```

2. **Configure Environment Variables**

   - Create `frontend/.env` and `backend/.env` as shown above.

3. **Backend Setup**

   ```bash
   cd backend
   npm install           # Install dependencies
   npm start             # Start Express server (port 3000)
   ```

   - Test with:

     ```bash
     curl http://localhost:4200/api/test --header "Authorization: Bearer your_hardcoded_token_here"
     # Expect: { "message": "Backend is working!" }
     ```

4. **Frontend Setup**

   ```bash
   cd ../frontend
   npm install           # Install dependencies
   ng serve --proxy-config proxy.conf.json
   ```

   - Opens on [http://localhost:4200](http://localhost:4200)
   - The Angular HTTP client will automatically proxy `/api/*` to the backend.

5. **Verify the App**

   - In your browser, visit [http://localhost:4200](http://localhost:4200) and use the form to search an EIN or organization name.
   - Check the network tab to ensure the `Authorization` header and results are returned correctly.

---

## 📸 Screenshots

Include screenshots in `frontend/src/assets/screenshots/` and reference them below:

- **Home Page** (`screenshot-1.png`): Input form for EIN or org name.
- **Results View** (`screenshot-2.png`): Compliance status and flag details.
- **History View** (`screenshot-3.png`): Recent searches log.

![Home Page](src/assets/screenshots/screenshot-1.png)

![Results View](src/assets/screenshots/screenshot-2.png)

![History View](src/assets/screenshots/screenshot-3.png)

---

Happy coding! 🚀
