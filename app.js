const { Configuration, OpenAIApi } = require("openai");
const readlineSync = require("readline-sync");
require("dotenv").config();


async function App(){
  const configuration = new Configuration({
    apiKey:process.env.OPENAI_API_KEY
  });

  const openai = new OpenAIApi(configuration);

  while(true){
    const user_input = readlineSync.question("Ask me anything:");
    const messages = [];

    messages.push({role:'user', content:user_input})
    try{
      const completion = await openai.createChatCompletion({
        model:'gpt-3.5-turbo',
        messages:messages,
      });

      const completion_text = completion.data.choices[0].message.content;
      console.log(completion_text);

      const user_input_again = readlineSync.question("Want to contiue? Yes or No   ");

      if(user_input_again.toUpperCase() === 'N' || user_input_again === "No"){
        console.log('See you next time. Bye!!!');
        break;
      }
    }
    catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
  }
};

App();