
// Listen for messages
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    switch (msg.text) {
      case 'clickQuestButton':
        clickQuestButton();
        sendResponse({answer: "done"});
        break;
      case 'clickSpecialButton':
        clickSpecialButton();
        sendResponse({answer: "done"});
        break;
      case 'clickEventButton':
        clickEventButton();
        sendResponse({answer: "done"});
        break;
      case 'clickSelectButton':
        clickSelectButton();
        sendResponse({answer: "done"});
        break;
      case 'clickPlayButton':
        clickPlayButton();
        sendResponse({answer: "done"});
        break;
      case 'clickWindSummon':
        clickWindSummon();
        sendResponse({answer: "done"});
        break;
      case 'startBattle':
        startBattle();
        sendResponse({answer: "done"});
        break;
      case 'attack':
        attack();
        sendResponse({answer: "done"});
        break;
      case 'startAuto':
        startAuto();
        sendResponse({answer: "done"});
        break;
      case 'collectExpButton':
        collectExpButton();
        sendResponse({answer: "won"});
        break;
      case 'finishBattleButton':
        finishBattleButton();
        sendResponse({answer: "done"});
        break;
      default:
        console.log("Not a valid command:" + msg.text);
    }
});

var specialButton = $('.btn-extra-quest');

function clickQuestButton(){
  console.log("I received msg, clickQuestButton");
  var inCode = "$('.btn-link-quest.se-ok').trigger('tap');";
  var script = document.createElement('script');
  script.innerHTML = inCode;
  document.body.appendChild(script);
}

function clickSpecialButton(){
  console.log("I received msg, clickSpecialButton");
  var inCode = "$('.btn-extra-quest').trigger('tap')";
  var script = document.createElement('script');
  script.innerHTML = inCode;
  document.body.appendChild(script);
}

function clickEventButton(){
  console.log("I received msg, clickEventButton");
  var inCode = "$('#tab-event-quest').trigger('tap')";
  var script = document.createElement('script');
  script.innerHTML = inCode;
  document.body.appendChild(script);
}

function clickSelectButton(){
  console.log("I received msg, clickSelectButton");
  var inCode = "$(\".btn-stage-detail[data-group='2']\").trigger('tap')";
  var script = document.createElement('script');
  script.innerHTML = inCode;
  document.body.appendChild(script);
}

function clickPlayButton(){
  console.log("I received msg, clickPlayButton");
  var inCode = "$(\".btn-set-quest[data-chapter-id='71008']\").trigger('tap')";
  var script = document.createElement('script');
  script.innerHTML = inCode;
  document.body.appendChild(script);
}

function clickWindSummon(){
  console.log("I received msg, clickWindSummon");
  var inCode = "$(\".btn-supporter.lis-supporter[data-attribute='4']\").first().trigger('tap')";
  var script = document.createElement('script');
  script.innerHTML = inCode;
  document.body.appendChild(script);
}

function startBattle(){
  console.log("I received msg, clickWindSummon");
  var inCode = "$(\".btn-usual-ok.se-quest-start\").first().trigger('tap')";
  var script = document.createElement('script');
  script.innerHTML = inCode;
  document.body.appendChild(script);
}

function attack(){
  console.log("I received msg, attack");
  var inCode = "$(\".btn-attack-start\").first().trigger('tap');";
  var script = document.createElement('script');
  script.innerHTML = inCode;
  document.body.appendChild(script);
}

function startAuto(){
  console.log("I received msg, startAuto");
  var inCode = "$(\".btn-auto\").first().trigger('tap');";
  var script = document.createElement('script');
  script.innerHTML = inCode;
  document.body.appendChild(script);
}

//bug here
function collectExpButton(){
  console.log("I received msg, Wait Battle");
  var okButton = $(".btn-usual-ok").first();
  while(okButton.size() == 0){
    var okButton = $(".btn-usual-ok").first();
  }
  console.log("I found the exp button, click on it");
  okButton.trigger('tap');
  var inCode = "$(\".btn-usual-ok\").first().trigger('tap')";
  var script = document.createElement('script');
  script.innerHTML = inCode;
  document.body.appendChild(script);
}

function finishBattleButton(){
  console.log("I received msg, finish battle go back to quest");
  var inCode = "$('.btn-control').first().trigger('tap')";
  var script = document.createElement('script');
  script.innerHTML = inCode;
  document.body.appendChild(script);
}
