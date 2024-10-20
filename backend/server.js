import path from "path"
import express from "express";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import dotenv from "dotenv";
import cors from "cors"
import connectDB from "./config/db.js"
import productRoutes from "./routes/productRoute.js"
import userRoutes from "./routes/userRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"
import cookieParser from "cookie-parser";

dotenv.config();
const port = process.env.PORT;

connectDB();
const app = express();

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}))


//cokie parser middleware
app.use(cookieParser());




app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,   
   
}));


app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);


app.get("/api/config/paypal", (req,res) => res.send({
    clientId: process.env.PAYPAL_CLIENT_ID
}));


if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use('/uploads', express.static('/var/data/uploads'));
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    );
  } else {
    const __dirname = path.resolve();
    app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
    app.get('/', (req, res) => {
      res.send('API is running....');
    });
  }

app.use(notFound);
app.use(errorHandler);



            
            
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    });