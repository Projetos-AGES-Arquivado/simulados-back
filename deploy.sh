mkdir /tmp/simulados
cd /tmp/simulados

curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

git clone https://github.com/educard/simulados-back.git
git clone https://github.com/educard/simulados-front-user.git
git clone https://github.com/educard/simulados-front-admin.git

docker build -t backend simulados-back/.
docker build -t banco simulados-back/app/config/db/.
docker build -t frontend-user simulados-front-user/.
docker build -t frontend-admin simulados-front-admin/.

docker network create --subnet=172.18.0.0/16 rede

docker run --detach --name banco-cn --net rede --ip 172.18.0.2 --env="MYSQL_ROOT_PASSWORD=senha" banco; sleep 20
docker exec -ti banco-cn mysql --password=senha -e "create database simulados_database;"
docker exec -ti banco-cn mysql --password=senha -e "ALTER USER 'root'@'%' IDENTIFIED BY 'senha'; "
docker exec -ti banco-cn mysql --password=senha -e "ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'senha';"
docker exec banco-cn sh -c 'mysql --default-character-set=utf8 --password=senha simulados_database < /teste/createTablesScripts.sql'
docker exec banco-cn sh -c 'mysql --default-character-set=utf8 --password=senha simulados_database < /teste/inserts.sql'

docker run --detach --name backend-cn --net rede --ip 172.18.0.3 backend

docker run --detach --name frontend-user-cn --net rede --ip 172.18.0.4 frontend-user

docker run --detach --name frontend-admin-cn --net rede --ip 172.18.0.5 frontend-admin
