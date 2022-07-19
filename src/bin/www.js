require('dotenv').config();
const www = require('src/app');
const PORT = process.env.PORT;
www.listen(PORT,()=>{
    console.log(`Server start at port ${PORT}`)
})