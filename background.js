var run_it;
var deckTabId = "";
var gameTabId = "";

//Listen to any incoming messages
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    //From Pop
    if (request.userAction == "startAutoBattle"){
      sendResponse({userActionAnswer: "imonit"});
      run_it = true;
      //while(run_it){
          runAuto();
      //}
    }
    //From Pop
    else if(request.userAction == 'stopAutoBattle'){
      sendResponse({userActionAnswer: "istopit"});
    }
    //From Pop
    else if(request.userAction == 'startob'){
      sendResponse({userActionAnswer: "Backend received. Start Observation On Row:" + request.row});
      startOb(request.row);
    }
    //From Content Script
    else if(request.userAction == 'observerfound'){
      sendTargetIdToGame(request.targetid);
      sendResponse({result: 1, targetid : request.targetid});
    }
    //From Content Script
    else if(request.userAction == 'getdecktabid'){
      //Store Data
      deckTabId = sender.tab.id;
      chrome.storage.sync.set({'decktabid':sender.tab.id});
      sendResponse({tabid:deckTabId});
    }
    //From Content Script
    else if(request.userAction == 'getgametabid'){
      gameTabId = sender.tab.id;
      chrome.storage.sync.set({'gametabid':sender.tab.id});
      sendResponse({tabid:gameTabId});
    }
});

// A function to use as callback
function startLoopButton(){
  var startBattleButton = document.getElementById("autoBattleButton");
  if(startBattleButton.value == "true"){
    console.log("start battle detected");
    startBattleButton.value = "false";
    startBattleButton.innerHTML = "Stop Auto Battle";
  }
  else if(startBattleButton.value == "false"){
    console.log("start battle detected");
    startBattleButton.value = "true";
    startBattleButton.innerHTML = "Start Auto Battle";
  }
}

function handlerFunction(answer) {
    switch (answer) {
      case 'won':
        finishBattle();
        break;
      default:
        console.log("I dont know what to do.");
    }
}

function runAuto(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {text: 'clickQuestButton'});
  setTimeout(function(){chrome.tabs.sendMessage(tabs[0].id, {text: 'clickSpecialButton'});}, 5000);
  setTimeout(function(){chrome.tabs.sendMessage(tabs[0].id, {text: 'clickEventButton'});}, 10000);
  setTimeout(function(){chrome.tabs.sendMessage(tabs[0].id, {text: 'clickPlayButton'});}, 14000);
  setTimeout(function(){chrome.tabs.sendMessage(tabs[0].id, {text: 'clickEventButton'});}, 10000);
  setTimeout(function(){chrome.tabs.sendMessage(tabs[0].id, {text: 'clickSelectButton'});}, 13000);
  setTimeout(function(){chrome.tabs.sendMessage(tabs[0].id, {text: 'clickPlayButton'});}, 14000);
  setTimeout(function(){chrome.tabs.sendMessage(tabs[0].id, {text: 'clickWindSummon'});}, 18000);})
  //Then Start Battle ...
}

function startOb(rowNum){
  console.log("deckid:" + deckTabId + " gameid:" + gameTabId);
  var tempId = chrome.storage.sync.get('decktabid', function(obj){
    console.log("Inside get callback! RowNum:" + rowNum);
    chrome.tabs.sendMessage(obj.decktabid, {backCommand: 'startob', obrownum: rowNum});
  });
}


function sendTargetIdToGame(targetId){
  console.log("deckid:" + deckTabId + " gameid:" + gameTabId +  " targetId:" + targetId);
  var tempId = chrome.storage.sync.get('gametabid', function(obj){
    console.log("Inside get callback! targetId:" + targetId);
    chrome.tabs.update(obj.gametabid, {selected:true});
    chrome.tabs.sendMessage(obj.gametabid, {backCommand: 'injecttogame', targetid: targetId});
  });
}

// When the browser-action button is clicked...
/*
  setTimeout(function(){
  chrome.tabs.sendMessage(tabs[0].id, {text: 'clickSpecialButton'});
  }, 5000);
  setTimeout(function(){
    chrome.tabs.sendMessage(tabs[0].id, {text: 'clickEventButton'});
  }, 10000);
  setTimeout(function(){
    chrome.tabs.sendMessage(tabs[0].id, {text: 'clickSelectButton'});
  }, 13000);
  setTimeout(function(){
    chrome.tabs.sendMessage(tabs[0].id, {text: 'clickPlayButton'});
  }, 14000);
  setTimeout(function(){
    chrome.tabs.sendMessage(tabs[0].id, {text: 'clickWindSummon'});
  }, 18000);
  setTimeout(function(){
    chrome.tabs.sendMessage(tabs[0].id, {text: 'startBattle'});
  }, 19500);
  setTimeout(function(){
    chrome.tabs.sendMessage(tabs[0].id, {text: 'attack'});
  }, 25000);
  setTimeout(function(){
    chrome.tabs.sendMessage(tabs[0].id, {text: 'startAuto'});
  }, 26000);
  setTimeout(function(){
    chrome.tabs.sendMessage(tabs[0].id, {text: 'collectExpButton'}, function(response) {handlerFunction(response.answer);});
  }, 27000);
*/

function finishBattle(){
  chrome.tabs.sendMessage(tabs[0].id, {text: 'finishBattleButton'});
}
