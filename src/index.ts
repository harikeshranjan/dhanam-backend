import app from "./app";
import { connectDB } from "./config/db";
import { env } from "./config/env";

connectDB();

app.get("/", (req, res) => {
  res.send("Dhanam Backend is running");
});

app.listen(env.PORT, () => {
  console.log(`Server running on port: ${env.PORT}`);
});
