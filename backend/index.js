import mongoose from "mongoose"
import express from "express"
import dotenv from "dotenv"
const app=express()

dotenv.config()

const port=4000
app.get('/',(req,res)=>{
    res.send("Express is working...!")
})
app.listen(port,()=>{
    console.log(`server is running at port:${port}`)
})
const MONGO_URL=process.env.MONGO
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
