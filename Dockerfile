# React 프로젝트 Dockerfile
FROM node:18-alpine AS builder  # Node 18 LTS 버전 사용
WORKDIR /app

# package.json과 package-lock.json 복사 후 설치
COPY package*.json ./
RUN npm install

# 소스코드 복사 및 빌드
COPY . .
RUN npm run build

# 정적 파일을 제공할 Nginx 설정
FROM nginx:1.21-alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
