export const root = (req, res) => {
  res.status(200).json({
    message: "Server is running!",
    success: true,
  });
};
