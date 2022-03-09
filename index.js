const axios = require("axios").default;
const express = require("express")
const cors = require("cors")
require('dotenv').config()
const app = express()
app.use(cors({
    origin: "*"
}))


  app.get('/route.htm', function (req, res) {
    res.sendFile( __dirname + "/" + "route.htm" );
});

app.get('/word', (req, res)=>{
    const options = {
        method: 'GET',
        url: 'https://random-words5.p.rapidapi.com/getMultipleRandom',
        params: {count: '5', wordLength: '5'},
        headers: {
          'x-rapidapi-host': 'random-words5.p.rapidapi.com',
          'x-rapidapi-key': process.env.RAPID_API_KEY
        }
      };
      
      axios.request(options).then((response)=> {
          console.log(response.data);
          res.json(response.data[0])
      }).catch( (error)=> {
          console.error(error);
      });
})

app.get('/check', (req, res)=>{
    const guess = req.query.guess

    const options = {
        method: 'GET',
        url: 'https://twinword-word-graph-dictionary.p.rapidapi.com/definition/',
        params: {entry: guess},
        headers: {
          'x-rapidapi-host': 'twinword-word-graph-dictionary.p.rapidapi.com',
          'x-rapidapi-key': process.env.RAPID_API_KEY
        }
      };
      
      axios.request(options).then( (response)=> {
          console.log(response.data);
          res.json(response.data.result_msg)
      }).catch((error)=> {
          console.error(error);
      });
})



app.listen(process.env.PORT, ()=>console.log("Server is running now. "))