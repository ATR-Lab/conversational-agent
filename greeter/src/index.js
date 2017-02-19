var Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback) {

	var alexa = Alexa.handler(event, context);
	alexa.registerHandlers(handlers);
	alexa.execute();
};

var handlers = {
	'LaunchRequest': function() {
		var welcome = 'Welcome to the Advanced Telepresence Research Lab.'; 
		var say =  'What is your name?';

		// this.emit(':tell', welcome);
		this.emit(':ask', welcome + say, 'Try again');
	},

    'MyNameIsIntent': function() {
        var myName = this.event.request.intent.slots.myName.value;

        // create and store session attributes
        this.attributes['myName'] = myName;
        var say = 'Hi ' + myName + '! Ask me anything';

        this.emit(':ask', say, 'try again');
	},

	'TalkAboutHistoryIntent': function() {
        // create and store session attributes
        // this.attributes['myName'] = myName;
        var say = "This intent will talk about the history of ATR";

		this.emit(':tell', say, 'try again');
	},

    'AMAZON.HelpIntent': function () {
        this.emit(':ask', 'Just ask me anything about the lab', 'try again');
    },

    'AMAZON.StopIntent': function () {
        var say = '';
        var myName = '';
        if (this.attributes['myName'] ) {
            myName = this.attributes['myName'];
        }
        say = 'Goodbye, ' + myName;

        this.emit(':tell', say );
	}
}