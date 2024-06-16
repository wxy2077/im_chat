# 使用官方Nginx镜像
FROM nginx:latest

# 复制自定义Nginx配置文件到镜像中
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 复制构建好的Vue3应用程序文件到Nginx的html目录
COPY dist/ /usr/share/nginx/html/

# 暴露端口80
EXPOSE 80

