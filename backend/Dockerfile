FROM node:20-slim
ENV PNPM_HOME="/pnpm"
ENV PATH="${PNPM_HOME}:$PATH"
RUN corepack enable

COPY . /app
WORKDIR /app
COPY ./.env.example ./.env

RUN pnpm i --frozen-lockfile
RUN pnpm build

EXPOSE 8000
CMD [ "node", "dist/main.js" ]

