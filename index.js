const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const api = express();
api.use(express.static(__dirname));
api.use(bodyParser.json());

api.listen(3000, () => {
  console.log('API up and running!');
});

const csvWriter = createCsvWriter({
    path: 'balance.csv',
    header: [
      {id: 'bal', title: 'bal'},
    ]
  });

var crtbal = 12345;
api.post('/login', (req, res) => {
    console.log(req.body);
    var crtpin = 1234;
    var given_pin = req.body.pin;
    if(crtpin == given_pin){
        res.send({code:200}); 
    }
    else{
        res.send({code:201}); 
    }
    
})
api.post('/transaction', (req, res) => {
    
    console.log(req.body);
    var crtpin = 4321;
    var given_pin = req.body.pin;
    var acc = req.body.id;
    var amt = req.body.amount;
    var ball=acc_balance(acc);
    console.log("eee",acc_balance(acc))
    if(crtpin == given_pin){
        console.log("Sss");
        if(ball >=amt){
            ball-=amt;
            const filename = 'balance.csv';
            const data = [
                {
                  bal:ball
                }
              ];
              
              csvWriter
                .writeRecords(data)
                .then(()=> console.log('The CSV file was written successfully'));
            res.send({code:200,message:"Transaction Successful"}); 
        }
        else{
            res.send({code:201,message:"Insufficient funds, Transaction Unsuccessful"}); 
        }
    }
    else{
        res.send({code:202,message:"Transaction pin is incorrect, Try again"}); 
    }
    
})
api.post('/bal', (req, res) => {
    var ball;
    fs.createReadStream('balance.csv')
  .pipe(csv())
  .on('data', (row)=> {
      ball = row.bal;
      console.log(ball);
  })
  .on('end', () => {
    console.log("jjj",ball)
    res.send({bal:ball});
    console.log('CSV file successfully processed');
  });
    
})
function extractAsCSV(ball) {
    const header = ["bal"];
    const rows = ball;  
    return header.concat(rows).join("\n");
  }
function acc_balance(acc){
    var ball;
    fs.createReadStream('balance.csv')
    .pipe(csv())
    .on('data', (row)=> {
        ball = row.bal;
        console.log(ball);
    })
    .on('end', () => {
        console.log("jjj",ball)
        console.log('CSV file successfully processed');
        return ball;
      });
  }