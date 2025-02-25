// create app
const express = require("express");
const app = express();



// find port
require("dotenv").config();
const PORT = process.env.PORT;



//middlewares add krna
const fileupload = require("express-fileupload");
app.use(fileupload());
app.use(express.json());



// connect with db
require("./config/database").dbConnect();



// connect with cloud storage
require("./config/cloudinary").cloudinaryConnect();



//api mount krna
const routes = require("./routes/fileupload");
app.use("/api/v1/upload", routes);



//activate the server
app.listen(PORT, (req, res) => {
  console.log(`app is runnig on port no -> ${PORT}`);
});


// default route for the app
app.get('/', (req, res) =>{
  res.send(`<h1>hello kaise ho </h1>`);
})