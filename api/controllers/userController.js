const User = require('../../models/User');
const bcrypt = require('bcryptjs');


exports.registerUser = async (req,res) =>{
    try{
        const {name, email, password, role} = req.body;
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