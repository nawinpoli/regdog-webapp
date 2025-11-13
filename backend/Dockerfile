## Deps & Build with Bun for speed, Runtime with Node for stability

# ---- Deps ----
FROM oven/bun:1 AS deps
WORKDIR /app
COPY package.json bun.lockb* ./
RUN bun install --ci || bun install

# ---- Build ----
FROM oven/bun:1 AS build
WORKDIR /app
ENV NODE_ENV=development
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Use bunx to invoke Next.js
RUN bunx --bun next build

# ---- Runtime (Node) ----
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

# Next.js standalone output includes server + minimal node_modules
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
COPY --from=build /app/prisma ./prisma

# Prisma needs OpenSSL for DB TLS
RUN apk add --no-cache openssl

EXPOSE 3001
CMD ["node", "server.js"]
