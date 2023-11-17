#!/bin/bash

echo "---------Leonel Teixeira LudusCristaltec Backend Challenge---------"
cd ./api
docker build -t api .
docker run -p 3000:3000 --name cat_api_proxy api