var restify = require('restify');
var YQL     = require('yql');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    //appId: process.env.MICROSOFT_APP_ID,
	appId: "37f09aa3-c891-4e47-a024-eb91207d54cf",
	appPassword: "BziRNqA4v218QhYmqkEZTKF"
    //appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')

/*var bot = new builder.UniversalBot(connector, function (session) 

{
	if (session.message.text.includes("hella"))
	{
	session.send('Brillio product \n\n Brillio creates innovative digital experiences for your customers. We use advanced digital engineering to ensure these experiences run smoothly.\n\n And we enable customer-facing and operational insights with the power of big data analytics.');
	}
	else if (session.message.text.includes("how r u"))
	{
	session.send("I am doing good\n\nHow r u");
	}
	else if (session.message.text.includes("hi"))
	{
	session.send('Hi \n\n How can i help you');
	}
	else if (session.message.text.includes("happy"))
	{
	session.send('Good to see you happy');
	}
	//else
	//{
    //session.send("You said: %s", session.message.text);
	//}
});*/

var bot = new builder.UniversalBot(connector, function (session) {
		session.send('Sorry, I did not understand \'%s\'. Type \'help\' if you need assistance.', session.message.text);
});

//var bot = new builder.UniversalBot(connector);

var LUIS_MODEL_URL='https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/8469e743-3cf0-4c53-9b2c-67e13b9326b2?subscription-key=2a4eb0bdf86042eb9138c85fd724dd6c&timezoneOffset=0&verbose=true&q='

var recognizer = new builder.LuisRecognizer(LUIS_MODEL_URL);
bot.recognizer(recognizer);
var intents = new builder.IntentDialog({recognizers:[recognizer]})
.matches('None',(session, args)=>{
 session.send('Hi this is the none intent you said: \'%s\'.',session.message.text)
})
.matches('weather',(session, args)=>{
 session.send('you asked for weather')
})

/*bot.dialog('weather', [
  function(session,args,next){
  session.send('Welcome to the Weather finder! We are analyzing your message: \'%s\'', session.message.text);
  }
  ]).triggerAction({
    matches: 'weather'
});*/

  bot.dialog('greeting', [
  function(session,args,next){
  session.send('Hey Brillio  \n\n\nI am your smart auto assistant powered by Hella. Help me with your car details so that I can do a lot better for you. Which Lexus auto do you own?');
  /*if (session.message.text.includes("hi"))
  {
  session.send('Hey Brillio  \n\n\nI am your smart auto assistant powered by Hella. Help me with your car details so that I can do a lot better for you. Which Lexus auto do you own? ');
  }
  //session.send('Welcome to the Weather finder! We are //analyzing your message: \'%s\'', session.message.text);*/
  }
  ]).triggerAction({
    matches: 'greeting'
});


bot.dialog('car', [
  function(session,args,next){
  
  var modelEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'model');
  
  if(modelEntity)
  
  //if (modelEntity === 'Lexus' ||  modelEntity === 'lexus')
	{
	//session.send('model %s', args[0])
	builder.Prompts.text(session, 'Let me know your car number');
	}
	else
	{
	  //user
	  //session.send('model %s', args[0])
	  //session.send('model %s', modelEntity)
	  //builder.Prompts.text(session,modelEntity);
	builder.Prompts.text(session, 'please enter Lexus ES Hybrid/ Lexus LX/ Lexus RC F');
	}
  
  
  //session.send('Let me know your car number');
  }
  ]).triggerAction({
    matches: 'car'
});


