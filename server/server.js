const express = require('express');
const openai = require('openai');
const bodyParser = require('body-parser');
const cors = require('cors'); // Add this line to import the cors package
require('dotenv').config();

openai.apiKey = process.env.OPENAI_API_KEY;

const app = express();
app.use(cors()); // Add this line to use cors middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/ask', async (req, res) => {
  const prompt = req.body.question;
  console.log('Received question:', prompt);

  

  try {
    console.log('Generating response...');
    const response = await openai.Completion.create({
      engine: 'text-davinci-003', // Use a valid model
      prompt: prompt,
      max_tokens: 150,
      n: 1,
    });

    console.log('Response:', response);

    if (response.choices && response.choices.length > 0) {
      res.send({ answer: response.choices[0].text.trim() });
    } else {
      res.send({ answer: 'I am unable to generate a response.' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ error: 'An error occurred while generating a response.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});