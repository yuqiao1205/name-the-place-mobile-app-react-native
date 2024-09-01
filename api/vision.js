import multer from "multer";
import sharp from "sharp";
import { sendImgToOpenAI } from "./service.js";

// Set up Multer storage and limits
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Wrapping multer with a promise to handle async properly in Vercel
const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

// Export the handler function
export default async function handler(req, res) {
  // Check the request method
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, error: "Only POST requests are allowed" });
  }

  try {
    // Use the middleware to handle the upload
    await runMiddleware(req, res, upload.single("photo"));

    // Access the uploaded file
    const resizedImageBuffer = await sharp(req.file.buffer)
      .resize({ width: 512, height: 512 }) // Adjust the width and height as needed
      .toBuffer();

    // Convert the resized image buffer to base64
    const base64Image = resizedImageBuffer.toString("base64");
    try {
      const assistantResponse = await sendImgToOpenAI(base64Image);
      res.status(200).json({ success: true, answer: assistantResponse });
    } catch (error) {
      res.status(500).json({ message: "OpenAI request failed", error: error });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "File upload failed", error: error.message });
  }
}