bot.dialog('carregistered', [
  function(session,args,next){
  
  var carnumberEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'carnumber');
  
  if(carnumberEntity)
  
  //if (modelEntity === 'Lexus' ||  modelEntity === 'lexus')
	{
	//session.send('model %d', carnumberEntity);
	//session.send('model %s', carnumberEntity);
	builder.Prompts.text(session, 'Fine. How can I help you today?');
	}
	else
	{
	  //user
	  //session.send('model %s', args[0])
	  //session.send('model %s', modelEntity)
	  //builder.Prompts.text(session,modelEntity);
	builder.Prompts.text(session, 'please enter valid car number');
	}
  
  
  //session.send('Let me know your car number');
  }
  ]).triggerAction({
    matches: 'carregistered'
	//onInterrupted: function (session) {
    //    session.send('Please provide a valid car number');
  });


  bot.dialog('carservice', [
  function(session,args,next){
  
  var typeofserviceEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'typeofservice');
  
  if(typeofserviceEntity)
  
  //if (modelEntity === 'Lexus' ||  modelEntity === 'lexus')
	{
		//session.send('model %s', results.response)
		builder.Prompts.text(session, 'When are you planning to go for this service?');
	}
	else
	{
	  //user
	  //session.send('model %s', args[0])
	  //session.send('model %s', args.intent.entities)
	  //builder.Prompts.text(session,modelEntity);
	builder.Prompts.text(session, 'please enter valid service type Routine/Auxiliary Service');
	}
  
   //session.send('Let me know your car number');
  }
  
  /*,  to get user ans'r
  function(session, results) {
        session.endDialog('Car service selected %s!', results.response);
    }*/
  ]).triggerAction({
    matches: 'carservice'
	//onInterrupted: function (session) {
    //    session.send('Please provide a valid car number');
  });
  
  bot.dialog('date', [
  function(session,args,next){
  
  //*var typeofserviceEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'typeofservice');
  
  //*if(typeofserviceEntity)
  
  //if (modelEntity === 'Lexus' ||  modelEntity === 'lexus')
	
		builder.Prompts.text(session, "That's great. Let me know which time do you prefer for the service?\n\n9 am / 11 am / 3 pm/ 5 pm");
		
		
	
	/*else
	{
	  //user
	  //session.send('model %s', args[0])
	  //session.send('model %s', modelEntity)
	  //builder.Prompts.text(session,modelEntity);
	builder.Prompts.text(session, 'please enter valid service type Routine/Auxiliary Service');
	}*/
  
   //session.send('Let me know your car number');
  }
  ]).triggerAction({
    matches: 'date'
	//onInterrupted: function (session) {
    //    session.send('Please provide a valid car number');
  });
  
  
  bot.dialog('time', [
  function(session,args,next){
  
  //*var typeofserviceEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'typeofservice');
  
  //*if(typeofserviceEntity)
  
  //if (modelEntity === 'Lexus' ||  modelEntity === 'lexus')
	//session.send('model %s', results.response)
		builder.Prompts.text(session, "Generally people go for oil change, battery check-up, general servicing during a routine service. What are your preferences?");
		
  }
  ]).triggerAction({
    matches: 'time'
	//onInterrupted: function (session) {
    //    session.send('Please provide a valid car number');
  });
  
  


bot.dialog('SearchHotels', [
    function (session, args, next) {
        session.send('Welcome to the Hotels finder! We are analyzing your message: \'%s\'', session.message.text);

        // try extracting entities
        var cityEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'builtin.geography.city');
        //var airportEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'AirportCode');
        if (cityEntity) {
            // city entity detected, continue to next step
            session.dialogData.searchType = 'city';
            next({ response: cityEntity.entity });
        } /*else if (airportEntity) {
            // airport entity detected, continue to next step
            session.dialogData.searchType = 'airport';
            next({ response: airportEntity.entity });
        }*/ else {
            // no entities detected, ask user for a destination
            builder.Prompts.text(session, 'Please enter your destination');
        }
    },
    function (session, results) {
        var destination = results.response;

        var message = 'Looking for hotels';
        if (session.dialogData.searchType === 'airport') {
            message += ' near %s airport...';
        } else {
            message += ' in %s...';
        }

        session.send(message, destination);

        // Async search
        Store
            .searchHotels(destination)
            .then(function (hotels) {
                // args
                session.send('I found %d hotels:', hotels.length);

                var message = new builder.Message()
                    .attachmentLayout(builder.AttachmentLayout.carousel)
                    .attachments(hotels.map(hotelAsAttachment));

                session.send(message);

                // End
                session.endDialog();
            });
    }
]).triggerAction({
    matches: 'SearchHotels',
    onInterrupted: function (session) {
        session.send('Please provide a destination');
    }
});

bot.dialog('ShowHotelsReviews', function (session, args) {
    // retrieve hotel name from matched entities
    var hotelEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'Hotel');
    if (hotelEntity) {
        session.send('Looking for reviews of \'%s\'...', hotelEntity.entity);
        Store.searchHotelReviews(hotelEntity.entity)
            .then(function (reviews) {
                var message = new builder.Message()
                    .attachmentLayout(builder.AttachmentLayout.carousel)
                    .attachments(reviews.map(reviewAsAttachment));
                session.endDialog(message);
            });
    }
}).triggerAction({
    matches: 'ShowHotelsReviews'
});

