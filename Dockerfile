FROM nginx:stable-alpine
LABEL maintainer="Jetti Phani Teja <jettiphaniteja@gmail.com>"

# Set working directory to nginx html folder
WORKDIR /usr/share/nginx/html

# Remove default content and copy site files
RUN rm -rf ./*
COPY . /usr/share/nginx/html

# Expose HTTP
EXPOSE 80

# Simple healthcheck ensuring index.html exists
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD ["/bin/sh", "-c", "[ -s /usr/share/nginx/html/index.html ] && exit 0 || exit 1"]

# Start nginx (image default already does this, explicit here for clarity)
CMD ["nginx", "-g", "daemon off;"]
