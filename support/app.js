'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const Conversation = require('watson-developer-cloud/conversation/v1');
const WatsonConversationSetup = require('./lib/watson-conversation-setup');

var app = express();

app.use(bodyParser.json());

app.all('/api/message', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

let conversationUsername;
let conversationPassword;
let conversationUrl;

if (process.env.CONVERSATION_BINDING) {
  console.log(process.env.CONVERSATION_BINDING);
  let conversationBinding = process.env.CONVERSATION_BINDING;
  if (typeof conversationBinding === "string") conversationBinding = JSON.parse(conversationBinding);
  conversationUsername = conversationBinding.username;
  conversationPassword = conversationBinding.password;
  conversationUrl = conversationBinding.url;
}
else {
  conversationUsername = process.env.CONVERSATION_USERNAME;
  conversationPassword = process.env.CONVERSATION_PASSWORD;
  conversationUrl = process.env.CONVERSATION_URL;
}

var conversation = new Conversation({
    version_date: Conversation.VERSION_DATE_2017_04_21,
    username: conversationUsername,
    password: conversationPassword,
    url: conversationUrl
});

let workspaceID; // workspaceID will be set when the workspace is created or validated.
const conversationSetup = new WatsonConversationSetup(conversation);
const workspaceJson = JSON.parse(fs.readFileSync(`${__dirname}/conversation-workspace.json`));
const conversationSetupParams = { default_name: 'innovate-support', workspace_json: workspaceJson };
conversationSetup.setupConversationWorkspace(conversationSetupParams, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Watson Assistant is ready!');
    workspaceID = data;
  }
});

app.post('/api/message', function (req, res) {
    res.header("Content-Type", "application/json");
    if (!workspaceID) {
        return res.json({
            'output': {
                'text': 'The app has not been configured with a <b>WORKSPACE_ID</b> environment variable. Please refer to the ' + '<a href="https://github.com/watson-developer-cloud/conversation-simple">README</a> documentation on how to set this variable. <br>' + 'Once a workspace has been defined the intents may be imported from ' + '<a href="https://github.com/watson-developer-cloud/conversation-simple/blob/master/training/car_workspace.json">here</a> in order to get a working application.'
            }
        });
    }
    var payload = {
        workspace_id: workspaceID,
        context: req.body.context || {},
        input: req.body.input || {}
    };
    conversation.message(payload, function (err, data) {
        if (err) {
            return res.status(err.code || 500).json(err);
        }
        return res.json(updateMessage(payload, data));
    });
});

/**
 * Updates the response text using the intent confidence
 * @param  {Object} input The request to the Conversation service
 * @param  {Object} response The response from the Conversation service
 * @return {Object}          The response with the updated message
**/

function updateMessage(input, response) {
    var responseText = null;
    if (!response.output) {
        response.output = {};
    } else {
        return response;
    }
    if (response.intents && response.intents[0]) {
        var intent = response.intents[0];
        if (intent.confidence >= 0.75) {
            responseText = 'I understood your intent was ' + intent.intent;
        } else if (intent.confidence >= 0.5) {
            responseText = 'I think your intent was ' + intent.intent;
        } else {
            responseText = 'I did not understand your intent';
        }
    }
    response.output.text = responseText;
    return response;
}

module.exports = app;
