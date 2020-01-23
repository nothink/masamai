import app from "./app";
import { DEFAULT_PORT } from "./constants/constants";

app.listen(DEFAULT_PORT, () => {
  console.log(`Listening on port ${DEFAULT_PORT}`);
});
