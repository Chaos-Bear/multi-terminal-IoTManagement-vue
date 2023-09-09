# 使用Node.js作为基础镜像
FROM node:14 AS build-stage

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制项目文件到工作目录
COPY . .

# 构建Vue项目
RUN npm run build

# 使用Nginx作为生产环境的基础镜像
FROM nginx:stable-alpine as production-stage

# 将构建结果复制到Nginx服务器
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 暴露端口
EXPOSE 80

# 启动Nginx服务器
CMD ["nginx", "-g", "daemon off;"]
