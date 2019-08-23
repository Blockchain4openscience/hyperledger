# Blockchain4openscience

Blockchain4openscience.org implements the blockchain for open science using various reward mechanisms by
smart contracts over assets (research objetcs) and transactions.

This business network defines:

 **Participant**
`Researcher`
`Institution`

**Asset**
`ResearchOJ`
`Disco`

**Transaction**
`CreateResearcherOJ`
`CreateDisco`
`ClaimRO`
`ClaimDisco`
`CollectRO`
`CollectDisco`
`Enrich`

**Event**
`WalletEvent`
`CountEvent`

## Resercher Objects

`ResearchOJ` asset is a component based on different types of research elements (document, code, database, presentation, image, etc..) stored in the World Wide Web. In addition to basic information (id, url, type), `ResearchOJ` asset has reward, cost and a count of the times it is accessed. A `ResearchOJ` can be created, claimed and collected by a `Researcher`. A `ResearchOJ` also can be counted with the smart contract `CountRO`. This transaction also generates a reward for the `Researchers` registred as contributors of the `ResearcherOJ`

## Researcher

`Reasearcher` participant is able to `create` a research object `ResearchOJ` asset. Initially the `ResearchOJ` is added to system and the `Reasearcher` recieved an reward from create a `ResearchOJ`. This reward will be reflected in his personal wallet using the smart contract `CreateResearchOJ` that generates an event `WalletEvent` that indicates that the wallet has been updated. Additionally, the smart contract `CreateResearchOJ` assigns as contributor of the asset to the `Reasearcher`.

`Reasearcher` participant is able to `claim` a research object `ResearchOJ` asset. Initially the `ResearchOJ` is declared and then claimed by the researcher. The `Reasearcher` recieved an reward from claiming a `ResearchOJ` this reward will be reflected in his personal wallet using the smart contract `Claim` that generates an event `WalletEvent` that indicates that the wallet has been updated. Additionally, the smart contract `Claim` assigns as contributor of the asset to the `Reasearcher`. 

This participant also is able to `collect` a research object `ResearcherOJ` asset belongs to another `Researcher`. The `Reasearcher` paid a cost for collect a `ResearchOJ` and generates an event `WalletEvent` that indicates that the wallet has been updated. This transaction also generates a reward for the `Researchers` registred as contributors of the `ResearcherOJ` using the smart contract  `Collect` that generates an event `WalletEvent` for each contributors. Additionally, the smart contract `Collect` assigns as collector of the asset to the `Reasearcher`.

To test this Business Network Definition in the **Test** tab:

Create two `Researcher` participant:

```json
{
  "$class": "org.bforos.Researcher",
  "researcherId": "1",
  "email": "juan.uno@bforos.org",
  "firstName": "juan",
  "lastName": "uno",
  "wallet": 10
}
```

```json
{
  "$class": "org.bforos.Researcher",
  "researcherId": "2",
  "email": "juan.dos@bforos.org",
  "firstName": "juan",
  "lastName": "dos",
  "wallet": 10
}
```

```json
{
  "$class": "org.bforos.Researcher",
  "researcherId": "3",
  "email": "juan.tres@bforos.org",
  "firstName": "juan",
  "lastName": "tres",
  "wallet": 10
}
```

Create two `ResearchOJ` asset. 

1. The research objects can be created directly. With this method you can create a research object without contributors: 

```json
{
  "$class": "org.bforos.ResearchOJ",
  "researchObjId": "RO01",
  "typeRO": "DOCUMENT",
  "uri": "www.juanuno.com/ro",
  "reward": 5,
  "cost": 1,
  "countAccess": 0,
  "collectors": [],
  "contributors": []
}```

2. The research objects can be created by the smart contract `CreateResearchOJ`. 

```json
{
  "$class": "org.bforos.CreateResearchOJ",
  "researchObjId": "RO02",
  "typeRO": "DOCUMENT",
  "uri": "www.juanuno.com/ro",
  "creator": "resource:org.bforos.Researcher#1"
}
```

Unlike the first method, this method generate a wallet event for `juan.uno@bforos.org` that create the researcher object an assigns as contributor

```json
{
 "$class": "org.bforos.WalletEvent",
 "claimer": "resource:org.bforos.Researcher#1",
 "operation": "CREATE",
 "oldBalance": 10,
 "newBalance": 11,
 "eventId": "982ec621-f877-4497-8051-48ee76502bab#0",
 "timestamp": "2018-10-10T22:41:04.329Z"
}
```

