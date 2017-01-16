console.log("TweetDeck Script is in position! My lord!");

//Send TabID;
chrome.runtime.sendMessage({userAction: 'getdecktabid'},function(response){
  console.log("Tab ID:" + response.tabid);
});

//Listen to any incoming messages
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if(msg.backCommand == 'startob'){
    console.log("received back command, now start ob");
    startOb(msg.obrownum);
  }
});

function startOb(rowNum){
  //Get Row rowNum content
  var target = $(".js-chirp-container.chirp-container")[parseInt(rowNum)];

  // create an observer instance
  var observer = new MutationObserver(function(mutations){
      mutations.forEach(function(mutation) {
      var targetArticle = mutation.addedNodes[0].innerText;
      if(targetArticle.search("参戦ID") != -1){
        //Stop Observer
        observer.disconnect();
        console.log("Observation Stopped!");

        //Process String
        var p_1 = targetArticle.split("参戦ID：")[1];
        var targetId = p_1.split("Lv")[0];

        //Send To Background
        chrome.runtime.sendMessage({userAction: "observerfound", targetid: targetId},
          function(response) {
            console.log("Result:" + response.result + " Received ID:" + response.targetid);
        });
      }
    });
  });

  // configuration of the observer:
  var config = { attributes: true, childList: true, characterData: true };

  // pass in the target node, as well as the observer options
  observer.observe(target, config);

  console.log("Observation Started on row:" + rowNum);
}
