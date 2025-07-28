# ─────────────────────────────────────────────────────────────────
# Stage 1: Build the Angular app
# ─────────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

# set working directory
WORKDIR /app

# install app dependencies
COPY package*.json ./
RUN npm ci

# copy the rest of your source code
COPY . .

# build the production bundle
RUN npm run build -- --configuration=production


# ─────────────────────────────────────────────────────────────────
# Stage 2: Serve only the browser build with NGINX
# ─────────────────────────────────────────────────────────────────
FROM nginx:stable-alpine

# 1) Remove default site and any leftover files
RUN rm -rf /usr/share/nginx/html/*

# 2) Copy custom nginx config in place
#    (overwrites any .conf, so NGINX loads your SPA routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 3) Copy *only* the browser output from the Angular build
COPY --from=builder /app/dist/frontend /usr/share/nginx/html

# 4) Expose & run
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
