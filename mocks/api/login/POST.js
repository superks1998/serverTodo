var jwt = require("jsonwebtoken");

module.exports = (req, res) => {
    let { username, password } = req.body;

    if (username !== "admin" || password !== "123123") {
        return res.status(401).json({
            message: "User khong du quyen",
        });
    }

    let token = jwt.sign(
        {
            username,
            expired: new Date().getTime() + 8 * 60 * 60 * 1000,
            roles: ["read", "write"],
        },
        "ReactJs",
        { expiresIn: "8h" }
    );

    var data = jwt.decode(token);
    console.log("Data", data);
    console.log("username", username);
    console.log("password", password);

    res.status(200).json({ status: true, username, token });
};
