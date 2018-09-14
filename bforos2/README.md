# bforos-bnav2

# Blockchain4openscience

Blockchain4openscience.org implements the blockchain 
for open science using various reward mechanisms by
smart contracts over assets (research objetcs) and transactions. It also provides a pluggable registry for existing repositories of Research Objects.

This business network defines:

 **Participant** </p>
`Researcher` </p>
`Institution` 

**Asset** </p>
`ResearchOJ` </p> 
`Disco` (Not included yet)

**Transaction** </p>
`Claim` </p>
`Collect\CreateDisco` (Not included yet)

**Event**
`WalletEvent`

`Researcher` is created as a participant in the network. A set of research objects `ResearchOJ` are identified as possibly belonging to the `Researcher` within an existing registry (GitHub, RO2share,..etc). The metadata that characterizes the `ResearchOJ` is captured at the moment the opbject is created (type of object, description, location, publishers,..etc.). Initially the `ResearchOJ` is declared and then claimed by the researcher. The `Researcher` recived an reward from claiming a `ResearchOJ` this reward will be reflected in his personal wallet using the smart contract `Claim` that generates an event `WalletEvent` that indicates that the wallet has been updated. Additionally, the smart contract `Claim` assigns ownership of the asset to the `Reasearcher`. 

To test this Business Network Definition in the **Test** tab:

Create two `Researcher` participant:

```
{
  "$class": "org.bforos.Researcher",
  "email": "juan.uno@bforos.org",
  "firstName": "juan",
  "lastName": "uno",
  "wallet": 10
}
```

```
{
  "$class": "org.bforos.Researcher",
  "email": "juan.dos@bforos.org",
  "firstName": "juan",
  "lastNam": "dos",
  "wallet": 10
}
```

Create two `ResearchOJ` asset:

```
{
  "$class": "org.bforos.ResearchOJ",
  "ROId": "0001",
  "typero": "journalArticle",
  "description": "The determinants of ",
  "urls": [
    "www.page1.com",
    "www.page2.com"
  ],
  "reward": 5,
  "cost": 1
}
```
*actualmente esta transaccion no esta funcionando pues debemos garantizar que la introduccion del contributor pueda ser multiple (hay varias autores que pueden hacer claim sobre un mismo RO). Hay que ajustar el codigo .js para permitir esto*

Submit a `Claim` transaction:
```
{
  "$class": "org.bforos.Claim",
  "Ro": "resource:org.bforos.ResearchOJ#0001",
  "contributor": "resource:org.bforos.Researcher#juan.uno@bforos.org"
}
```
This transaction has registered the research objet `ROId:RO01` to `juan.uno@bforos.org`; additionally it rewards 5 points to `juan.uno@bforos.org`. This reward will be reflected in the new state of his wallet; the change in the state of the wallet is recorded as an event.

```
{
 "$class": "org.bforos.WalletEvent",
 "claimer": "resource:org.bforos.Researcher#juan.uno@bforos.org",
 "oldbalance": 10,
 "newbalance": 15,
 "eventId": "ce75b0e7-554b-4fff-a890-dee65067338c#0",
 "timestamp": "2018-02-28T16:03:44.534Z"
}
```

There are other smart contract in this business network, `Collect\CreateDisco`. That we are in the process of designing.

