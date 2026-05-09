# =====================
# 1. Dependencies
# =====================
FROM node:20-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --frozen-lockfile

# =====================
# 2. Build
# =====================
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# =====================
# 3. Production
# =====================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy hasil build standalone + static assets + public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Pastikan sharp ada di dependencies
RUN npm install sharp

EXPOSE 3000

# Jalankan server Next.js standalone
CMD ["node", "server.js"]
