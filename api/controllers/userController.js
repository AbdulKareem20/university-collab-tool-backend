const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req,res) =>{
    try{
        const {name, email, password, role} = req.body;
        console.log(name);
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({message:'user already exists'});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
         name,
         email,
         password:hashedPassword,
         role,
        }) 
        await user.save();
        res.status(201).json({message:'user registered'});
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('server error');
    }
}



exports.loginUser = async(req,res)=>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ message: 'Invalid Credentials' });
        }
        

        const payload = {
            user:{
                id:user.id,
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:'1h'}, (err, token)=>{
            if(err) throw err
            res.json({token})
        });
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("server error")
    }
}




