FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]

#######################################
# # 🔹 1. React 빌드
# FROM node:18-alpine AS builder
# WORKDIR /app
# COPY package.json package-lock.json ./
# RUN npm install --legacy-peer-deps
# COPY . .
# RUN npm run build

# # 🔹 2. Nginx 기반으로 정적 파일 제공
# FROM nginx:alpine
# WORKDIR /etc/nginx

# # 🔥 nginx.conf 복사할 때, Docker Build Context에 포함되도록 `Dockerfile`과 같은 폴더에 `nginx.conf`를 복사해둠
# COPY --from=builder /app/build /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/nginx.conf 

# # 🔹 3. 컨테이너 실행 시 Nginx 시작
# EXPOSE 80 443
# CMD ["nginx", "-g", "daemon off;"]

##########################################
# 🔹 1. React 빌드
# FROM node:18-alpine AS builder
# WORKDIR /app
# COPY package.json package-lock.json ./
# RUN npm install --legacy-peer-deps
# COPY . .
# RUN npm run build

# # 🔹 2. Nginx 기반으로 정적 파일 제공
# FROM nginx:alpine
# WORKDIR /etc/nginx

# # 🔥 올바른 위치로 `nginx.conf` 복사 (기존 conf.d 경로 ❌ → /etc/nginx/ ✔)
# COPY --from=builder /app/build /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/nginx.conf 

# # 🔹 3. 컨테이너 실행 시 Nginx 시작
# EXPOSE 80 443
# CMD ["nginx", "-g", "daemon off;"]


