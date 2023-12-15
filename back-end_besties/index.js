const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose')
const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const User = require('./models/User')

// let users = [
//     {
//         "username": "real__flp",
//         "password": "123",
//         "phoneNumber": "082212345678",
//         "friends":["real__hdh", "real__pcy", "real__flo", "real__eve"],
//     },
//     {
//         "username": "real__hdh",
//         "password": "123",
//         "phoneNumber": "08112345678",
//         "friends": ["real__flp", "real__flo", "real__eve"],
//     },
//     {
//         "username": "real__pcy",
//         "password": "123",
//         "phoneNumber": "08112345678",
//         "friends": ["real__flp"],
//     },
//     {
//         "username": "real__eve",
//         "password": "123",
//         "phoneNumber": "08112345678",
//         "friends": ["real__flp", "real__flo", "real__hdh"],
//     },
//     {
//         "username": "real__flo",
//         "password": "123",
//         "phoneNumber": "08112345678",
//         "friends": ["real__eve", "real__hdh", "real__flp"]
//     },
// ];

let chats = [
    {
        "_id": 1,
        "from": "real__flo",
        "to": "real__flp",
        "msg": "Hai",
        "read": 1,
        "status": 1, // 1 = gak ke unsent
        "pinned": false,
    },
    {
        "_id": 2,
        "from": "real__flo",
        "to": "real__flp",
        "msg": "Aku siapa?",
        "read": 1,
        "status": 1, // 1 = gak ke unsent
        "pinned": true,
    },
    {
        "_id": 3,
        "from": "real__flp",
        "to": "real__flo",
        "msg": "https://i.insider.com/602ee9d81a89f20019a377c6?width=1136&format=jpeg",
        "read": 1,
        "status": 1, // 1 = gak ke unsent
        "pinned": false,
    },
    {
        "_id": 4,
        "from": "real__flp",
        "to": "real__flo",
        "msg": "Kamu siapa?",
        "read": 1,
        "status": 1, // 1 = gak ke unsent
        "pinned": true,
    },
    {
        "_id": 5,
        "from": "real__flo",
        "to": "real__eve",
        "msg": "Annyeong",
        "read": 0,
        "status": 1, // 1 = gak ke unsent
        "pinned": false,
    },
    {
        "_id": 6,
        "from": "real__flp",
        "to": "real__hdh",
        "msg": "Hihihihi",
        "read": 0,
        "status": 1, // 1 = gak ke unsent
        "pinned": false,
    },
    {
        "_id": 7,
        "from": "real__eve",
        "to": "real__flp",
        "msg": "Halo",
        "read": 0,
        "status": 1, // 1 = gak ke unsent
        "pinned": false,
    },
    {
        "_id": 8,
        "from": "real__hdh",
        "to": "real__eve",
        "msg": "Iyatah",
        "read": 1,
        "status": 1, // 1 = gak ke unsent
        "pinned": false,
    },
    {
        "_id": 9,
        "from": "real__flp",
        "to": "real__eve",
        "msg": "Gimana",
        "read": 1,
        "status": 1, // 1 = gak ke unsent
        "pinned": false,
    },
    {
        "_id": 10,
        "from": "real__eve",
        "to": "real__hdh",
        "msg": "Lemao",
        "read": 0,
        "status": 1, // 1 = gak ke unsent
        "pinned": false,
    },
    {
        "_id": 11,
        "from": "real__hdh",
        "to": "real__eve",
        "msg": "Halooooooo",
        "read": 0,
        "status": 1, // 1 = gak ke unsent
        "pinned": false,
    },
    {
        "_id": 12,
        "from": "real__flo",
        "to": "real__flp",
        "msg": "Halo",
        "read": 0,
        "status": 1, // 1 = gak ke unsent
        "pinned": false,
    },
    {
        "_id": 13,
        "from": "real__flo",
        "to": "real__flp",
        "msg": "AKU BINGUNG BANGET",
        "read": 0,
        "status": 1, // 1 = gak ke unsent
        "pinned": false,
    },
    {
        "_id": 14,
        "from": "real__flo",
        "to": "real__flp",
        "msg": "SOAL PRAKTIKUM SUSAH BANGET",
        "read": 0,
        "status": 1, // 1 = gak ke unsent
        "pinned": false,
    },
]

app.post("/", async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password)
    // try {
    const user = await User.findOne({
        username: username,
        password: password
    });
    console.log(user)

    if (user) {
        console.log("berhasil")
        res.json({ success: true, message: "Login berhasil", user });
    } else {
        res.status(401).json({ success: false, message: "Username atau password salah" });
    }
});

app.post("/register", async (req, res) => {
    const { username, password, confirmPassword, phoneNumber } = req.body;
    try {
        const user = await User.findOne({
            username: username,
        });
        if (user) {
            res.status(401).json({ success: false, message: "Username sudah ada" });
        } else if(password != confirmPassword) {
            res.status(401).json({ success: false, message: "Password dan Confirm Password harus sama" });
        } else {
            // const data = {
            //     "username": username,
            //     "password": password,
            //     "phoneNumber": phoneNumber,
            // }
            const newUser = new User({
                username, password, phoneNumber
            })
            await newUser.save()

            res.status(200).json({success:true, message: "berhasil"})
        }
    } catch (error) {
        console.error('Error parsing JSON:', error);
        res.status(500).json({ success: false, message: "Terjadi kesalahan internal" });
    }
});