Submit a `ClaimRO` transaction:

```json
{
  "$class": "org.bforos.ClaimRO",
  "researchObj": "resource:org.bforos.ResearchOJ#RO01",
  "claimer": "resource:org.bforos.Researcher#2"
}
```

This transaction has registered the research objet `ROId:RO01` to `juan.dos@bforos.org` as contributor; additionally it rewards 5 points to `juan.dos@bforos.org`. This reward will be reflected in the new state of his wallet; the change in the state of the wallet is recorded as an event.

```json
{
 "$class": "org.bforos.WalletEvent",
 "claimer": "resource:org.bforos.Researcher#2",
 "operation": "CLAIM",
 "oldBalance": 10,
 "newBalance": 15,
 "eventId": "3b7978ed-f13f-4559-a64c-2db25cdc32af#0",
 "timestamp": "2018-10-10T22:44:20.290Z"
}
```

Submit a `CollectRO` transaction:

```json
{
  "$class": "org.bforos.CollectRO",
  "researchObj": "resource:org.bforos.ResearchOJ#RO01",
  "collector": "resource:org.bforos.Researcher#3"
}
```

This transaction allows the research object `ROId:RO01` to be used by `juan.tres@bforos.org` and records this in the registry as collector. Additionally the collection of the object has a cost of 1 point for `juan.tres@bforos.org`. This cost will be reflected in the new state of his wallet; the change in the state of the wallet is recorded as an event using WalletEvent, that we used before. Additionally it rewards 5 points to `juan.dos@bforos.org` because he is a contributors of the research object. This reward will be reflected in the new state of his wallet; the change in the state of the wallet is recorded as an event.

```json
{
 "$class": "org.bforos.WalletEvent",
 "claimer": "resource:org.bforos.Researcher#3",
 "operation": "COLLECT",
 "oldBalance": 10,
 "newBalance": 9,
 "eventId": "46758e6b-51c0-42d2-945c-3d6bc5cab01d#1",
 "timestamp": "2018-10-10T22:46:40.991Z"
}```

```json
{
 "$class": "org.bforos.WalletEvent",
 "claimer": "resource:org.bforos.Researcher#2",
 "operation": "COLLECT",
 "oldBalance": 15,
 "newBalance": 20,
 "eventId": "46758e6b-51c0-42d2-945c-3d6bc5cab01d#0",
 "timestamp": "2018-10-10T22:46:40.991Z"
}
```

Submit a `CountRO` transaction

```json
{
 "$class": "org.bforos.CountRO",
 "researchObj": "resource:org.bforos.ResearchOJ#RO01",
 "description": "description information"
}
``` 

This transaction allows increment a counter access field in the research object `ROId:RO01`. Additionally it rewards 5 points to `juan.dos@bforos.org` because he is a contributor of the research object. This reward will be reflected in the new state of his wallet; the change in the state of the wallet is recorded as an event.


```json
{
 "$class": "org.bforos.CountEvent",
 "researchObj": "resource:org.bforos.ResearchOJ#RO01",
 "description": "description information",
 "oldCountAccess": 0,
 "newCountAccess": 1,
 "eventId": "34fa9218-0b89-4e4f-8ac0-891d54285a08#1",
 "timestamp": "2018-10-10T22:51:02.165Z"
}
```

```json
{
 "$class": "org.bforos.WalletEvent",
 "claimer": "resource:org.bforos.Researcher#2",
 "operation": "ACCESS",
 "oldBalance": 20,
 "newBalance": 25,
 "eventId": "34fa9218-0b89-4e4f-8ac0-891d54285a08#0",
 "timestamp": "2018-10-10T22:51:02.165Z"
}
```

In order to create a `Disco` asset we need to select the research objects that will be contained into
this new aggregator asset, for example create a disco from `RO01` and `RO02` that have been previously creatred

```json
{
  "$class": "org.bforos.CreateDisco",
  "discoId": "DC01",
  "title": "disco for RO01 and RO02",
  "researchObjs": ["resource:org.bforos.ResearchOJ#RO01","resource:org.bforos.ResearchOJ#RO02"],
  "creator": "resource:org.bforos.Researcher#1"
}
```