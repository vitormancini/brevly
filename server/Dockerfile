# Todo container deve partir de uma image-base
FROM node:20.18 AS base

# ----- Instalação de dependências -----
FROM base AS dependencies

# Define o diretório do projeto dentro do container e fornece permissões ao usuário criadp
WORKDIR /usr/src/app

# Copia os arquivos para dentro do diretório da aplicação (WORKDIR)
COPY package.json package-lock.json ./

# Instalação das dependências
RUN npm install

# ----- Build da aplicação -----
FROM base AS build
WORKDIR /usr/src/app

# Copia os demais arquivos da aplicação para o container (WORKDIR)
COPY . .
COPY --from=dependencies /usr/src/app/node_modules ./node_modules

RUN npm run build

# ----- Deploy (agora usamos uma imagem reduzida, mais leve) -----
FROM node:20-alpine3.21 AS deploy

# Instalar os pacotes necessários
RUN apk add --no-cache shadow

WORKDIR /usr/src/app
RUN chown -R $USERNAME:$USERNAME ./

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json ./package.json

# Expondo a porta do container
EXPOSE 8080

# Inicia a aplicação dentro do container
CMD ["node", "dist/server.js"]