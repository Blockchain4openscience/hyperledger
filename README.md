# Blockchain4openscience

The project website is [here](http://blockchain4openscience.com/#home).


__Abstract:__ Open science is a new movement in science that promotes principles of open access to research data, publications, and scientific collaboration. Open science promises to increase transparency and quality of research, provide reproducibility by reusing scientific datasets and increasing trust in the scientific collaboration. Blockchain fits the mindset of open science and can help to fulfill open science principles: transparency and availability of blockchain makes scientific outputs open & transparent; disintermediation removes subjectivity from scientific reviews; integrity and possibility to secure transactions in the competing environment increases trust in scientific results; smart contracts allows to manage access to scientific outputs; immutability represents precise relationships between the works with such features as richness, time-based relationships, and logical precursors.

-----
The project is curretly in development using frameworks and tools from Hyperledger, in particular [Fabric](https://hyperledger-fabric.readthedocs.io/en/release-1.1/) and [Composer](https://hyperledger.github.io/composer/latest/introduction/introduction)  


The business network is designed to capture the interactions between researchers within the academic community as well as participants from outside of the academia. The interactions involve digital research objetcs, that are shared and traded as assets accross a network. Some examples of digital research objects are: documents, presentations, datasets, code, among other object considered as valuable in the process of creating knowledge in a disciple onr accross many disicplines. A basic setup of a business network involves the digital research objets as `assets` and researchers and institutions as `participants`. These `participants` exchange the `assets` using different types of `smart contracts`. The business network may be used to register interactions among `participants`, provide tractability for the value creation process in science and it may include a system of `tokens` to reward interactiosn among participants.     

We will be posting updates on different versions of the business network `bforos` that can be used both in the [Composer Playground](https://composer-playground.mybluemix.net/) or can be deployed locally in Fabric. The individual files that make up the business network archive are in the directory `bforos` of the repository.

-----
In order to deploy into a local Fabric environment please clone the repository and follow the instructions

`````
git clone https://github.com/Blockchain4openscience/hyperledger
`````
We follow the hyperledger-composer tutorial on [Developer tutorial for creating a Hyperledger Composer solution](https://hyperledger.github.io/composer/latest/tutorials/developer-tutorial).

Make sure that you start a fresh Hyperledger Fabric network, that is you must teardown any previous Hyperledger Fabric constainer and delete any old business network card that may exist form previous Fabric enviorments.

## Installing the development environment

Follow the installation steps on [Installing the development environment](https://hyperledger.github.io/composer/latest/installing/development-tools)

In this tutorial, you must be create a __PeerAdmin__ Card. To see the card name:

```
composer card list
```

## Fabric Network Design

This step

The hyperledger repository contains the bussines network definition (bforos3 is the last version) and a bussiness network archive called __bforos@0.0.1.bna__ generated from this definition . If you wish, you can generate a business network archive with:

```
composer archive create -t dir -n .
```

After creating the .bna file, the business network can be deployed to the instance of Hyperledger Fabric. For this step you must have the name of the __PeerAdmin__ card created in previous steps. 

Deploying a business network to the Hyperledger Fabric requires the Hyperledger Composer business network to be installed on the peer, then the business network can be started, and a new participant, identity, and associated card must be created to be the network administrator. Finally, the network administrator business network card must be imported for use, and the network can then be pinged to check it is responding.

1. To install the business network:

```
composer network install --card PeerAdmin@hlfv1 --archiveFile bforos@0.0.1.bna
```

If __PeerAdmin__ card name is different to PeerAdmin@hlfv1 replace this value

2. To start the business network:

```
composer network start --networkName bforos --networkVersion 0.0.1 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 
```

This command generate a file for the admin network card __admin@bforos.card__ 

1. To import the network administrator identity as a usable business network card:

```
composer card import --file admin@bforos.card
```

4. To check that the business network has been deployed successfully, run the following command to ping the network:

```
composer network ping --card admin@bforos
```

## Generating a REST server

Hyperledger Composer can generate a bespoke REST API based on a business network. For developing a web application, the REST API provides a useful layer of language-neutral abstraction.

1. To create the REST API, navigate to the bforos directory and run the following command:

```
composer-rest-server
```

2. Enter admin@bforos as the card name.
3. Select __never use namespaces__ when asked whether to use namespaces in the generated API.
4. Select __No__ when asked whether to secure the generated API.
5. Select __Yes__ when asked whether to enable event publication.
6. Select __No__ when asked whether to enable TLS security.

The generated API is connected to the deployed blockchain and business network.

## Composer Rest Server

Launch your browser and go to the URL given [http://localhost:3000/explorer](http://localhost:3000/explorer) for interacting with it. Rest server generates an endpoint for each participant, asset and transaction of the business network definition. Go to the [business model](https://github.com/Blockchain4openscience/hyperledger/tree/master/bforos2) to review all operations in the rest server. yo can use a api environment tool (e.g. [Postman](https://www.getpostman.com/)) to send Http Request to Hypeledger. 

Additionally you can run hyperledger playground to see easily the changes in the components of the business model. 

```
composer-playground
```

If you don't have hyperledger playground, follow the installation steps on [Installing the development environment](https://hyperledger.github.io/composer/latest/installing/development-tools):

### Create Participant

```
http://localhost:3000/api/Researcher
```

Create two `Researcher` participant:


```
POST http://localhost:3000/api/Reseacher -d
{
  "$class": "org.bforos.Researcher",
  "researcherId": "1",
  "email": "juan.uno@bforos.org",
  "firstName": "juan",
  "lastName": "uno"
}
```

__Response__

```json
{
  "$class": "org.bforos.Researcher",
  "researcherId": "1",
  "email": "juan.uno@bforos.org",
  "firstName": "juan",
  "lastNam": "uno",
  "wallet": 10
}
```

```
POST http://localhost:3000/api/Reseacher -d
{
  "$class": "org.bforos.Researcher",
  "researcherId": "2",
  "email": "juan.dos@bforos.org",
  "firstName": "juan",
  "lastNam": "dos"
}
```

__Response__


```json
{
  "$class": "org.bforos.Researcher",
  "researcherId": "2",
  "email": "juan.dos@bforos.org",
  "firstName": "juan",
  "lastNam": "dos",
  "wallet": 10
}
```

### Create Researcher Object

```
http://localhost:3000/api/ResearchOJ
```

1. The research objects can be created directly. With this method you can create a research object without contributors: 


```
POST http://localhost:3000/api/ReseachOJ -d {
{
  "$class": "org.bforos.ResearchOJ",
  "ResearcherObjId": "RO01",
  "typero": "DOCUMENT",
  "uri": "www.juanuno.com/ro"
}
```

__Response__

```json
{
  "$class": "org.bforos.ResearchOJ",
  "ResearcherObjId": "RO01",
  "typero": "DOCUMENT",
  "uri": "www.juanuno.com/ro",
  "reward": 1,
  "cost": 1,
  "countAccess": "0",
  "collectors": [
    {}
  ],
  "contributors": [
    {}
  ]
}
```

2. The research objects can be created by the smart contract `CreateResearchOJ`. The reward and cost is defined in the transaction

```
POST http://localhost:3000/api/CreateResearchOJ -d {
{
  "$class": "org.bforos.CreateResearchOJ",
  "ResearcherObjId": "RO01",
  "typero": "DOCUMENT",
  "uri": "www.juanuno.com/ro",
  "creator": "resource:org.bforos.Researcher#1"
}
```
Unlike the first method, this method generate a wallet event for `juan.uno@bforos.org` that create the researcher object an assigns as contributor

__Transaction Response__


```json
{
  "$class": "org.bforos.CreateResearchOJ", 
  "ResearcherObjId": "RO01",
  "typero": "DOCUMENT",
  "uri": "www.juanuno.com/ro",
  "creator": "resource:org.bforos.Researcher#1",
  "transactionId": "ce75b0e7-554b-4fff-a890-dee65067338c",
  "timestamp": "2018-09-29T16:35:57.702Z"
}
```

__Wallet Event__

See in hyperledger playground (all transaction)

```json
{
 "$class": "org.bforos.WalletEvent",
 "claimer": "resource:org.bforos.Researcher#1",
 "oldbalance": 10,
 "newbalance": 11,
 "eventId": "ce75b0e7-554b-4fff-a890-dee6343067338c#0",
 "timestamp": "2018-02-28T15:03:44.534Z"
}
```

__Research Object Modified__

See in hyperledger playground (ResearcherOJ)

```json
{
  "$class": "org.bforos.ResearchOJ",
  "ResearcherObjId": "RO01",
  "typero": "DOCUMENT",
  "uri": "www.juanuno.com/ro",
  "reward": 1,
  "cost": 1,
  "countAccess": "0",
  "collectors": [
    {}
  ],
  "contributors": [
    "resource:org.bforos.Researcher#1"
  ]
}
```

### Claim Research Object

```
POST http://localhost:3000/api/ClaimRO
```

A `Researcher` participant claim a `ResearchOJ`. This generates a wallet event for research object claimer:


```
POST http://localhost:3000/api/ClaimRO -d
{
  "$class": "org.bforos.ClaimRO",
  "researchObjId": "resource:org.bforos.ResearchOJ#RO01",
  "claimer": "resource:org.bforos.Researcher#2"
}
```

__Transaction Response__


```json
{
  "$class": "org.bforos.ClaimRO", 
  "ResearcherObjId": "resource:org.bforos.ResearchOJ#RO01",
  "claimer": "resource:org.bforos.Researcher#1",
  "transactionId": "ce75b0e7-554b-4fff-a890-dee65456338c",
  "timestamp": "2018-09-29T15:03:57.702Z"
}
```

__Wallet Event__

See in hyperledger playground (all transaction)

```json
{
 "$class": "org.bforos.WalletEvent",
 "claimer": "resource:org.bforos.Researcher#2",
 "oldbalance": 10,
 "newbalance": 11,
 "eventId": "ce75b0e7-554b-4fff-a890-dee65456338c#0",
 "timestamp": "2018-02-28T15:03:44.534Z"
}
```

__Research Object Modified__

See in hyperledger playground (ResearcherOJ)

```json
{
  "$class": "org.bforos.ResearchOJ",
  "ResearcherObjId": "RO01",
  "typero": "DOCUMENT",
  "uri": "www.juanuno.com/ro",
  "reward": 1,
  "cost": 1,
  "countAccess": "0",
  "collectors": [
    {}
  ],
  "contributors": [
	"resource:org.bforos.Researcher#1",
	"resource:org.bforos.Researcher#2"
  ]
}
```

### CountRO

```
POST http://localhost:3000/api/CountRO
```

Count access to `ResearchOJ`. This generates a wallet event for each contributor of research object:

```
POST http://localhost:3000/api/CountRO -d
{
  "$class": "org.bforos.CountRO",
  "Ro": "resource:org.bforos.ResearchOJ#RO01",
  "description": "description information optional"
}
``` 

__Transaction Response__


```json
{
  "$class": "org.bforos.CountRO", 
  "ResearcherObjId": "resource:org.bforos.ResearchOJ#RO01",
  "claimer": "resource:org.bforos.Researcher#1",
  "transactionId": "ce75b0e7-554b-4fff-a890-dee65456338c",
  "timestamp": "2018-09-29T15:03:57.702Z"
}
```

__Wallet Event__

See in hyperledger playground (all transaction)

```json
{
 "$class": "org.bforos.WalletEvent",
 "claimer": "resource:org.bforos.Researcher#juan.uno@bforos.org",
 "oldbalance": 11,
 "newbalance": 12,
 "eventId": "ce75b0e7-554b-4fff-a890-deefdfdg067338c#0",
 "timestamp": "2018-02-28T16:13:44.534Z"
}
```

```json
{
 "$class": "org.bforos.WalletEvent",
 "claimer": "resource:org.bforos.Researcher#juan.dos@bforos.org",
 "oldbalance": 11,
 "newbalance": 12,
 "eventId": "ce75b0e7-554b-4fff-a890-dee6506fdss#0",
 "timestamp": "2018-02-28T16:23:44.534Z"
}
```

__Research Object Modified__

See in hyperledger playground (ResearcherOJ)

```json
{
  "$class": "org.bforos.ResearchOJ",
  "ResearcherObjId": "RO01",
  "typero": "DOCUMENT",
  "uri": "www.juanuno.com/ro",
  "reward": 1,
  "cost": 1,
  "countAccess": "1",
  "collectors": [
    {}
  ],
  "contributors": [
	"resource:org.bforos.Researcher#1",
	"resource:org.bforos.Researcher#2"
  ]
}
```









