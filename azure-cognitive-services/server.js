var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/analyze', function (req, res) {
    // json data received from API
  // var rectangles = [ { "rectangle": { "x": 68, "y": 202, "w": 32, "h": 25 }, "object": "tennis ball", "parent": { "object": "sports ball", "confidence": 0.751 }, "confidence": 0.745 }, { "rectangle": { "x": 236, "y": 23, "w": 311, "h": 376 }, "object": "person", "confidence": 0.897 }, { "rectangle": { "x": 11, "y": 157, "w": 264, "h": 108 }, "object": "tennis racket", "parent": { "object": "Racket", "confidence": 0.908 }, "confidence": 0.849 } ]
    // var rectangles = [ { "rectangle": { "x": 99, "y": 99, "w": 28, "h": 68 }, "object": "tennis racket", "parent": { "object": "Racket", "confidence": 0.591 }, "confidence": 0.583 }, { "rectangle": { "x": 209, "y": 310, "w": 54, "h": 43 }, "object": "footwear", "confidence": 0.625 }, { "rectangle": { "x": 291, "y": 313, "w": 44, "h": 49 }, "object": "footwear", "confidence": 0.679 }, { "rectangle": { "x": 114, "y": 5, "w": 225, "h": 356 }, "object": "person", "confidence": 0.791 } ]
    // var rectangles = [ { "rectangle": { "x": 993, "y": 335, "w": 57, "h": 47 }, "object": "tennis ball", "parent": { "object": "sports ball", "confidence": 0.694 }, "confidence": 0.677 }, { "rectangle": { "x": 134, "y": 20, "w": 571, "h": 555 }, "object": "person", "confidence": 0.944 }, { "rectangle": { "x": 650, "y": 178, "w": 448, "h": 216 }, "object": "tennis racket", "parent": { "object": "Racket", "confidence": 0.9 }, "confidence": 0.779 } ]
var rectangles = [ { "rectangle": { "x": 518, "y": 219, "w": 55, "h": 49 }, "object": "tennis ball", "parent": { "object": "sports ball", "confidence": 0.715 }, "confidence": 0.577 }, { "rectangle": { "x": 42, "y": 19, "w": 434, "h": 467 }, "object": "person", "confidence": 0.911 }, { "rectangle": { "x": 323, "y": 305, "w": 393, "h": 170 }, "object": "tennis racket", "parent": { "object": "Racket", "confidence": 0.883 }, "confidence": 0.773 } ]

// variables
var ballStartX = 0;
var ballStartY = 0;
var ballEndX = 0;
var ballEndY = 0;

var playerStartX = 0;
var playerStartY = 0;
var playerEndX = 0;
var playerEndY = 0;

var racquetStartX = 0;
var racquetStartY = 0;
var racquetEndX = 0;
var racquetEndY = 0;

// analysis algorithm
for(var i = 0; i<rectangles.length; i++)
{
    var currentRectangle = rectangles[i];
    var rectangleCoordinates = currentRectangle.rectangle;
    
    // tennis ball
    if(currentRectangle.object === 'tennis ball'){
        ballStartX = rectangleCoordinates.x;
        ballStartY = rectangleCoordinates.y;
        ballEndX = rectangleCoordinates.x + rectangleCoordinates.w;
        ballEndY = rectangleCoordinates.y + rectangleCoordinates.h;
    }

    // player
    else if(currentRectangle.object === 'person'){
        playerStartX = rectangleCoordinates.x;
        playerStartY = rectangleCoordinates.y;
        playerEndX = rectangleCoordinates.x + rectangleCoordinates.w;
        playerEndY = rectangleCoordinates.y + rectangleCoordinates.h;
    }

    // racquet
    else if(currentRectangle.object === 'tennis racket'){
        racquetStartX = rectangleCoordinates.x;
        racquetStartY = rectangleCoordinates.y;
        racquetEndX = rectangleCoordinates.x + rectangleCoordinates.w;
        racquetEndY = rectangleCoordinates.y + rectangleCoordinates.h;
    }
  }

  console.log('ball : (' + ballStartX + ',' + ballStartY + ')' );
  console.log('player : (' + playerStartX + ',' + playerStartY + ')' );
  console.log('racquet : (' + racquetStartX + ',' + racquetStartY + ')' );

  // detection
  if(racquetStartX<playerStartX){
      console.log('forehand')
      res.send('forehand');
  } else{
      console.log('backhand');
      res.send('backhand');
  }
  });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});