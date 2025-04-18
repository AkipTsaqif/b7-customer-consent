FROM node:18-alpine AS base
USER root

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci --force; \
    elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
    else echo "Lockfile not found." && exit 1; \
    fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV}

COPY --from=deps /app/node_modules ./node_modules
RUN echo "....MODE ENV:    " $NODE_ENV
COPY . .

RUN echo "....CURRENT DIRECTORY LIST:...."
RUN ls -a

RUN \
    if [ "${NODE_ENV}" = "production" ]; then \
    rm -f .env.development; \
    elif [ "${NODE_ENV}" = "development" ]; then \
    rm -f .env.production; \
    mv .env.development .env.production; \
    fi


RUN npm run build


# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app


ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# COPY --from=builder /app/.env.${NODE_ENV} ./

USER root

EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]