set -x
docker stop getting-started-app # stop container
docker rm getting-started-app # delete container
docker rmi getting-started-app # delete image
#sudo delgroup $user docker
rm -rf getting-started-app