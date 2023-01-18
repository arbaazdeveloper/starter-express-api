const express = require('express');
const app = express();

const port=3000||process.env.PORT
const router = express.Router();
const list=require('./list')

router.get('/getall', (req, res) => {
    res.status(200).json(list)
   
});
router.get('/startswith/:letter', (req, res) => {
    let letter=req.params.letter
    if(!letter || letter.length>1){
        res.json({error:"Letter is Not Valid"})
        return
    }
    letter=letter.toUpperCase()
    let newList=list.filter((item)=>item.Country.startsWith(letter))
    res.status(200).json(newList)
   
});

router.get('/continent/:continent', (req, res) => {
    let letter=req.params.continent
    
    if(!letter){
        res.json({error:"Continent is Not Valid"})
        return
    }
    let str=letter.charAt(0).toUpperCase()
    str=str+letter.slice(1)
    let newList=list.filter((item)=>item.Continent===str)

    if(newList.length===0){
        res.json({error:"Not Found"})
        return
    }
    res.status(200).json(newList)
   
});

router.get('/country/:country', (req, res) => {
    let letter=req.params.country
    console.log(letter)
    if(!letter){
        res.json({error:"Country is Not Valid"})
        return
    }
    letter=letter.split(' ')
    for(let i=0; i<letter.length; i++){
        letter[i]=letter[i].charAt(0).toUpperCase()+letter[i].slice(1)
    }
   letter=letter.join(' ')
    let newList=list.filter((item)=>item.Country===letter)

    if(newList.length===0){
        res.json({error:"Not Found"})
        return
    }
    res.status(200).json(newList)
   
});
router.get('/capital/:capital', (req, res) => {
    let letter=req.params.capital
    if(!letter){
        res.json({error:"Capital is Not Valid"})
        return
    }
    letter=letter.split(' ')
    for(let i=0; i<letter.length; i++){
        letter[i]=letter[i].charAt(0).toUpperCase()+letter[i].slice(1)
    }
    letter=letter.join(' ')
    var condition = new RegExp(letter);  
    let newList=list.filter(function (el) {
        return condition.test(el.Capital);
      });
      

    if(newList.length===0){
        res.json({error:"Not Found"})
        return
    }
    res.status(200).json(newList)
   
});
app.get('/',(req,res)=>{
    const send={
        message:'Checkout some endpoints of api',
        endpoit1:'/getall',
        endpoit2:'/startswith/<Alphabet>',
        endpoit3:'/country/<Country Name>',
        endpoit4:'/continent/<Continent Name',
        endpoit5:'/capital/<Capital Name>'
    }
    res.json(send)
})
app.use('/', router);

app.listen(port, () => {
    console.log('Server started on port '+port);
});
