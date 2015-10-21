// Problem: We needs a simple way to look at a user's badge count and Javascript points
// Solution: use node.js to connect to the Treehouse API to get profile information to print out
var http=require("http");
var https=require("https");
//print out message
function printMessage(username, badgeCount, points){
	var message = username + " has " + badgeCount + " total badge(s) and " + points + " in Javascript";
	console.log(message)
}

//print out error messages
function printError(error){
  console.error(error.message);
}


//connect to the API url (http://teamteahouse.com/michaeldenatale.json)

function get(username){
  var request = https.get("https://teamtreehouse.com/" + username + ".json", function(response){
    console.dir(response.statusCode);
    var body="";
    //read the data
    response.on('data', function (chunk) {
      body+=chunk;    
  
  
    });
    response.on("end", function(){
      if(response.statusCode===200){  
        try{
          //Parse the data
          var profile=JSON.parse(body);
          //Print the dataout
          printMessage(profile.name, profile.badges.length, profile.points.JavaScript);
        }
        catch(error){
        //parse error
          printError(error);
        }
      }
      else{
        //status code error
        printError({message: "there was an error getting a profile in getting the profile for " + username + ". (" + http.STATUS_CODES[response.statusCode] + ")"});
      }
    });
  });
  //connection error
  request.on("error", printError);
}




module.exports.get=get;