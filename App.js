const express = require("express");
const app = express();
const PORT = 8081;

const path = require("path");
const userModel = require("./models/user");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


app.get("/", function (req, res) {
  res.render("index");
});



app.get("/read", async (req, res) => {
    let users = await userModel.find()
  res.render("read",{users});
});

app.get("/delete/:id", async (req, res) => {
    let users = await userModel.findOneAndDelete({_id:req.params.id})
  res.redirect("/read");
});


app.post("/create", async (req, res) => {
  let { name, email, image } = req.body;

  let createdUser = await userModel.create({
    name: name,
    email: email,
    image: image,
  });

  res.redirect("/read");
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
