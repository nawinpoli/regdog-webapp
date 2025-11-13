# ---- Base ----
FROM node:20-alpine AS base
WORKDIR /app
ENV NODE_ENV=production

# ---- Deps ----
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# ---- Build ----
FROM base AS build
WORKDIR /app
ENV NODE_ENV=development
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---- Runtime ----
FROM base AS runtime
WORKDIR /app
ENV NODE_ENV=production

# Next.js standalone output includes server + minimal node_modules
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
COPY --from=build /app/prisma ./prisma

# Prisma needs OpenSSL for DB TLS
RUN apk add --no-cache openssl

# Port
EXPOSE 3001

CMD ["node", "server.js"]
