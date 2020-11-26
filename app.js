const express=require('express');
const app=express();
const https=require('https');
const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));



app.get("/",function(req,res){
	
   res.sendFile(__dirname+"/index.html");
	});

app.post("/",function(req,res){
    const query=req.body.city;
    const appid="00b4ca197e0634d6137ea0d850001a08";
    const units="metric"
     var url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appid+"&units="+units;
         https.get(url,function(response){
    
       response.on("data",function(data){
          const weatherData= JSON.parse(data);
          const temp=weatherData.main.temp;
          const tempDescription=weatherData.weather[0].description;
          const icon=weatherData.weather[0].icon;
          
          const imgs= "http://openweathermap.org/img/wn/"+icon+"@2x.png";
        res.write("<p>The weather is currently "+ tempDescription+"</p>");
        res.write("<h1>The temperatre is "+temp+" deg </h1>");
        res.write("<img src="+imgs+">");
        res.send();
});
});

});







app.listen(3000,function(){
	console.log("Your server is running on port 3000 !");
});