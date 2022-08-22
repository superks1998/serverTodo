var fs = require("fs");
var jwt = require("jsonwebtoken");
var users;

module.exports = (req, res) => {
    let token = req.header("authorization");

    if (!token) {
        res.status(401).json({
            success: false,
            message: "Unauthorized!",
        });
        return;
    }

    try {
        const tokenStr = token.split(" ")[1];
        jwt.verify(tokenStr, "ReactJs");
    } catch (err) {
        res.status(401).json({
            success: false,
            message: "Unauthorized!",
        });
        return;
    }

    fs.readFile("users.json", function (err, data) {
        var usersDataString = String(data);
        var usersData = JSON.parse(usersDataString);
        users = usersData.users;

        debugger;

        let { key, page, pageSize } = req.query;
        if (!key) {
            key = "";
        }
        if (!page) {
            page = 1;
        }
        if (!pageSize) {
            pageSize = 10;
        }
        let filterUsers = users.filter((user) =>
            user.name.toLowerCase().includes(key.toLowerCase())
        );

        let total = filterUsers.length;
        let fromIndex = (page - 1) * pageSize;
        let endIndex = page * pageSize;
        if (endIndex > total) {
            endIndex = total;
        }

        filterUsers = filterUsers.filter(
            (_, index) => index >= fromIndex && index < endIndex
        );

        res.status(200).json({
            success: true,
            data: filterUsers,
            key,
            page,
            pageSize,
            total,
        });
    });
};
