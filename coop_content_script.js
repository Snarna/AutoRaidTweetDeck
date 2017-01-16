//Actual Function
var inCode = "function fastJoin(){if($(\".btn-usual-join\").size() > 0){$(\".btn-usual-join\").first().trigger('tap')}setTimeout( fastJoin, 100 );}; fastJoin()";
var script = document.createElement('script');
script.innerHTML = inCode;
document.body.appendChild(script);

//Trigger The Actual Function
var inCode = "setTimeout(function(){ fastJoin();}, 1000 )";
var script = document.createElement('script');
script.innerHTML = inCode;
document.body.appendChild(script);
console.log("Success Entered Fast Join Mode..");
