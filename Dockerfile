# =====================
# 3. Production
# =====================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# ✅ public harus sejajar dengan server.js
COPY --from=builder /app/public ./public

RUN npm install sharp --platform=linux --arch=x64 --libc=musl

EXPOSE 3000
CMD ["node", "server.js"]