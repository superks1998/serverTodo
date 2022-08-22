var fs = require("fs");
module.exports = (req, res) => {
    fs.readFile("users.json", function (err, data) {
        const { id } = req.query;

        var usersDataString = String(data);
        var usersData = JSON.parse(usersDataString);

        var user = usersData.users.find((user) => user.id == id);

        console.log(user);
        res.status(200).json({
            success: true,
            user,
        });
    });
};
