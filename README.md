# Track My Market - Backend with NodeJS and Heroku PostgreSQL service

Back end for the project Track My Market users and managers sides , this projet is configure with CI CD, automatic deployment is done to heroku when merging or pushing in the main branch.

Please refer to this repository for the front end for users made with the framework Flutter: https://github.com/sarra-ait-yahia/TMM.git

Please refer to this repository for the front end for managers made with the framework VueJS: https://github.com/jdoujet/TMM_business.git

## Stack

- NodeJS
- Framework Express
- PostgreSQL

## Description of API

User (manager) | Supermarket | Grocery List (Liste de course) | Map (of supermarket) (plan) | Layout (Rayon) | Entrance (Entree) | Beacon | Item (Article) | Client 
------------ | ------------- | ------------- | ------------- | ------------- | ------------- | ------------- | ------------- | ------------- |
get all users | get supermarkets by user id | get all grocery lists by client id | get all maps by user id and supermarket id | get layout by map id and user id | get entrance by map id and user id | get beacon by map id and user id | get all items | __
get users by id | __ | __ | __ | get layout by map id and floor number and user id | create an entrance | get beacon by plan id and floor number and user id | get item by id | __
__ | __ | __ | __ | create a layout | update information about an entrance | __ | get item by name | __
__ | __ | __ | __ | update information about a layout | delete an entrance | __ | get all items from a grocery list id | __
__ | __ | __ | __ | delete layout | delete an entrance | __ | get trendy item from rayon id and supermarket id | __


More routes also exist to delete or create associations between elements (ex: link between map and layout).


## Database model

![Alt text](/screenshots/model.png)


