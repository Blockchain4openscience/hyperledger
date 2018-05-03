/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
* Claim a Research object after it is created
* Reciebe a reward on succesefully claimed Ro's
*@param {org.bforos.Claim} claimData
*@transaction
*/
function claimRO(claimData){
    // define reward for claiming objetc
    var points = claimData.Ro.reward;
    // get wallet balance from claimant
    var balance = claimData.claimer.wallet;
    // new balance
    claimData.claimer.wallet=balance+points;
    // assigned ownership of claimed objetc
    claimData.Ro.owner=claimData.claimer;
    // 1. update asset registry
    return getAssetRegistry('org.bforos.ResearchOJ')
    .then(function (assetRegistry) {
      return assetRegistry.update(claimData.Ro);
    }).then(function(){
    // 2. update participant registry
    return getParticipantRegistry('org.bforos.Researcher')
    })    
    .then(function (participantRegistry) {
      return participantRegistry.update(claimData.claimer);
    })
    .then(function () {
        // Emit an event for the modified participant wallet.
        var event = getFactory().newEvent('org.bforos', 'WalletEvent');
        event.claimer = claimData.claimer;
        event.oldbalance = balance;
        event.newbalance = balance+points;
        emit(event);
    });
}

/**
* Collect Research object for use in own research
* pay the cost of collectin Ro's
*@param {org.bforos.Collect} collectData
*@transaction
*/
function collectRO(collectData){
    // define cost for collecting objetc
    var points = collectData.Ro.cost;
    // get wallet balance from collector
    var balance = collectData.claimer.wallet;
    if (balance-points<0){
        throw new Error('Wallet amount insuficient for transaction');
    } else {
        // new balance
        collectData.claimer.wallet=balance-points;
    }
    return getParticipantRegistry('org.bforos.Researcher')
    .then(function (participantRegistry) {
        return participantRegistry.update(collectData.claimer);
      })
      .then(function () {
          // Emit an event for the modified participant wallet.
          var event = getFactory().newEvent('org.bforos', 'WalletEvent');
          event.claimer = collectData.claimer;
          event.oldbalance = balance;
          event.newbalance = balance-points;
          emit(event);
      });
}

/**
* Enrich a Research object after it is created
* Recieve a reward on succesefully Enriched Ro's
*@param {org.bforos.Enrich} enrichData
*@transaction
*/
function enrichRO(enrichData){
    // define reward for enriching objetc
    var points = enrichData.Ro.reward;
    // get wallet balance for contributor
    var balance = enrichData.contributor.wallet;
    // new balance
    enrichData.contributor.wallet=balance+points;
    // assigned contributor of enriched objetc
    enrichData.Ro.contributor=enrichData.contributor;
    // 1. update asset registry
    return getAssetRegistry('org.bforos.ResearchOJ')
    .then(function (assetRegistry) {
      return assetRegistry.update(enrichData.Ro);
    }).then(function(){
    // 2. update participant registry
    return getParticipantRegistry('org.bforos.Researcher')
    })    
    .then(function (participantRegistry) {
      return participantRegistry.update(enrichData.contributor);
    })
    .then(function () {
        // Emit an event for the modified participant wallet.
        var event = getFactory().newEvent('org.bforos', 'WalletEvent');
        event.claimer = enrichData.contributor;
        event.oldbalance = balance;
        event.newbalance = balance+points;
        emit(event);
    });
}

