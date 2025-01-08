const express = require('express');
const app = express();

//app.set ('view engine', 'ejs');  --MIGHT need a view engine..will see

app.get('/', (req, res) =>{

    console.log('Hello Test');
    res.send('This is a response test');
    //Some things we are going to need to use below for reference

    //res.render('pathToFileYouWantToRenderHere'); example: res.render("index")
    //res.download('path/toFiletoDownloadHere');
    //res.status(500);  --Send error status
    //res.status(500).send('TextString');  -- send status AND custom text string
    //res.status(500).json({message: "error"}); --send json data and error
    //res.json({message: "JSON message"})  -- successful json data send
    
});

app.listen(3000);

