export default function handler(req, res) {
  const payload = {
    success: true,
    answer: "hello world 2",
  };
  res.status(200).json(payload);
}
