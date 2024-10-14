import { nanoid } from "nanoid";
import URL from "../models/url.model.js";

async function GenerateUrl(req, res) {
  try {
    const body = req.body;
    console.log(body);

    if (!body) return res.status(400).json({ error: "URL is Required : " });
    const shortId = nanoid(8);
    const url = await URL.create({
      shortId,
      redirectUrl: body.url,
      visitHistory: [],
    });
    console.log(url);

    return res.status(201).json({ id: shortId });
  } catch (error) {
    console.log(error);
  }
}

async function getUrl(req, res) {
  try {
    const shortId = req.params.shortId;
    console.log(shortId);

    // const entry=await URL.findOneAndUpdate({shortId},{$push:{visitHistory:{timestamp:Date.now()}}})
    const entry = await URL.findOne({ shortId });
    if (entry) {
      entry.visitHistory.push({ shortId });
    }
    await entry.save();
    res.redirect(entry.redirectUrl);
  } catch (error) {
    console.log(error);
  }
}

async function Home(req,res) {
  try {
    res.render("home")
  } catch (error) {
    console.log(error);
    
  }
}

export { GenerateUrl, getUrl };
