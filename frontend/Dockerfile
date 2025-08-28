# Build stage
FROM node:18 as build

WORKDIR /app

# Copy package.json and .env before install/build
COPY package*.json ./
COPY .env ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the app (Vite will read .env during this step)
RUN npm run build

# Serve with nginx
FROM nginx:alpine

# Copy built frontend files
COPY --from=build /app/dist /usr/share/nginx/html

# Custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

