const express = require("express");
const router = express.Router();
// import {jwtAuthMiddleware} from "../middleware/jwtAuthMiddleware";

const {
    registerUser,
    loginUser
}=require("../controllers/userControllers");
router.post("/register" , registerUser);
router.post("/login",loginUser);
module.exports=router;