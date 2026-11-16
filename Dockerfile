FROM node:22-alpine

WORKDIR /app
ENV NODE_ENV=production

COPY --chown=node:node dist ./dist
COPY --chown=node:node scripts/serve.mjs ./scripts/serve.mjs

USER node
CMD ["node", "scripts/serve.mjs"]
