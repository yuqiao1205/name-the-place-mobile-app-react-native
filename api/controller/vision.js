// import { visionService } from "../services/vision.js";
const sharp = require("sharp");
const visionService = require("../service/vision.js");

// app.post('/visionupload', visionUpload.single('image'), async (req, res) => {
const sendImg = async (req, res) => {
  try {
    // req is multipart form data, log the form it so we can check it
    console.log("Form fields:", req.body);
    // Log the file data (if any)
    console.log("File details:", req.file);

    if (!req.file) {
      return res.status(400).send({
        success: false,
        error: "Please upload an image",
      });
    }

    // Resize the image using sharp
    const resizedImageBuffer = await sharp(req.file.buffer)
      .resize({ width: 512, height: 512 }) // Adjust the width and height as needed
      .toBuffer();

    // Convert the resized image buffer to base64
    const base64Image = resizedImageBuffer.toString("base64");

    // Delete the file from memory (since we're not storing it)
    delete req.file;

    const assistantResponse = await visionService.sendImgToOpenAI(base64Image);
    // const assistantResponse = "Hello from the backend!";
    res.status(200).json({ success: true, answer: assistantResponse });
  } catch (error) {
    console.error("Error processing image:", error);
    res
      .status(500)
      .json({ success: false, error: "Internal server error from C" });
  }
};
module.exports = { sendImg };
