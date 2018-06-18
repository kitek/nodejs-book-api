# use lightweight distro
FROM node:8.11.2-alpine
# app and debug ports exposed on a container
EXPOSE 3000 9229
# copy this app to container dir
COPY . /home/app
# home dir in container for subsequent instructions
WORKDIR /home/app
# execute in workdir
RUN npm install
# default command executed
CMD npm start
