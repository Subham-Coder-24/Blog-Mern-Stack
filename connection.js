const mongoose = require("mongoose");

const URL =
  "mongodb+srv://subham:RpEipznVod5EPtX5@cluster0.a62ewcn.mongodb.net/BlogsApp?retryWrites=true&w=majority";

const db = async () => {
  const connect = await mongoose.connect(URL);
  if(connect)console.log("Database Connected");
  else console.log("Failed");
};

module.exports = {db};
