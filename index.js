const express = require('express');
const app = express();
const path = require('path');
// db
const db = require('./config');
//cors
const cors=require('cors');
// body-parser
const bodyParser = require('body-parser');
// port
const port = parseInt(process.env.port) || 4000;

//Router
const route = express.Router();
app.use(
    route,
    express.json,
    bodyParser.urlencoded({extended: false})
)
route.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, './view/index.html'));
});
route.get('/products', function (req,res) {
    db.query('SELECT pName,pLength,pColour,pStyle from products', (err, data) => {
        if (err) {
         console.log(err);
        }
        else{
            res.status(200).json( {results: data} )
        }
    });
});
route.post('/add',bodyParser.json(),(req,res)=>
{
    let detail = req.body;

    //sql query 
    const strQry =
    `INSERT INTO products SET ?;
    `
    db.query(strQry,[detail],(err)=>{
        if(err){
            res.status(400).json({err});
        }
        else{
            res.status(200).json({msg:'A product was added'})
        }}
)}
)

route.put('/product/:id', bodyParser.json(),(req, res) => {
    let data = req.body;
    const strQry =
    `
    update products
    set ?
    where prodcuctID = ?;
    `;

db.query(strQry, [data, req.params.id],
    (err)=>{
        if(err) throw err;
        res.status(200).json( {msg:
        "a row was affected"});
    })
});



route.delete('/product/:id',bodyParser.json(),(req, res) => {
    const userId = req.params.id;
    const deleteQuery = 'DELETE  FROM products WHERE prodcuctID = ?;';
  
    // Run MySQL delete query
   db.query(deleteQuery, [userId], (err) => {
      if (err) throw err;
      
      res.sendStatus(200).json({msg:`ok`});
    })
  }); 





  
  app.listen(4000, () => {
    console.log('your app listening on port 4000!');
  });






 

