FROM php:8.3-fpm

RUN apt-get update && \
    apt-get install -y mariadb-client libzip-dev unzip default-libmysqlclient-dev

RUN curl -sSLf \
        -o /usr/local/bin/install-php-extensions \
        https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions && \
    chmod +x /usr/local/bin/install-php-extensions && \
    install-php-extensions exif ftp gd redis ldap soap bcmath iconv mbstring pdo pdo_pgsql intl zip xml simplexml xmlreader pcntl sodium sockets

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /var/www

RUN chown -R www-data:www-data /var/www && chmod -R 755 /var/www

EXPOSE 9000

CMD ["php-fpm"]