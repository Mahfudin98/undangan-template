# Tahap build
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json dan package-lock.json
COPY package*.json ./

RUN npm install

# Copy seluruh source code
COPY . .

# Build Next.js dan export statik
RUN npm run build && npm run export

# Tahap serve dengan nginx
FROM nginx:alpine

# Hapus default html
RUN rm -rf /usr/share/nginx/html/*

# Copy hasil export ke nginx
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
