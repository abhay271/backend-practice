const express=require('express');
const app=express();
const userModel=require("./models/user");
const postModel=require("./models/post");
const jwt=require('jsonwebtoken');
const cookieparser=require('cookie-parser');
const bcrypt=require('bcrypt');

app.use(cookieparser());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/',(req,res)=>{
    res.render('index');
});

app.post('/register', async (req, res) => {
    let { name, username, age, email, password } = req.body;
    let user= await userModel.findOne({email: email});
    if(user){
        return res.status(400).send("User already exists");
    }

    bcrypt.hash(password, 10 , async (err, hash)=>{
        let newuser= await userModel.create({ name, username, age, email, password:hash });
            let token = jwt.sign({email:email, userId: newuser._id}, "shhh");
            res.cookie("token", token);
            res.send("User registered successfully");
    });
});

app.listen(3000);