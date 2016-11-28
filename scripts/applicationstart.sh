#!/bin/bash
. ~/.bashrc

#export NODE_ENV=production

cd /home/ec2-user/usgbc
npm update

npm run build

cd /home/ec2-user/usgbc/build

aws s3 sync . s3://usgbc-table41

cd /home/ec2-user/usgbc/api

zip getSurveyById.zip getSurveyById.py
aws lambda update-function-code --function-name getSurveyById --zip-file fileb://getSurveyById.zip
