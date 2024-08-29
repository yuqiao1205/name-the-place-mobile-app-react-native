const simple = async (req, res) => {
  try {
    const message = req.body.message;

    // put stars around the message and return
    const assistantResponse = `*${message}*`;
    res.status(200).json({ success: true, answer: assistantResponse });
  } catch (error) {
    console.error("Error in simple:", error);
    res
      .status(500)
      .json({ success: false, error: "Internal server error from D" });
  }
};

module.exports = { simple };