app.get("/chat", async (req, res) => {
    const { username } = req.query;

    // Find the friends of the user
    const user = await User.findOne({
        username: username,
    });
    // // const userFriends = users.find((user) => user.username === username)?.friends || [];
    let userFriends = []
    if(user) userFriends = user.friends;

  // Initialize an object to store the latest chats for each friend
    const latestChatsPerFriend = [];

  // Loop through each friend and find their latest chat
    userFriends.forEach((friend) => {
        const userChats = chats.filter(
            (chat) => (chat.from === username && chat.to === friend && chat.status === 1) || (chat.from === friend && chat.to === username && chat.status == 1)
        );

        // Find the latest chat for this friend
        const latestChat = userChats.length > 0
        ? userChats.reduce((prevChat, currentChat) => (
            prevChat._id > currentChat._id ? prevChat : currentChat
            ))
        : null;

    //     // Push an object to the array with id and msg
        latestChatsPerFriend.push(
            {
                friend: friend,
                latestChat: latestChat ? {
                    _id: latestChat._id,
                    msg: latestChat.msg,
                    read: latestChat.read,
                    from: latestChat.from,
                } : null,
            }
        );
    }); 

    console.log(latestChatsPerFriend)
    res.json(latestChatsPerFriend);
});

app.get("/allchat", (req, res) => {
    const { username, friend } = req.query;
    let userChats = [];
    const chatsBetweenUsers = chats.filter(
        (chat) => (chat.from === username && chat.to === friend) || (chat.from === friend && chat.to === username)
    );
    userChats = userChats.concat(chatsBetweenUsers);
    res.json(userChats);
});

app.put("/unsend", (req, res)=>{
    const {_id} = req.body;
    
    for(const element of chats){
        if(element._id == _id && element.status == 1){
            element.status = 0
            console.log("berhasil")
            break
        }
    }
    res.json(chats)
})

app.put("/read", (req, res) => {
    const {friend, username} = req.body;

    for(const element of chats) {
        if(element.read == 0 && element.from == friend && element.to == username){
            element.read = 1
        }
    }
})

app.put("/pin", (req, res) => {
    const {_id} = req.body;
    for(const element of chats){
        if(element._id == _id){
            element.pinned = !element.pinned
            console.log("sukses pin/ unpin")
            break
        }
    }
    res.json(chats)
})

app.post("/sendMsg", (req, res) => {
    const {pesan, from, to} = req.body;
    let idChat = chats.length+1
    const newChat = {
        "_id": idChat,
        "from": from,
        "to": to,
        "msg": pesan,
        "read": 0,
        "status": 1, // 1 = gak ke unsent
        "pinned": false,
    }
    chats.push(newChat)
    console.log(chats)
    res.json("berhasil kirim pesan")
})

app.get("/pinned", (req, res) => {
    const {username, friend} = req.query;
    console.log(username)
    let userChats = [];
    const chatsBetweenUsers = chats.filter(
        (chat) => (chat.from === username && chat.to === friend && chat.pinned == true) || (chat.from === friend && chat.to === username && chat.pinned == true)
    );
    userChats = userChats.concat(chatsBetweenUsers);
    console.log(userChats);
    res.json(userChats);
})

app.get("/searchFriend", async (req, res) => {
    const { searchUsername, username } = req.query;

    try {
        // Temukan friends dari user di MongoDB
        const currentUser = await User.findOne({ username: username });
        const temenSekarang = currentUser ? currentUser.friends : [];

        // Periksa apakah searchUsername sudah ada dalam daftar teman
        const isFriend = temenSekarang.includes(searchUsername);

        if (isFriend) {
            // Jika searchUsername sudah ada dalam teman, tampilkan "No user found!"
            res.json("No user found!");
        } else {
            // Jika searchUsername tidak ada dalam teman, lanjutkan pencarian di antara semua pengguna
            const allUsers = await User.find();
            const isFound = allUsers.some(user => user.username === searchUsername);

            if (isFound) {
                res.json("User ditemukan di antara semua pengguna!");
            } else {
                res.json("No user found!");
            }
        }

    } catch (error) {
        console.error(error);
        res.status(500).json("Terjadi kesalahan pada server");
    }
});


app.post("/addFriend", async (req, res) => {
    const {searchUsername, username } = req.body;
    try {
        let berhasil = false;

        // Temukan user di MongoDB
        const currentUser = await User.findOne({ username: username });

        if (currentUser && currentUser.friends.length === 0) {
            // Jika user ditemukan dan friends-nya kosong, ambil friends dari user
            temenSekarang = currentUser.friends;
        }

        // Perbarui friends pada user dengan menambahkan searchUsername
        const updateCurrentUser = {
            $push: { friends: searchUsername },
        };

        // Temukan dan perbarui dokumen user di MongoDB
        const updateCurrentUserResult = await User.updateOne({ username: username }, updateCurrentUser);

        if (updateCurrentUserResult.modifiedCount > 0) {
            // Jika ada pembaruan pada user, tandai berhasil
            berhasil = true;
        }

        // Temukan dan perbarui friends pada teman dengan menambahkan username
        const updateSearchUser = {
            $push: { friends: username },
        };

        // Temukan dan perbarui dokumen teman di MongoDB
        await User.updateOne({ username: searchUsername }, updateSearchUser);

        if (berhasil) {
            res.json("Berhasil menambah teman");
        } else {
            res.json("Gagal menambah teman");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json("Terjadi kesalahan pada server");
    }
});

const port = 3000;
app.listen(port, async () => {
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/dbm7_221116953')
        console.log('Database connected')
    }
    catch(e){
        console.log('Error database connection \n', e)
    }
    console.log(`Server started at http://localhost:${port}`);
});

module.exports = app;