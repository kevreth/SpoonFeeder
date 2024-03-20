docker build -t spoonfeeder https://github.com/kevreth/SpoonFeeder.git#main
docker run -d -p 9000:9000 --name spoonfeeder-run spoonfeeder
docker exec -it spoonfeeder-run bash
