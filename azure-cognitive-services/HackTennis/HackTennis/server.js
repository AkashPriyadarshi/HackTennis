var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/analyze', function (req, res) {
    // json data received from API
    var json = [ { "rectangle": { "x": 68, "y": 202, "w": 32, "h": 25 }, "object": "tennis ball", "parent": { "object": "sports ball", "confidence": 0.751 }, "confidence": 0.745 }, { "rectangle": { "x": 236, "y": 23, "w": 311, "h": 376 }, "object": "person", "confidence": 0.897 }, { "rectangle": { "x": 11, "y": 157, "w": 264, "h": 108 }, "object": "tennis racket", "parent": { "object": "Racket", "confidence": 0.908 }, "confidence": 0.849 } ]

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
    var rectangles = json.length;
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

        console.log('ball : (' + ballStartX + ',' + ballStartY + ')' );
        console.log('player : (' + playerStartX + ',' + playerStartX + ')' );
        console.log('racquet : (' + racquetStartX + ',' + racquetStartX + ')' );
    }

    res.send(json);
  });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');

  // json data received from API
  var rectangles = [ { "rectangle": { "x": 68, "y": 202, "w": 32, "h": 25 }, "object": "tennis ball", "parent": { "object": "sports ball", "confidence": 0.751 }, "confidence": 0.745 }, { "rectangle": { "x": 236, "y": 23, "w": 311, "h": 376 }, "object": "person", "confidence": 0.897 }, { "rectangle": { "x": 11, "y": 157, "w": 264, "h": 108 }, "object": "tennis racket", "parent": { "object": "Racket", "confidence": 0.908 }, "confidence": 0.849 } ]

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
    } else{
        console.log('backhand');
    }
});