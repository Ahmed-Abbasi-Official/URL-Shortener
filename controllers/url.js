import { nanoid } from "nanoid";
import URL from "../models/url.model.js";
import User from '../models/user.model.js'
import { v4 as uuid } from 'uuid';
import { getUser, setUser } from '../services/services.js';

// Function to generate a shortened URL
async function GenerateUrl(req, res) {
  try {
    const  {url} = req.body;
    if (!url || !url) return res.status(400).json({ error: "URL is required" });

  
    console.log("user==....", req.user);

    // if (!userData) return res.status(401).json({ error: "Invalid or missing token" });

    const shortId = nanoid(8);
    const ShortUrl = await URL.create({
      shortId,
      redirectUrl: url,
      visitHistory: [],
      createdBy: req.user.id // Assuming userData has id
    });
    console.log(ShortUrl);

    return res.status(201).redirect('/url');
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Function to redirect based on short URL and track visit history
async function getUrl(req, res) {
  try {
    const shortId = req.params.shortId;
    const entry = await URL.findOne({ shortId });
    if (entry) {
      entry.visitHistory.push({ timestamp: Date.now() }); // Track the timestamp of the visit
      await entry.save(); // Ensure that changes are saved
      return res.redirect(entry.redirectUrl);
    }
    return res.status(404).json({ error: "URL not found" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Clean up URLs (for development purposes)
async function Home(req, res) {
  try {
    console.log("..............",req.user);
    const allURL=await URL.find({createdBy:req.user.id})
   
    res.render("home",{"allURL":allURL,"user":req.user});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Function for signing up new users (with hashed password)
async function SignUp(req, res) {
  try {
    const { name, email, password } = req.body;

    // Hash the password before saving to the database

    const newUser = await User.create({
      name,
      email,
      password
    });

    // Generate a token with only necessary data (e.g., user ID and email)
    const token = setUser({ id: newUser._id, email: newUser.email ,name});

    // Set token in the cookie
    res.cookie("userId", token);

    res.redirect('/url/');
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Function for logging in users (with password comparison)
async function Login(req, res) {
  try {
    const { email, password } = req.body;
    console.log(email,password);
    
    // Find user by email
    const user = await User.findOne({ email ,password});
    console.log("user",user); 
    
    if (!user) return res.redirect('/url/login'); // User not found

    // Compare the provided password with the stored hashed password
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!password) return res.redirect('/url/login'); // Invalid password

    // Generate token and set cookie
    const token = setUser({ id: user._id, email: user.email,name:user.name });
    res.cookie("userId", token);

    return res.redirect("/url");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export { GenerateUrl, getUrl, Home, SignUp, Login };
