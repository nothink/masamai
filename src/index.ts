import * as Express from "express";

const app = Express();
const port = 3000;

app.get("/", (req, res) => {
  console.log(req);
  res.send("Hello World.");
});

app.listen(port, () => {
  console.log(`listening ${port}`);
});
