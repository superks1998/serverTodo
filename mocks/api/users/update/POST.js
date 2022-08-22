var fs = require("fs");
module.exports = (req, res) => {
    fs.readFile("users.json", function (err, data) {
        var usersDataString = String(data);
        var usersData = JSON.parse(usersDataString);

        const { id } = req.query;

        const { user } = req.body;

        const userUpdate = {
            id: Number(id),
            name: user.name,
            class: user.classUser,
            tags: user.tags,
        };

        console.log(userUpdate);

        const indexUser = usersData.users.findIndex((user) => user.id == id);

        console.log(indexUser);

        usersData.users[indexUser] = userUpdate;

        console.log(usersData);

        var usersDataJson = JSON.stringify(usersData);

        fs.writeFile("users.json", usersDataJson, function (err) {
            if (err) throw err;
            console.log("Save!");
        });

        res.status(200).json({
            success: true,
            message: "Update user successfully!",
            users: usersData.users,
        });
    });
};
