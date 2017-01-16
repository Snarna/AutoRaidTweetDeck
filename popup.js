$(document).ready(function(){

  $('#startAutoBattleButton').click(function(){
    chrome.runtime.sendMessage({userAction: "startAutoBattle"}, function(response){ handleResponse(response)});
  });

  $('#stopAutoBattleButton').click(function(){
    chrome.runtime.sendMessage({userAction: "stopAutoBattle"}, function(response){ handleResponse(response)});
  });

  $('#obsubmitbutton').click(function(){
    var rowNum = parseInt($('#obrownum').val());
    chrome.runtime.sendMessage({userAction: "startob", row: rowNum}, function(response){ handleResponse(response)});
  });

});


function handleResponse(response){
  if(response.userActionAnswer == "imonit"){
    $('#backgroundResponse').html("!Start! Auto Battle Msg Confirmed");
  }
  else if(response.userActionAnswer == 'istopit'){
    $('#backgroundResponse').html("!Stop! Auto Battle Msg Confirmed");
  }
}

function handleOb(response){
  $('#backgroundresponseforob').html(response.userActionAnswer);
}
