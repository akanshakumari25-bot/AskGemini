const express = require("express");
require("dotenv").config();
const app = express();
const port = 3000;


 app.use(express.json());
 app.use(express.static("public"));
  
 async function askAnything (data){
  try {
     let response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent",
        {
         method:"POST",
         headers:{
            "Content-Type":"application/json",
             "X-goog-api-key":process.env.Api_Key  ,
            },

            body:JSON.stringify({

                contents:[
                    {
                        parts:[
                            {
                                text: data ,
                            },
                        ],
                    },
                ],
            }),
        },
     
    );


      let result = await response.json();
      if(result.candidates && result.candidates.length>0){
        return result.candidates[0].content.parts[0].text;
      }else{
        console.log(result.error.message)
        return "Not found"
      }

}


catch(error){
    console.log(error);
    return "Error"
}

}

app.post("/Asksomething", async(req,res)=>{
    let data = req.body.text;
    let answer = await askAnything(data);
    res.send(answer);

});
 app.listen(port,()=>{
    console.log(`app is running on http://localhost:${port}`);
 });





``