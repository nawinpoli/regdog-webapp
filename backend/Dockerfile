## Deps & Build with Bun for speed, Runtime with Node for stability

# ---- Deps ----
FROM oven/bun:1-debian AS deps
WORKDIR /app
RUN apt-get update -y && apt-get install -y openssl
COPY package.json bun.lockb* ./
COPY prisma ./prisma
RUN bun install --ci || bun install

# ---- Build ----
FROM oven/bun:1-debian AS build
WORKDIR /app
RUN apt-get update -y && apt-get install -y openssl
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Use bunx to invoke Next.js
RUN bunx --bun next build

# ---- Runtime (Node) ----
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

# Prisma needs OpenSSL for DB TLS
RUN apk add --no-cache openssl

# Next.js standalone output includes server + minimal node_modules
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=build /app/prisma ./prisma

EXPOSE 3001
ENV PORT=3001
CMD ["node", "server.js"]
