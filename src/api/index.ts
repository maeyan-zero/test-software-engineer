import app from "@/api/app";
import * as process from "process";

const EXPRESS_PORT = process.env.EXPRESS_PORT ?? 3000;

app.listen(EXPRESS_PORT, () => {
  console.log(`Server is running on http://localhost:${EXPRESS_PORT}`);
});
