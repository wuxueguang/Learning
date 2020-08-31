FROM  node:10.11.0-alpine

# Create app directory
WORKDIR /opt/vcam/venom


RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

# Install and config Supervisor
RUN apk add python py2-pip
RUN pip install wheel && pip install supervisor supervisor-stdout

ADD APP-META/supervisor/supervisord.conf /etc/supervisord.conf

# Install Nginx
RUN apk add nginx

ADD APP-META/nginx/nginx.conf /etc/nginx/nginx.conf


# For npm@5 or later, copy package-lock.json as well
COPY package.json package-lock.json .npmrc ./

# RUN npm install --only=prod

COPY . .

# Bundle app source

RUN chmod 755 ./APP-META/sumologic/sumologic.exec.sh

ADD ./start.sh /start.sh
RUN chmod 755 /start.sh

EXPOSE 80

CMD ["/start.sh"]

