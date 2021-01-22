const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  mongoose.connection.on("open", () => {
    console.log(`connected to Database`);
  });

  mongoose.connection.on("error", (err) => {
    console.log(`\nERROR: ${err}\n`);
  });

  mongoose.connection.on("connected", (err) => {
    console.log(
      process.env.NODE_ENV === "development"
        ? `\nConnecting to dev Database`
        : `\nConnecting To Database\n`
    );
  });

  mongoose.connection.on("disconnected", (err) => {
    console.log(`\nThe Application has been disconnected from the database;\n`);
  });
};
