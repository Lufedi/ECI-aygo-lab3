## Description

Create a post feeds page with authentication and some real-time experience.


### Project structure



The project has the following sub-projects

* feedsaygo: This is the frontend built in react js
* feedsback: Backend for the services and the local database
* feedstack: CDK with the resources required to run ths in AWS



### The architecture


This is the basic architecture of this laboratory.

1. The frontend component is written in ReacJs, the user will be able to create a new account using the cognito APIS, this includes sign up, email verification and log in. Once those 3 steps are completed `Cognito` will send the user data and the tokens to keep the session alive.

2. Every request from the frontend to the backend will have the tokens retreived from `Cognito`, from the backend side there is one additional validation calling a `validation` endpoint from cognito to verify that the received token from the frontend are correct and without modifications. 

3. Once the validation process is executed then rhe request will be routed to the corresponding API route.


![](https://drive.google.com/uc?export=view&id=1KQLrdVPegcfSIam4RZPwLyuprNapIn-K)


### How to run

#### The stack

First execute `npm run synth && npm run deploy` in the  `feedsstack` project. This will create the resources required to this laboratory (Cognito, user pools, roles etc). Remember that CDk will take your credentials and configuration from `~/.aws/aws_credentials`

#### The frontend

Before running the frontend update the user pool id(created with cdk) and the region  [here](https://github.com/Lufedi/ECI-aygo-lab3/blob/master/feedsaygo/src/App.js#L15)

Once that is completed run `npm run start` this will deploy the frontend in the port `3000`

### The backend

The backend has a in memory database, for simplicity in this laboratory there is not a dedicted databasee (in the TODO list). `npm run start` will start the project in port `9000`



### Demo

![](https://drive.google.com/uc?export=view&id=1X3Gx_siYe6zRPHmf6IMFuSjeDoUHrpwq)









## TODO

### TODO
- [x] Base workflow working
- [ ] Add a real DB
- [ ] Auth for websockets