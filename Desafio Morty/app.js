const AssistantV1 = require('watson-developer-cloud/assistant/v1');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(express.static('./public'));

const port = 3000;
require('dotenv').config();
const assistant = new AssistantV1({
  username:'5b9b7050-6838-4e96-b5a7-33acb4b3169a',
  password: 'IkuUSJkDyZYX',
  url: 'https://gateway.watsonplatform.net/assistant/api/',
  version: '2018-02-16',
});''

app.post('/conversation/', (req, res) => {
  const { text, context = {} } = req.body;

  const params = {
    input: { text },
    workspace_id:'28a417e4-8f70-411f-bdc5-a954dfa8e381',
    context,
  };

  assistant.message(params, (err, response) => {
    if (err) {
      console.error(err);
      res.status(500).json(err);
    } else {
      res.json(response);
    }
  });
});

app.listen(port, () => console.log(`Running on port ${port}`));