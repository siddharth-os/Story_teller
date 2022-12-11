const express=require('express');
const bodyParser=require('body-parser');
const https=require('https');

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

// app.get("/",(req,res)=>{
//     // res.send('Hello World');
//     const url="https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=a9b34f302f295dc5b04807d478293da0";
//     var results;
//     // let temp=0.0;
//     // let place="";
//     https.get(url,function (response){
//         console.log(response.statusCode);
//         //****IMPORTANT******/
//         response.on("data",(data)=>{
//             // console.log(data);
//             var weatherData=JSON.parse(data);
//             console.log(weatherData);
//             let temp=weatherData.main.temp;
//             let place=weatherData.name;
//             let icon=weatherData.weather[0].icon;
//             let imageurl="https://openweathermap.org/img/wn/"+icon+"@2x.png";
//             res.write("<h1>"+place+" has temperature = "+temp +"</h1>");
//             res.write("<h1> Weather Description is "+weatherData.weather[0].description +". </h1>");
//             res.write("<img src="+imageurl+"></img>");
//         });
//     });
//     // res.send("Hellow");
// });

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});

app.post("/",(req,res)=>{
    // console.log(req.body);
    console.log(res.statusCode);
    var cityName=req.body.city;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=a9b34f302f295dc5b04807d478293da0";
    https.get(url,(response)=>{
        console.log(response.statusCode);
        response.on("data",(data)=>{
            var weatherData=JSON.parse(data);
            var temp=weatherData.main.temp-273;
            res.write("<h1>"+cityName+" has temperature = "+ temp+" degrees. </h1>");
        });
        // res.write(cityName+" has temperature = "+)
    });
    // res.send("Checked");
});

app.listen(3000,()=>{
    console.log("Server is listening.");
});