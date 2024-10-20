import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";


// Protect routes

const protect = asyncHandler(async (req, res, next) => {
    let token = req.cookies.jwt;

    console.log('MY Token:', token); // Check if token is being read
   
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Decoded user ID:', decoded.userId); // Log decoded info
            req.user = await User.findById(decoded.userId).select("-password");
            next();
        } catch (error) {
            console.log('Token verification failed:', error.message);
            res.status(401);
            throw new Error("You are not authenticated, Token failed");
        }
    } else {
        console.log('No token found in request');
        res.status(401);
        throw new Error("Not Authorized, no token");
    }
});


const admin = (req, res,next) =>{
    if (req.user && req.user.isAdmin){
        next();
    }else {
        res.status(401);
        throw new Error("Not Authorized, As admin")


    }

};
export{protect, admin};