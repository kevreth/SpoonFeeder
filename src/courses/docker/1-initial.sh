# set debug mode so commands may be seen
set -x

# download the repository
git clone https://github.com/docker/getting-started-app.git
cd getting-started-app

# create the Dockerfile
echo '
# syntax=docker/dockerfile:1

FROM node:18-alpine
WORKDIR /app
COPY . .
RUN yarn install --production
CMD ["node", "src/index.js"]
EXPOSE 3000' > Dockerfile

# update permissions since 
#sudo usermod -aG docker $user

# build the image
docker build -t getting-started-app .

# run the image
docker run --name getting-started-app -dp 127.0.0.1:3000:3000 getting-started-app

#see the image in operation
docker ps -a
docker images

#see the result
xdg-open http://localhost:3000
