FROM nginx
COPY nginx.conf.template /etc/nginx/conf.d/nginx.conf
RUN mkdir /etc/nginx/ssl
CMD ["/bin/sh" , "-c" , "nginx -g 'daemon off;'"]
