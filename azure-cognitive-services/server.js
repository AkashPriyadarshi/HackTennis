var express = require('express');
const request = require('request');
var myParser = require("body-parser")
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

const imageUrl =
    'https://www.tennis4beginners.com/wp-content/uploads/2018/03/tennis-backhand-864x600.jpg';

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/flights/:from-:to', function (req, res) {
  res.send(req.params.from + ' ----' + req.params.to)
})

// GET request
app.get('/analyzedeprecate/:imageurl', function (req, res) {
  // Request parameters.
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

console.log('printing image url:' + req.params.imageurl);

request.post(options, (error, response, body) => {
  if (error) {
    console.log('Error: ', error);
    return;
  }
  let rectangles = JSON.parse(body).objects;
  
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

  console.log('before the for loop');

  // analysis algorithm
  for(var i = 0; i<rectangles.length; i++)
  {
      var currentRectangle = rectangles[i];
      console.log(currentRectangle);
      var rectangleCoordinates = currentRectangle.rectangle;
      
      // tennis ball
      if(currentRectangle.object === 'tennis ball'){
        console.log('inside tennis ball')
          ballStartX = rectangleCoordinates.x;
          ballStartY = rectangleCoordinates.y;
          ballEndX = rectangleCoordinates.x + rectangleCoordinates.w;
          ballEndY = rectangleCoordinates.y + rectangleCoordinates.h;
      }

      // player
      else if(currentRectangle.object === 'person'){
        console.log('inside person')
          playerStartX = rectangleCoordinates.x;
          playerStartY = rectangleCoordinates.y;
          playerEndX = rectangleCoordinates.x + rectangleCoordinates.w;
          playerEndY = rectangleCoordinates.y + rectangleCoordinates.h;
      }

      // racquet
      else if(currentRectangle.object === 'tennis racket'){
        console.log('inside tennis racket')
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
});

// POST request
app.post('/analyze', function (req, res) {

  var imageUrl =req.body.imageurl;
  console.log('imageUrl == ' + imageUrl);

  // console.log('printing image url:' + JSON.stringify(req.body));
  // Request parameters.
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
  
    // console.log('before the for loop');
  
    // analysis algorithm
    for(var i = 0; i<rectangles.length; i++)
    {
        var currentRectangle = rectangles[i];
        // console.log(currentRectangle);
        var rectangleCoordinates = currentRectangle.rectangle;
        
        // tennis ball
        if(currentRectangle.object === 'tennis ball'){
          // console.log('inside tennis ball')
            ballStartX = rectangleCoordinates.x;
            ballStartY = rectangleCoordinates.y;
            ballEndX = rectangleCoordinates.x + rectangleCoordinates.w;
            ballEndY = rectangleCoordinates.y + rectangleCoordinates.h;
        }
  
        // player
        else if(currentRectangle.object === 'person'){
          // console.log('inside person')
            playerStartX = rectangleCoordinates.x;
            playerStartY = rectangleCoordinates.y;
            playerEndX = rectangleCoordinates.x + rectangleCoordinates.w;
            playerEndY = rectangleCoordinates.y + rectangleCoordinates.h;
        }
  
        // racquet
        else if(currentRectangle.object === 'tennis racket'){
          // console.log('inside tennis racket')
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
      if(racquetStartX>playerStartX){
          console.log('forehand')
          res.send('forehand');
      } else{
          console.log('backhand');
          res.send('backhand');
      }
    });
  });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});