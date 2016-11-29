#!/bin/bash
. ~/.bashrc

#export NODE_ENV=production

cd /home/ec2-user/usgbc
npm update

npm run build

cd /home/ec2-user/usgbc/build

aws s3 sync . s3://usgbc-table41

cd /home/ec2-user/usgbc/api

pip intall geopy -t .

zip getSurveyById.zip getSurveyById.py
aws lambda update-function-code --region us-west-2 --function-name getSurveyById --zip-file fileb://getSurveyById.zip

zip getSurveys.zip -r geopy getSurveys.py
aws lambda update-function-code --region us-west-2 --function-name getSurveys --zip-file fileb://getSurveys.zip

zip postSurveys.zip postSurveys.py
aws lambda update-function-code --region us-west-2 --function-name postSurveys --zip-file fileb://postSurveys.zip
