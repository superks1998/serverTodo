var fs = require("fs");
module.exports = (req, res) => {
    fs.readFile("users.json", function (err, data) {
        var usersDataString = String(data);
        var usersData = JSON.parse(usersDataString);

        const lastIdUser = usersData.users[usersData.users.length - 1].id;
        console.log(typeof Number(lastIdUser));

        const { name, classUser, tags } = req.body;
        const user = {
            id: Number(lastIdUser) + 1,
            name,
            class: classUser,
            tags,
        };

        usersData.users.push(user);
        console.log(usersData);
        var usersDataJson = JSON.stringify(usersData);

        fs.writeFile("users.json", usersDataJson, function (err) {
            if (err) throw err;
            console.log("Save!");
        });

        res.status(200).json({
            success: true,
            message: "Add user successfully!",
            users: usersData.users,
        });
    });
};
