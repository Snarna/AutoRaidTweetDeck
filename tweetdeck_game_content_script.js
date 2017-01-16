console.log("TweetDeck Game Side Script is in position! My lord!");

//Send TabID;
chrome.runtime.sendMessage({userAction: 'getgametabid'},function(response){
  console.log("Tab ID:" + response.tabid);
});

//Listen to any incoming messages
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if(msg.backCommand == 'injecttogame'){
    startInjection(msg.targetid);
  }
});

function startInjection(targetId){
  console.log("Start Injection");
  insertAndJoin(targetId);
  selectSummon();
  finalGo();
}

function tapJoinButton(){
  var inCode = "$(\".btn-post-key\").first().trigger('tap');";
  var script = document.createElement('script');
  script.innerHTML = inCode;
  document.body.appendChild(script);
}

function tapSummon(index){
  var inCode = "$($(\".btn-supporter.lis-supporter[data-attribute='5']\").get("+index+")).trigger('tap');";
  var script = document.createElement('script');
  script.innerHTML = inCode;
  document.body.appendChild(script);
}

function tapFinalButton(){
  var inCode = "$('.btn-usual-ok.se-quest-start').first().trigger('tap')";
  var script = document.createElement('script');
  script.innerHTML = inCode;
  document.body.appendChild(script);
}


function insertAndJoin(targetId){
  $('.frm-battle-key')[0].value = targetId;
  tapJoinButton();
}

function selectSummon(){
  if($(".btn-supporter.lis-supporter[data-attribute='5']").length > 0){
    //data-attribute == 5 is light
    $(".btn-supporter.lis-supporter[data-attribute='5']").each(function(index, object){
      //2040056000 == Lucifer
      if($(object).find("div.prt-summon-image").attr("data-image") == "2040056000"){
          //Select Lucifer
          tapSummon(index);

          //Exit Loop
          return false;
      }
    });
  }
  setTimeout(selectSummon,1000);
}

function finalGo(){
  if($('.pop-deck.supporter_raid').length > 0){
    tapFinalButton();
  }
  setTimeout(finalGo, 1000);
}
