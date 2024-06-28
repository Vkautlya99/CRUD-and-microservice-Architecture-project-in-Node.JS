const express = require("express");
const app = express()
const path = require("path")

const userModel = require("./models/user");

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname , "public")))
app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/read", async (req, res) => {
    const users = await userModel.find()

    res.render("read", { users })
    
})
app.get("/delete/:id", async (req, res) => {
    const users = await userModel.findOneAndDelete({ _id : req.params.id })
    res.redirect("/read")

})

app.post("/create", async (req, res) => {
    const { name, email, password, image } = req.body;

    const createdUser = await userModel.create({
        name,
        email,
        password,
        image
    })
    res.redirect("read")
})






app.listen(3000, () => {
    console.log(`App is running ${3000}`)
})