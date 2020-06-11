# fury-backend-node
A employee records microservice built using Node.

## Requirements
- [Node](https://nodejs.org/en/download/)
- [PostgreSQL](https://www.postgresql.org/download/)

## Getting Started

1. Click on Fork at the top right corner
2. Clone your forked repository
3. cd into the cloned folded | `cd fury-backend-node`
4. `git remote add upstream https://github.com/hngi/fury-backend-node.git`
5. `git pull upstream master`
6. Check out to the task branch | `git checkout -b <NAME_OF_THE_TASK>`



## Project setup

1. Create .env and copy the content of sample.env | `cp sample.env .env`
2. Create .env.test and copy the content of sample.env | `cp sample.env.test .env.test`
3. Update the DB credentials | N/B Postgres DB
4. npm install
5. npm run dev
6. npm run lint

## Creating a pull request

In the terminal, ensuring that you are located in the root of your repo, run these commands:
1. `git add .`
2. `git commit -m "<COMMIT MESSAGE>"`
3. `git push origin <BRANCH_NAME>`
4. Go to the repository https://github.com/hngi/fury-backend-node

As soon as you get there, you are going to see a green ‘compare and create a pull request’

5. Click on it, and type your message, click on create pull request.

If you have any more questions, please check out this resource -> https://www.youtube.com/watch?v=HbSjyU2vf6Y

## E-R Diagram

 <img src="https://res.cloudinary.com/ambrose/image/upload/v1591785020/ER.png" width="400" title="Fury Database Schema">


