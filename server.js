const express = require('express');
const cors = require('cors');
const app = express();


// middlewares:
app.use(cors());
app.use(express.json());


// test Route:
app.get('/',(req,res)=>{
    res.send('UCTB is up and running');
});



// server configuration:
const PORT = process.env.PORT ||  3000;
app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
});