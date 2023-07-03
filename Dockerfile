FROM nginx:1.14.0-alpine

RUN rm -rf /var/cache/apk/*

RUN rm -rf /usr/share/nginx/html/*

COPY /build  /usr/share/nginx/html

COPY nginx.conf /etc/nginx/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
