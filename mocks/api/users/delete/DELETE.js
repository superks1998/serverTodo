var fs = require("fs");
module.exports = (req, res) => {
    fs.readFile("users.json", function (err, data) {
        var usersDataString = String(data);
        var usersData = JSON.parse(usersDataString);

        const { id } = req.query;

        const indexUser = usersData.users.findIndex((user) => user.id == id);

        if ((indexUser) => 0) {
            usersData.users.splice(indexUser, 1);
        }

        var usersDataJson = JSON.stringify(usersData);

        fs.writeFile("users.json", usersDataJson, function (err) {
            if (err) throw err;
            console.log("Save!");
        });

        res.status(200).json({
            success: true,
            message: "Delete user successfully!",
            users: usersData.users,
        });
    });
};
