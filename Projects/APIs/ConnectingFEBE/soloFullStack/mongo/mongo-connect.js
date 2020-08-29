const mongoose = require("mongoose");

module.exports = (uri) => {
  mongoose.connect(uri, {
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
        ? `\nConnecting To Dev Database\n`
        : `\nConnecting To Database\n`
    );
  });

  mongoose.connection.on("disconnected", (err) => {
    console.log(`\nThe Application has been disconnected from the database;\n`);
  });
};
