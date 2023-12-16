const express = require('express');
const userRoutes = require('./api/routes/userRoutes');
const cors = require('cors');
const connectDB=require('./db');
const app = express();
connectDB();


// middlewares:
app.use(cors());
app.use(express.json());

app.use('/api/users',userRoutes);

// test Route:
app.get('/',(req,res)=>{
    res.send('UCTB is up and running');
});



// server configuration:
const PORT = process.env.PORT ||  3001;
app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
});