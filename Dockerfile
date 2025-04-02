# Install dependencies only when needed
FROM node:18.20-alpine AS deps
WORKDIR /app

COPY package.json ./

RUN yarn install --production

FROM node:18.20-alpine AS builder
WORKDIR /app

COPY . .
COPY --from=deps /app/node_modules ./node_modules

RUN yarn build

# Production image, copy all the files and run next
FROM node:18.20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# You only need to copy next.config.js if you are NOT using the default configuration
# COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/server.js ./server.js

RUN mkdir /app/.next/cache/images
RUN chmod 777 /app/.next/cache/images
RUN chown -R node:node /app/.next/cache/images

USER node

EXPOSE 3000

ENV NEXT_TELEMETRY_DISABLED=1

CMD ["yarn", "start"]