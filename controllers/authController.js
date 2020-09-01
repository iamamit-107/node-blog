const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.signupGetController = (req, res, next) => {
    res.render("pages/auth/signup.ejs", { title: "Create a new account" });
};

exports.signupPostController = async (req, res, next) => {
    let { username, email, password } = req.body;

    try {
        const encriptedPass = await bcrypt.hash(password, 11);
        let user = new User({
            username,
            email,
            password: encriptedPass,
        });

        let createdUser = await user.save();
        console.log("user created successfully", createdUser);
        res.render("pages/auth/signup.ejs", { title: "Create a new account" });
    } catch (e) {
        console.log(e);
        next(e);
    }
};

exports.loginGetController = (req, res, next) => {
    res.render("pages/auth/login.ejs", { title: "Login to your account" });
};

exports.loginPostController = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.json({
                message: "Invalid credentials",
            });
        }

        let match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.json({
                message: "Invalid credential",
            });
        }

        console.log(user);
        res.render("pages/auth/login", { title: "Login to your account" });
    } catch (e) {
        console.log(e);
        next();
    }
};

exports.logoutController = (req, res, next) => {};
