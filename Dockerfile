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

# Copy hasil build standalone (sudah include node_modules-nya sendiri)
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# ✅ HAPUS dua baris ini — jangan overwrite node_modules dari standalone:
# COPY --from=deps /app/node_modules ./node_modules
# COPY package.json ./

EXPOSE 3000
CMD ["node", "server.js"]