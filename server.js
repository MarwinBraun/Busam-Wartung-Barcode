const express = require('express');
var sql = require("mssql");
var cors = require('cors')
var bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');


const app = express();
//app.engine('handlebars', exphbs());
//app.set('view-engine', 'handlebars');
app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());







app.post('/sendMail', (req, res) => {

  const AnlagenNR = req.body.AnlagenNummer
  const Geraet = req.body.Geraet
  const Heizung = req.body.Heizung
  const WarmWasser = req.body.WarmWasser
  const Undicht = req.body.Undicht
  const StoerCode = req.body.StoerCode
  const Notdienst = req.body.Notdienst
  const Name = req.body.Name
  const Telefonnummer = req.body.Telefonnummer
  let stringStoerungsarten = ''
  let improvedStoerCode = ''
  let improvedNotdienst = ''

  if(Heizung){
    stringStoerungsarten += 'Keine Heizung, '

    } 


  if(WarmWasser){
    stringStoerungsarten += 'Kein Warmwasser, '

    } 

    if(Undicht){
      stringStoerungsarten += 'Undichtigkeit an der Heizungsanlage, '
  
      } 

      if(StoerCode === 'no'){
        improvedStoerCode = 'Nein'
    
        } 

        if(StoerCode === 'yes'){
          improvedStoerCode = 'Ja'
      
          } 

          if(Notdienst === 'no'){
            improvedNotdienst = 'Nein'
        
            } 
    
            if(Notdienst === 'yes'){
              improvedNotdienst = 'Ja'
          
              } 
    


  const allInformation = `Betroffene Anlagennummer: ${AnlagenNR}\n
  Betroffenes Gerät: ${Geraet}\n
  Störungsart: ${stringStoerungsarten}\n
  Störcode: ${improvedStoerCode}\n
  Notdienst: ${improvedNotdienst}\n
  Kunden-Name: ${Name}\n
  Kunden-Telefonnummer: ${Telefonnummer}\n`

 
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'stoerung.meldung.busam@gmail.com', // generated ethereal user
        pass: 'Busam2022!'  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  let mailOptions = {
    from: '"Störungsmeldung Busam" stoerung.meldung.busam@gmail.com', // sender address
    to: 'mb@itunds.de', // list of receivers
    subject: 'Neue Störungsmeldung', // Subject line
    text: allInformation, // plain text body
    //html: output // html body
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
      return res.status(400).json({msg: error});
  }
  res.json({msg: 'Success'});
});



});

  // config for your database
  const config = {
    user: 'sa',
    password: 'kwpsarix',
    server: 'srv-sql', 
    database: 'BNWINS',
    options: {
      instanceName: 'KWP',
      trustServerCertificate: true
  }



};

app.get('/getDeviceData', (req, res) => {
 
 

  const AN_Nummer = req.query.AnlagenNummer;
    


  sql.connect(config, function (err) {
        
    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();
       //localhost:3000/AL170217/b
    // query to the database and get the records
    request
    .input('nummer', sql.VarChar, AN_Nummer)
    .query(`select * from WartGeraete where AnlagenNr = @nummer`, function (err, recordset) {
        
        if (err) {
        return res.status(400).json({msg: err});
        //console.log(err)
        //console.log(recordset);
      }

        var myarr = new Array();
    
       for (var i = 0; i < recordset.recordset.length; ++i) {
           var Geraetedaten = recordset.recordset[i].Geraetedaten;
           myarr.push({'id': i, 'Geraetedaten': Geraetedaten});
         }  

        //console.log(myarr);
        
       // console.log(recordset);
       //return res.json(recordset.recordsets[0]);
       return res.json({msg: myarr});
        

      

      


        
    });
});




  





});



app.get('/getMessData', (req, res) => {
 
 

  const AN_Nummer = req.query.AnlagenNummer;
    


  sql.connect(config, function (err) {
        
    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();
       //localhost:3000/AL170217/b
    // query to the database and get the records
    request
    .input('nummer', sql.VarChar, AN_Nummer)
    .query(`select * from WartMessdaten where AnlagenNr = @nummer`, function (err, recordset) {
        
        if (err) {
        return res.status(400).json({msg: err});
        //console.log(err)
        //console.log(recordset);
      }

        var myarr = new Array();
    
       for (var i = 0; i < recordset.recordset.length; ++i) {
           var Messdaten = recordset.recordset[i].Messdaten;
           myarr.push({'id': i, 'Messdaten': Messdaten});
         }  

        //console.log(myarr);
        
       // console.log(recordset);
       //return res.json(recordset.recordsets[0]);
       return res.json({msg: myarr});
        

      

      


        
    });
});




  





});






app.get('/getHistory', (req, res) => {
 
 

  const AN_Nummer = req.query.AnlagenNummer;
    


  sql.connect(config, function (err) {
        
    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();
       //localhost:3000/AL170217/b
    // query to the database and get the records
    request
    .input('nummer', sql.VarChar, AN_Nummer)
    .query(`select TOP (5) AuftragsNr, Betreff, TerminDatum, Monteur, TerminText, PlanStunden from WartAuftraege where AnlagenNr = @nummer order by AnlageDatum desc`, function (err, recordset) {
        
        if (err) {
        return res.status(400).json({msg: err});
        //console.log(err)
        //console.log(recordset);
      }

        var myarr = new Array();
    
       for (var i = 0; i < recordset.recordset.length; ++i) {
           var AuftragsNr = recordset.recordset[i].AuftragsNr;
           var Betreff = recordset.recordset[i].Betreff;
           var TerminDatum = recordset.recordset[i].TerminDatum;
           var Monteur = recordset.recordset[i].Monteur;
           var TerminText = recordset.recordset[i].TerminText;
           var PlanStunden = recordset.recordset[i].PlanStunden;
           myarr.push({'id': i, 
           'AuftragsNr': AuftragsNr,
           'Betreff': Betreff,
           'TerminDatum': TerminDatum,
           'Monteur': Monteur,
           'TerminText': TerminText,
           'PlanStunden': PlanStunden});
         }  

        //console.log(myarr);
        
       // console.log(recordset);
       //return res.json(recordset.recordsets[0]);
       return res.json({msg: myarr});
        

      

      


        
    });
});




  





});






app.listen(5000, () => console.log('Server gestartet...'));