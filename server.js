require("dotenv").config();
const express = require("express");
const axios = require("axios");
const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.set("view engine","ejs");

app.get("/",async (req,res,next) => {
  try{
    return res.status(200).render("index");
  } catch(e){
    next(e);
  }
});

//bluk sms
app.post("/", async (req, res, next) => {
  try {
    const { subjects, phoneNumbers, message } = req.body;
    
    const payload = {
      sender: subjects,
      number: phoneNumbers,
      message,
    };

    // Define the headers for the API request
    const headers = {
      "Authorization": `Token ${process.env.API_KEY}`,
      'Content-Type': 'application/json',
    };

    const response = await axios.post('https://legitdataway.com/api/bulksms', payload, { headers });
    
    res.status(200).json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});


app.listen(PORT,() => console.log("Server running....",PORT));