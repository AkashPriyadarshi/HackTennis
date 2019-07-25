var express = require('express');
const request = require('request');
var myParser = require("body-parser");
const fs = require('fs');
var app = express();

// Replace <Subscription Key> with your valid subscription key.
const subscriptionKey = '828ee602188545b2ac6af94efb08485f';

app.use(myParser.urlencoded({
  extended: true
}));

/**bodyParser.json(options)
* Parses the text as JSON and exposes the resulting object on req.body.
*/
app.use(myParser.json());

// You must use the same location in your REST call as you used to get your
// subscription keys. For example, if you got your subscription keys from
// westus, replace "westcentralus" in the URL below with "westus".
const uriBase =
    'https://westcentralus.api.cognitive.microsoft.com/vision/v2.0/analyze?visualFeatures=Objects';

var imageUrl = '';
// https://raw.githubusercontent.com/AkashPriyadarshi/HackTennis/master/images/00028.jpg

var startTime = new Date();

// POST request
app.get('/analyze', function (req, res){
    //var array = [28, 29, 30, 31, 32, 33, 34, 35];
    var array= [];
    for(var j = 1;j<=378;j+=10){
        array[j-1] = j;
    }

    forehands = [

    ];
    backhands = [

    ];
    didNotDetect = [
        
    ];
    var visited = new Array(117);

    array.forEach((item) => {
        console.log('');
        imageUrl = "https://raw.githubusercontent.com/AkashPriyadarshi/HackTennis/master/images/grasslawn/";
        var number = 0;
        if(item < 10){
            number = '00' + item;
        } else if(item < 100) {
            number = '0' + item;
        } else {
            number = item;
        }
        imageUrl += number;
        // imageUrl += item;
        imageUrl += ".jpg";
        console.log('i == ' + item);
        console.log('imageUrl == ' + imageUrl);
        
        console.log('sleeping for one second');
        // setTimeout(function () {
        //     analyze(imageUrl, number, array, visited);
        // }, 1000); 
        analyze(imageUrl, number, array, visited);
    });

    setTimeout(function () {   
        res.send({
            "forehands":forehands,
            "backhands":backhands
        })
    }, 10000); 
});

function analyze(imageUrl, number, arrayOfAllElements, visited) {
    var personDetected = false;
    var ballDetected = false;
    var racquetDetected = false;

    const params = {
        'visualFeatures': 'Objects',
        'details': '',
        'language': 'en'
    };
      
    const options = {
    uri: uriBase,
    qs: params,
    body: '{"url": ' + '"' + imageUrl + '"}',
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key' : subscriptionKey
        }
    };
        
    request.post(options, (error, response, body) => {
        if (error) {
            console.log('Error: ', error);
            return;
        }

        let rectangles = JSON.parse(body).objects;
        if(rectangles === undefined || rectangles === null) {
            rectangles = [];
            
        }

        if(imageUrl === 'https://raw.githubusercontent.com/AkashPriyadarshi/HackTennis/master/images/grasslawn/240.jpg') {
            console.log('printing for 240 - start')
            console.log(JSON.parse(body));
            console.log('printing for 240 - end');
        }
            
        // variables
        var ballStartX = 0;
        var ballStartY = 0;
        var ballEndX = 0;
        var ballEndY = 0;
    
        var personStartX = 0;
        var personStartY = 0;
        var personEndX = 0;
        var personEndY = 0;
    
        var racquetStartX = 0;
        var racquetStartY = 0;
        var racquetEndX = 0;
        var racquetEndY = 0;
    
        // analysis algorithm
        // console.log(rectangles);
        rectangles.forEach((rectangle) => {
        var currentRectangle = rectangle;
            // console.log(currentRectangle);
            var rectangleCoordinates = currentRectangle.rectangle;

            // tennis ball
            if(currentRectangle.object === 'tennis ball'){
                // console.log('inside tennis ball')
                ballStartX = rectangleCoordinates.x;
                ballStartY = rectangleCoordinates.y;
                ballEndX = rectangleCoordinates.x + rectangleCoordinates.w;
                ballEndY = rectangleCoordinates.y + rectangleCoordinates.h;
                ballDetected = true;
            }
        
            // person
            else if(currentRectangle.object === 'person'){
                // console.log('inside person')
                personStartX = rectangleCoordinates.x;
                personStartY = rectangleCoordinates.y;
                personEndX = rectangleCoordinates.x + rectangleCoordinates.w;
                personEndY = rectangleCoordinates.y + rectangleCoordinates.h;
                personDetected = true;
            }
        
            // racquet
            else if(currentRectangle.object === 'tennis racket'){
                // console.log('inside tennis racket')
                racquetStartX = rectangleCoordinates.x;
                racquetStartY = rectangleCoordinates.y;
                racquetEndX = rectangleCoordinates.x + rectangleCoordinates.w;
                racquetEndY = rectangleCoordinates.y + rectangleCoordinates.h;
                racquetDetected = true;
            }
        })

        if(imageUrl === 'https://raw.githubusercontent.com/AkashPriyadarshi/HackTennis/master/images/grasslawn/240.jpg') {
            console.log('personDetected == ' + personDetected);
            console.log('racquetDetected == ' + racquetDetected);
            console.log('ballDetected == ' + ballDetected);
        }

        // detection algorithm
        if(personDetected == true && racquetDetected == true) {
            console.log('person and racquet both detected for image:' + imageUrl);

            // detection
            if(racquetStartX>personStartX){
                console.log('forehand')
                // res.send('forehand');
                forehands.push(number/10)
            } else{
                console.log('backhand');
                backhands.push(number/10);
                // res.send('backhand');
            }
            console.log('');
            console.log('')
        } else {
            // console.log('person and racquet NOT detected for image:' + imageUrl);
            //console.log('')
            // console.log('did not detect for ' + imageUrl);
            didNotDetect.push(0);
            console.log('');
            console.log('')
        }

        // console.log('arrayOfAllElements.length == ' + arrayOfAllElements.length)
        // console.log('forehands.length == ' + forehands.length)
        // console.log('backhands.length == ' + backhands.length)
        // console.log('didNotDetect.length == ' + didNotDetect.length)

        // visited[number] = 1;
        // var countNow = countOnes(visited);
        // console.log('countNow == ' + countNow);
        // if(countNow === 117) {
        //     return({
        //         "forehands":forehands,
        //         "backhands":backhands
        //     })
        // }

        // var endTime = new Date();
        // var timeDiff = endTime - startTime; //in ms
        // timeDiff /= 1000;
        // var seconds = Math.round(timeDiff);
        // console.log('startTime == ' + startTime);
        // console.log('endTime == ' + endTime);
        // console.log('seconds == ' + seconds);
        // if (seconds >= 5){
        //     return({
        //         "forehands":forehands,
        //         "backhands":backhands
        //     })
        // }

        // if(arrayOfAllElements.length == (forehands.length + backhands.length + didNotDetect.length)){
        //     return({
        //         "forehands":forehands,
        //         "backhands":backhands
        //     })
        // }
    });
}

// function countOnes(array) {
//     var count = 0;
//     for(var  i =0;i<array.length;i++){
//         if(array[i] === 1)
//         {
//             count += 1;
//         }
//     }
//     return count;
// }

app.listen(30000, function () {
  console.log('Example app listening on port 3000!');
});