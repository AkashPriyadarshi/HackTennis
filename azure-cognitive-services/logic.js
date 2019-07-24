var express = require('express');
const request = require('request');
var myParser = require("body-parser");
const fs = require('fs');
var app = express();

const uriBase =
    'https://westcentralus.api.cognitive.microsoft.com/vision/v2.0/analyze?visualFeatures=Objects';

// Replace <Subscription Key> with your valid subscription key.
const subscriptionKey = '828ee602188545b2ac6af94efb08485f';

var imageUrl = '';
var i = 0;
    
//var array = [28, 29, 30, 31, 32, 33, 34, 35];
var array = [28, 29, 30, 31];
array.forEach((item) => {
    console.log('');
    imageUrl = "https://raw.githubusercontent.com/AkashPriyadarshi/HackTennis/master/images/000";
    imageUrl += item;
    imageUrl += ".jpg";
    console.log('i == ' + item);
    console.log('imageUrl == ' + imageUrl);
    
    analyze(imageUrl);
});
    
function analyze(imageUrl) {
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
        if(rectangles === null) {
            rectangles = [];
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

        // detection algorithm
        if(personDetected == true && racquetDetected == true) {
            console.log('person and racquet both detected for image:' + imageUrl);

            // detection
            if(racquetStartX>personStartX){
                console.log('forehand')
                // res.send('forehand');
            } else{
                console.log('backhand');
                // res.send('backhand');
            }
            console.log('');
            console.log('')
        } else {
            console.log('person and racquet NOT detected for image:' + imageUrl);
            console.log('')
        }
    });
}
