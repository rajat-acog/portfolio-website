FROM node:22-alpine AS builder

WORKDIR /app

# Copy only your project
COPY ./portfolio .

RUN npm install
RUN npm run build

# ---- Production stage ----
FROM nginx:alpine

LABEL maintainer="Rajat"
LABEL description="Astro Portfolio Website deployed via CI/CD"
LABEL project="rajat-assignment"
LABEL version="1.0"

# Copy build output
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]