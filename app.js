const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();

//routes
const authRoute = require("./routes/authRoutes");

//set up view engine
app.set("view engine", "ejs");
app.set("views", "views");

//middleware
const middleware = [
    morgan("dev"),
    express.static("public"),
    express.urlencoded({ extended: true }),
    express.json(),
];

app.use(middleware);

app.use("/auth", authRoute);

app.get("/", (req, res) => {
    res.json({
        message: "Hello world",
    });
});

const PORT = process.env.PORT || 8000;

mongoose
    .connect(
        "mongodb+srv://admin:admin@cluster0.cldgq.mongodb.net/<dbname>?retryWrites=true&w=majority",
        { useNewUrlParser: true }
    )
    .then(() => {
        console.log("database connected");
        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT}`);
        });
    })
    .catch((e) => {
        console.log(e);
    });
