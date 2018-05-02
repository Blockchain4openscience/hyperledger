# Blockchain4openscience

The project website is [here](http://blockchain4openscience.com/#home).


__Abstract:__ Open science is a new movement in science that promotes principles of open access to research data, publications, and scientific collaboration. Open science promises to increase transparency and quality of research, provide reproducibility by reusing scientific datasets and increasing trust in the scientific collaboration. Blockchain fits the mindset of open science and can help to fulfill open science principles: transparency and availability of blockchain makes scientific outputs open & transparent; disintermediation removes subjectivity from scientific reviews; integrity and possibility to secure transactions in the competing environment increases trust in scientific results; smart contracts allows to manage access to scientific outputs; immutability represents precise relationships between the works with such features as richness, time-based relationships, and logical precursors.

-----
The project is curretly in development using frameworks and tools from Hyperledger, in particular [Fabric](https://hyperledger-fabric.readthedocs.io/en/release-1.1/) and [Composer](https://hyperledger.github.io/composer/latest/introduction/introduction)  


The business network is designed to capture the interactions between researchers within the academic community as well as participants from outside of the academia. The interactions involve digital research objetcs, that are shared and traded as assets accross a network. Some examples of digital research objects are: documents, presentations, datasets, code, among other object considered as valuable in the process of creating knowledge in a disciple onr accross many disicplines. A basic setup of a business network involves the digital research objets as `assets` and researchers and institutions as `participants`. These `participants` exchange the `assets` using different types of `smart contracts`. The business network may be used to register interactions among `participants`, provide tractability for the value creation process in science and it may include a system of `tokens` to reward interactiosn among participants.     

We will be posting updates on different versions of the business network `bforos-bnav1@0.0.1.bna` that can be used both in the [Composer Playground](https://composer-playground.mybluemix.net/) or can be deployed locally in Fabric.  

-----
In order to use any version of the business network in the [Composer Playground](https://composer-playground.mybluemix.net/) you can download the `.bna` file, for example `bforos-bnav1@0.0.1.bna` then connect to the playground,
1. Select the option to deploy a new business network.
2. In secttion 2. Model Network Starter Template select the option to Drop here   to upload or browse. This will allow you can upload any `.bna` file. 
3. Once the `.bna` file is uploaded you must deploy the business network. As soon at the business network is up and running you can follow the instructions to test or make modifications.

-----
In order to deploy into a local Fabric enviormennt please clone the repository and follow the instructions

`````
https://github.com/Blockchain4openscience/hyperledger
`````
We follow the hyperledger-composer tutorial on [Deploying to a multi-organization Hyperledger Fabric](https://hyperledger.github.io/composer/latest/tutorials/deploy-to-fabric-multi-org).

Make sure that you start a fresh Hyperledger Fabric network, that is you must teardown any previous Hyperledger Fabric constainer and delete any old business network card that may exist form previous Fabric enviorments.

## Fabric Network Design

The current Hyperledger Fabric Network that will serve as a skeleton design to test out the deployment of further changes to the business network will contain two organizations `Org1` and `Org2` each with two peer nodes a certification authority and a single orderer node for the network. These components will be running insde Docker containers.

Once the repositoty has been cloned then we can generate Fabric network/ security artifact according to design of the network

`````
./startFabric.sh
`````