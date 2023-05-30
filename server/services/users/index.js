const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4001;
const routes = require("./routes/index");
const errorHandler = require("./middlewares/errorHandler");
const { connect } = require("./config/mongoConect");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/", routes);

app.use(errorHandler);

connect().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
