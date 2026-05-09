# Stage build
FROM oven/bun:1 AS builder

WORKDIR /app

# Copy semua file project
COPY . .

# Install dependencies dengan Bun
RUN bun install

# Build Next.js (production build)
RUN bun run build

# Stage run
FROM oven/bun:1 AS runner

WORKDIR /app
ENV NODE_ENV=production

# Copy file penting dari builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Install hanya production dependencies
RUN bun install --production

EXPOSE 3000

# Jalankan Next.js dengan Bun
CMD ["bun", "run", "start"]