bot.dialog('Help', function (session) {
    session.endDialog('Hi! Try asking me things like \'search hotels in Seattle\', \'search hotels near LAX airport\' or \'show me the reviews of The Bot Resort\'');
}).triggerAction({
    matches: 'Help'
});

// Spell Check
if (process.env.IS_SPELL_CORRECTION_ENABLED === 'true') {
    bot.use({
        botbuilder: function (session, next) {
            spellService
                .getCorrectedText(session.message.text)
                .then(function (text) {
                    session.message.text = text;
                    next();
                })
                .catch(function (error) {
                    console.error(error);
                    next();
                });
        }
    });
}

// Helpers
function hotelAsAttachment(hotel) {
    return new builder.HeroCard()
        .title(hotel.name)
        .subtitle('%d stars. %d reviews. From $%d per night.', hotel.rating, hotel.numberOfReviews, hotel.priceStarting)
        .images([new builder.CardImage().url(hotel.image)])
        .buttons([
            new builder.CardAction()
                .title('More details')
                .type('openUrl')
                .value('https://www.bing.com/search?q=hotels+in+' + encodeURIComponent(hotel.location))
        ]);
}

function reviewAsAttachment(review) {
    return new builder.ThumbnailCard()
        .title(review.title)
        .text(review.text)
        .images([new builder.CardImage().url(review.image)]);
}



/*********************************************


/**
 * Fetch weather details from Yahoo Weather API
 * @param loc Location to get the weather for
 */
function weatherForecast(loc, cb) {
  const query = new YQL('select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + loc + '")');

  query.exec((err, data) => {
    if (err) return cb(err);

    return cb(null, data.query);
  });
}

/**
 * Find forecast for a specified date (if available)
 */
function forecastForADate(forecastDate, forecasts) {
  return forecasts.find((item) => {
    var date = moment(item.date, 'DD MMM YYYY');
    return date.isSame(forecastDate);
  });
}

/** Prompts to get the current weather conditions */
bot.dialog('Weather.GetForecast', [
  function(session, args, next) {
	session.send('Welcome to the Weather finder! We are analyzing your message: \'%s\'', session.message.text);
    const location = builder.EntityRecognizer.findEntity(args.entities, 'builtin.geography.city');

    if (!location) {
      builder.Prompts.text(session, 'Where?');
    } else {
      next({
        response: location.entity
      });
    }
  },
  function(session, results) {
    const loc = results.response;

    weatherForecast(loc, (err, data) => {
      var res = data.results.channel.item.condition;
      session.send(res.text + ' with a temperature of ' + res.temp + ' degress');
    });
  } /////////////////////////////
]).triggerAction({
    matches: 'Weather.GetForecast'
 });

/*]).triggerAction({
    matches: 'Weather.GetForecast',
    onInterrupted: function (session) {
        session.send('Please provide a weather destination');
    }
});*/


/** Fetch the weather forecast for a city */
bot.dialog('GetForecast', [
  function(session, args, next) {
    const location = builder.EntityRecognizer.findEntity(args.entities, 'builtin.geography.city');
    const timeperiod = builder.EntityRecognizer.findEntity(args.entities, 'builtin.datetime.date');

    if (!location) {
      builder.Prompts.text(session, 'Where?');
    } else {
      next({
        location: location.entity,
        timeperiod: timeperiod
      });
    }
  },
  function(session, results) {
    const loc = results.location;

    weatherForecast(loc, (err, data) => {
      const res = data.results.channel.item.forecast;

      if (!results.timeperiod) {

        res.forEach((item) => {
          var message = item.day + ': ' + item.text + ' with a high of ' + item.high + ' and a low of ' + item.low;
          session.send(message);
        });

      } else {

        var forecastdate = moment(results.timeperiod.resolution.date, 'YYYY-MM-DD');
        var forecast = forecastForADate(forecastdate, res);

        if (forecast) {
          var msg = forecast.day + ': ' + forecast.text + ' with a high of ' + forecast.high + ' and a low of ' + forecast.low;
          session.send(msg);
        } else {
          var msg = "Whoops, forecast not available yet!";
          session.send(msg);
        }
      }
    });
  }
]).triggerAction({
    matches: 'GetForecast',
    onInterrupted: function (session) {
        session.send('Please provide a GetForecast');
    }
});
