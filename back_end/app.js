const express = require('express');
const app = express();
const PORT = 9000;

app.use(express.json());

var details = {
	"companyName": "Bhagwan Parshuram Institute of Technology",
	"clientID":"ffa685d2-b70d-4fdd-8444-0b20582e29ee",
	"ownerName": "Arisht Mehta Jain",
	"ownerEmail": "arishtjain2000@gmail.com",
	"rollNo": "02020802820",
	"clientSecret":"RjeBcwALIUsAavSz"
};
var token = {
	"token_type": "Bearer",
	"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTA1NDMwNTksImNvbXBhbnlOYW1lIjoiQmhhZ3dhbiBQYXJzaHVyYW0gSW5zdGl0dXRlIG9mIFRlY2hub2xvZ3kiLCJjbGllbnRJRCI6ImZmYTY4NWQyLWI3MGQtNGZkZC04NDQ0LTBiMjA1ODJlMjllZSIsIm93bmVyTmFtZSI6IiIsIm93bmVyRW1haWwiOiIiLCJyb2xsTm8iOiIwMjAyMDgwMjgyMCJ9.xrCQNBQvqXrtboHk3UcQCL8tIpeO4kKoVLVGdPdhJuo",
	"expires_in": 1690543059
};

var ApiAccess = token.access_token;

var request = require('request');
function updateToken(details){
    var clientServerOptions = {
        uri: 'http://20.244.56.144/train/auth',
            body: JSON.stringify(details),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    request(clientServerOptions, function (error, response) {
        console.log(error,response.body);
        token = response.body;
        ApiAccess = token.access_token;
        return (token,ApiAccess);
    });
}

function getTrainsList(ApiAccess){
    var clientServerOptions = {
        uri: 'http://20.244.56.144/train/trains',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorisation-token': ApiAccess
            }
        }
    request(clientServerOptions, function (error, response) {
        console.log(error,response.body);
        return (JSON.parse(response.body));
    });
}

function getTrainData(ApiAccess,TrainNumer){
    var clientServerOptions = {
        uri: 'http://20.244.56.144/train/trains/'+ TrainNumer,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorisation-token': ApiAccess
            }
        }
    request(clientServerOptions, function (error, response) {
        console.log(error,response.body);
        return (response.body);
    });
}

function DepartTimeCalc(DepartTime,delay){
    time = DepartTime;
    time.Minutes = (DepartTime.Minutes + delay) % 60;
    time.Hours = (DepartTime.Minutes + delay) / 60;
    return time
}

function compareByDeparture(a, b) {
    if ((a.DepartTime.Hours*60*60+a.DepartTime.Minutes*60+a.DepartTime.Seconds) < (b.DepartTime.Hours*60*60+b.DepartTime.Minutes*60+b.DepartTime.Seconds)) {
      return 1;
    }
    if ((a.DepartTime.Hours*60*60+a.DepartTime.Minutes*60+a.DepartTime.Seconds) > (b.DepartTime.Hours*60*60+b.DepartTime.Minutes*60+b.DepartTime.Seconds)) {
      return -1;
    }
    return 0;
}
function compareByTics(a, b) {
    if ((a.seatsAvailable.sleeper+a.seatsAvailable.AC) < (b.seatsAvailable.sleeper+b.seatsAvailable.AC)) {
      return 1;
    }
    if ((a.seatsAvailable.sleeper+a.seatsAvailable.AC) > (b.seatsAvailable.sleeper+b.seatsAvailable.AC)) {
      return -1;
    }
    return 0;
}
function compareByPrice(a, b) {
    if ((a.price.sleeper+a.price.AC) < (b.price.sleeper+b.price.AC)) {
      return -1;
    }
    if ((a.price.sleeper+a.price.AC) > (b.price.sleeper+b.price.AC)) {
      return 1;
    }
    return 0;
}

app.get('/trains', (req, res)=>{
    jsonObjectArray = getTrainsList(token)
    jsonObjectArray.forEach(element => {
        element.DepartTime = DepartTimeCalc(element.DepartTime,element.delayedBy)
    });
    jsonObjectArray.sort(compareByDeparture);jsonObjectArray.sort(compareByTics);jsonObjectArray.sort(compareByPrice);
    res.json(a);
});

app.get('/trains/${TrainNumer', (req, res)=>{
    jsonObject = getTrainData(token,req.TrainNumer)
    jsonObject.DepartTime = DepartTimeCalc(jsonObject.DepartTime,jsonObject.delayedBy)
    res.json(a);
});
  
app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);