const express=require('express');
var exphbs  = require('express-handlebars');
const path = require('path');
const logger=require('./middleware/logger');
const members=require('./Members');

const app=express();

//init middleware
//app.use(logger);

//handlebar middleware
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//home page route
app.get('/',(req,res)=>res.render(
    'index',{
        title:'Express Member App',
        members
    }
));

//set static folder
app.use(
    express.static(path.join(__dirname,'public'))
);

app.use('/api/members',require('./routes/api/members'));

//app.get('/',(req,res)=>{
    //res.send('<h1>Hello Express</h1>');
//     res.sendFile(path.join(__dirname,'public','index.html'));
// });

const PORT=process.env.PORT||8000;

app.listen(8000,()=>console.log(`server running on ${PORT}`));