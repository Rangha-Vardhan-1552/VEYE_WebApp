import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import AuthRouter from "./routes/auth.route.js";
import cors from "cors";

dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// CORS configuration
// app.use(cors({
//   // origin: 'http://localhost:5173',
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true
// }));

// // Preflight request handling
// app.options('*', cors());

// Routes
app.use('/api/auth', AuthRouter);



// Root route for testing
const port = 4000;
app.get('/', (req, res) => {
  res.send("Express is working...!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});

// MongoDB connection
const MONGO_URL = process.env.MONGO;
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
