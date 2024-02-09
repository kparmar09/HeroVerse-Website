import express from "express";
import body from "body-parser";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.get("/", (req, res) => {
    res.render("index.ejs", {message: "Enter Hero Name"});
});

app.post("/get-id", async (req, res) => {
    const heroName = req.body.heroName;
    try{
        const response = await axios.get(`https://superheroapi.com/api.php/3617243938519535/search/${heroName}`);
        const result = response.data;
        if(result.response == "success"){
            res.render("index.ejs", {result: result, message: "Enter Hero Name"});
        }
        else{
            res.render("index.ejs", {message: "Try Again",});
            console.log("Incorrect Name");
        }
    } catch(error){
        console.log(error.message);
        res.render("index.ejs", {
            error: "No activities corresponding to the given request.",
          });
    }
});
