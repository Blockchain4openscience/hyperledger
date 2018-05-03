# Blockchain4openscience

The project website is [here](http://blockchain4openscience.com/#home).


__Abstract:__ Open science is a new movement in science that promotes principles of open access to research data, publications, and scientific collaboration. Open science promises to increase transparency and quality of research, provide reproducibility by reusing scientific datasets and increasing trust in the scientific collaboration. Blockchain fits the mindset of open science and can help to fulfill open science principles: transparency and availability of blockchain makes scientific outputs open & transparent; disintermediation removes subjectivity from scientific reviews; integrity and possibility to secure transactions in the competing environment increases trust in scientific results; smart contracts allows to manage access to scientific outputs; immutability represents precise relationships between the works with such features as richness, time-based relationships, and logical precursors.

-----
The project is curretly in development using frameworks and tools from Hyperledger, in particular [Fabric](https://hyperledger-fabric.readthedocs.io/en/release-1.1/) and [Composer](https://hyperledger.github.io/composer/latest/introduction/introduction)  


The business network is designed to capture the interactions between researchers within the academic community as well as participants from outside of the academia. The interactions involve digital research objetcs, that are shared and traded as assets accross a network. Some examples of digital research objects are: documents, presentations, datasets, code, among other object considered as valuable in the process of creating knowledge in a disciple onr accross many disicplines. A basic setup of a business network involves the digital research objets as `assets` and researchers and institutions as `participants`. These `participants` exchange the `assets` using different types of `smart contracts`. The business network may be used to register interactions among `participants`, provide tractability for the value creation process in science and it may include a system of `tokens` to reward interactiosn among participants.     

We will be posting updates on different versions of the business network `bforos-bnav1` that can be used both in the [Composer Playground](https://composer-playground.mybluemix.net/) or can be deployed locally in Fabric. The individual files that make up the business network archive are in the directory `bforos-bnav1` of the repository.

-----
In order to use any version of the business network in the [Composer Playground](https://composer-playground.mybluemix.net/) you can download the `.bna` file, for example `bforos-bnav1@0.0.1.bna` then connect to the playground,
1. Select the option to deploy a new business network.
2. In secttion 2. Model Network Starter Template select the option to Drop here   to upload or browse. This will allow you can upload any `.bna` file. 
3. Once the `.bna` file is uploaded you must deploy the business network. As soon at the business network is up and running you can follow the instructions to test or make modifications.

-----
In order to deploy into a local Fabric enviormennt please clone the repository and follow the instructions

`````
git clone https://github.com/Blockchain4openscience/hyperledger
`````
We follow the hyperledger-composer tutorial on [Deploying to a multi-organization Hyperledger Fabric](https://hyperledger.github.io/composer/latest/tutorials/deploy-to-fabric-multi-org).

Make sure that you start a fresh Hyperledger Fabric network, that is you must teardown any previous Hyperledger Fabric constainer and delete any old business network card that may exist form previous Fabric enviorments.

## Fabric Network Design

The current Hyperledger Fabric Network that will serve as a skeleton design to test out the deployment of further changes to the business network will contain two organizations `Org1` and `Org2` each with two peer nodes a certification authority and a single orderer node for the network. These components will be running insde Docker containers. This sample network is known as the `first-network` from the fabric-samples from the repository mentioned in the following tutorial.

Once the repository has been cloned then we can generate Fabric network/ security artifacts according to design of the network and following the steps mentioned in the hyperledger-composer tutorial: [Deploying a Hyperledger Composer blockchain business network to Hyperledger Fabric (multiple organizations)](https://hyperledger.github.io/composer/latest/tutorials/deploy-to-fabric-multi-org)

The tutorial is made up of prerequisites and *19 steps* that generates the network, the artifacts, cards and the element required for each organization. The steps also include the deployment of the business network to the nodes of the organization. We will make reference to the steps in the tutorial by mentioning them in *italic*. 

We modify some of these steps in order to install/deploy the business network `bforos-bnav1`,

1. In *step one* the following commands,
`````
./byfn.sh -m generate

./byfn.sh -m up -s couchdb -a
`````
generate Fabric network (given the design mentioned above) and security artifacts (certificates for all the network components and private keys). For convenience these artifacts will be kept togheter in a temporary file under `/tmp/composer/`.

2. In *steps two through four*, we must manually create a connection profile that includes the Certificate Authority (CA) certificates for all of the network components in order to connect to those network components (note that every time that we bootstrap the network these certificates will change an hence we must update the connection profile). 

This connection profile now describes the fabric network setup, all the peers, orderers and certificate authorities that are part of the network, it defines all the organizations that are participating in the network and also defines the channel's on this network. Hyperledger Composer can only interact with a single channel so only one channel should be defined. We must specify the connection profile for each or the organizations, `byfn-network-org1.json` and `byfn-network-org2.json`.

3. In *steps five and six* we must locate the the certificate and private key for the Hyperledger Fabric administrator for Org1 and Org2 in order to copy this artifacts to the temporary folder.

## Installing Business Network onto Fabric running network 

4. In *steps seven through ten* we must create and import the business network cards for the Hyperledger Fabric administrator for Org1 and Org2, respectively.
Once the business network cards are imported check them using the command `composer card list`.

5. In *steps eleven and twelve* we must install/deploy the business network `bforos-bnav1` (defined in bna file, `bforos-bnav1@0.0.1.bna`)  onto the Hyperledger Fabric peer nodes for Org1 and Org2
`````
composer network install --card PeerAdmin@byfn-network-org1 --archiveFile bforos-bnav1@0.0.1.bna

`````
`````
composer network install --card PeerAdmin@byfn-network-org2 --archiveFile bforos-bnav1@0.0.1.bna

`````
6. In *step thirteen* we define the endorsement policy for the business network. For the example the default endorsement policy is naive in the sense that only one organization has to endorse a transaction before it can be committed to the blockchain. This must be revised in the sequel. Create file in temporary folder.

7. In *steps fifteen and sixteen we retrieve business network administrator certificates for Org1 and Org2. The certficates will be placed into a directory called alice and bob in the current working directory. 

At the end of the process we must have a temporary folder as the one we find in the repository as `example-temporary-folder`. Note that each file in this folder is only for ilustrative pourpose since the certificates and the other artifact will not be the same in a different setup. In addition in this temporary folder we have included a copy of the diretories alice and bob that are created in the current working directory, `first-network`.

8. In *step seventeen* we start the business network. Only Org1 needs to perform this operation. 

`````
composer network start -c PeerAdmin@byfn-network-org1 -n bforos-bnav1 -V 0.0.1 -o endorsementPolicyFile=/tmp/composer/endorsement-policy.json -A alice -C alice/admin-pub.pem -A bob -C bob/admin-pub.pem

`````
Once this command completes, the business network will have been started. Both Alice and Bob will be able to access the business network, start to set up the business network, and onboard other participants from their respective organizations. However, both Alice and Bob must create new business network cards with the certificates that they created in the previous steps so that they can access the business network.

9. In *step eighteen* we creata a business network card to access the business network as Org1

Run the composer card create command to create a business network card that Alice, the business network administrator for Org1, can use to access the business network:

`````
composer card create -p /tmp/composer/org1/byfn-network-org1.json -u alice -n bforos-bnav1 -c alice/admin-pub.pem -k alice/admin-priv.pem

`````
Run the composer card import command to import the business network card that you just created:

`````
composer card import -f alice@bforos-bnav1.card
`````
Run the composer network ping command to test the connection to the blockchain business network:

`````
composer network ping -c alice@bforos-bnav1
`````
## Running the composer-rest-server

Generating a REST server requires running the following command
`````
composer-rest-server -c alice@bforos-bnav1 -n "never" -p 3200 
`````
The generated API is connected to the deployed blockchain and business network.

10. In *step nineteen* we create a business network card to access the business network as Org2

Run the composer card create command to create a business network card that Bob, the business network administrator for Org2, can use to access the business network:

`````
composer card create -p /tmp/composer/org2/byfn-network-org2.json -u bob -n bforos-bnav1 -c bob/admin-pub.pem -k bob/admin-priv.pem

`````
Run the composer card import command to import the business network card that you just created:

`````
composer card import -f bob@bforos-bnav1.card
`````
Run the composer network ping command to test the connection to the blockchain business network:

`````
composer network ping -c bob@bforos-bnav1
`````
## Running the composer-rest-server

Generating a REST server requires running the following command
`````
composer-rest-server -c bob@bforos-bnav1 -n "never" -p 3200 
`````
The generated API is connected to the deployed blockchain and business network.

11. Use the rest server to test the business network, using the test examples from the playground. The test examples generate two `participants:Researcher` and two `assets: ResearchOJ` (research objetcs). These will be created using each of the active API that have been deployed by each organization. This test ilustrates how both API's create participants, assets and transaccions among them.

## Stopping Hyperledger Fabric and deleting network cards

12. To stop the runtime and delete containers, run the following command
`````
./byfn.sh -m down
`````
13. Delete any 'old' business network cards that may exist in your wallet from previous Fabric environments. 
`````
composer card delete -c Card Name
`````
14. Delete your file system card store in your HOME directory as follows:
`````
rm -fr $HOME/.composer
`````










 