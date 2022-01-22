const express = require('express');
var sql = require("mssql");
var cors = require('cors')
var bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');
const fileUpload = require('express-fileupload');
require('dotenv').config();

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT;
const SMTP_USERNAME = process.env.SMTP_USERNAME;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
const SQL_USER = process.env.SQL_USER;
const SQL_PASSWORD = process.env.SQL_PASSWORD;
const SQL_SERVER = process.env.SQL_SERVER;
const SQL_DATABASE = process.env.SQL_DATABASE;
const SQL_INSTANCE = process.env.SQL_INSTANCE;








const app = express();
app.use(fileUpload());
//app.engine('handlebars', exphbs());
//app.set('view-engine', 'handlebars');
app.use(cors());

app.use('/static', express.static(`${__dirname}/uploads/`));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());







app.post('/sendMail', (req, res) => {

  var mailOptions = {};

  if (req.files === null) {


  const AnlagenNR = req.body.AnlagenNummer
  const Geraet = req.body.Geraet
  const Heizung = req.body.Heizung
  const WarmWasser = req.body.WarmWasser
  const Undicht = req.body.Undicht
  const StoerCode = req.body.StoerCode
  const StoerText = req.body.StoerText
  const Notdienst = req.body.Notdienst
  const Name = req.body.Name
  const Telefonnummer = req.body.Telefonnummer
  let stringStoerungsarten = ''
  let improvedStoerCode = ''
  let improvedNotdienst = ''
  let improvedStoerText = ''

  if(Heizung === 'yes'){
    stringStoerungsarten += 'Keine Heizung, '

    } 


  if(WarmWasser === 'yes'){
    stringStoerungsarten += 'Kein Warmwasser, '

    } 

    if(Undicht === 'yes'){
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

              if(StoerText === ''){
                improvedStoerText = 'Es wurde keine Beschreibung des Störcodes angegeben.'
            
                } 

                if(StoerText !== ''){
                  improvedStoerText = StoerText
              
                  } 
    


  const allInformation = `Betroffene Anlagennummer: ${AnlagenNR}\n
  Betroffenes Gerät: ${Geraet}\n
  Störungsart: ${stringStoerungsarten}\n
  Störcode: ${improvedStoerCode}\n
  Beschreibung des Störungscode: ${improvedStoerText}\n
  Notdienst: ${improvedNotdienst}\n
  Kunden-Name: ${Name}\n
  Kunden-Telefonnummer: ${Telefonnummer}\n`


  mailOptions = {
    from: '"Störungsmeldung Busam" stoerung.meldung.busam@gmail.com', // sender address
    to: 'mb@itunds.de', // list of receivers
    subject: 'Neue Störungsmeldung', // Subject line
    text: allInformation, // plain text body
    //html: output // html body
};

    //return res.status(400).json({ msg: 'Das Bild konnte nicht hochgeladen werden.' });
  } else{

  const file = req.files.file;
  const AnlagenNR = req.body.AnlagenNummer
  const Geraet = req.body.Geraet
  const Heizung = req.body.Heizung
  const WarmWasser = req.body.WarmWasser
  const Undicht = req.body.Undicht
  const StoerCode = req.body.StoerCode
  const StoerText = req.body.StoerText
  const Notdienst = req.body.Notdienst
  const Name = req.body.Name
  const Telefonnummer = req.body.Telefonnummer
  let stringStoerungsarten = ''
  let improvedStoerCode = ''
  let improvedNotdienst = ''
  let improvedStoerText = ''

  if(Heizung === 'yes'){
    stringStoerungsarten += 'Keine Heizung, '

    } 


  if(WarmWasser === 'yes'){
    stringStoerungsarten += 'Kein Warmwasser, '

    } 

    if(Undicht === 'yes'){
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

              if(StoerText === ''){
                improvedStoerText = 'Es wurde keine Beschreibung des Störcodes angegeben.'
            
                } 

                if(StoerText !== ''){
                  improvedStoerText = StoerText
              
                  } 


                  file.mv(`${__dirname}/uploads/${file.name}`, err => {
                    if (err) {
                      console.error(err);
                      return res.status(500).send(err);
                    }
                
                    //res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
                  });
    


  const allInformation = `Betroffene Anlagennummer: ${AnlagenNR}\n
  Betroffenes Gerät: ${Geraet}\n
  Störungsart: ${stringStoerungsarten}\n
  Störcode: ${improvedStoerCode}\n
  Beschreibung des Störungscode: ${improvedStoerText}\n
  Es liegt ein Bild der Störungsmeldung im Anhang dieser E-Mail vor. Bitte prüfen Sie dieses Bild.\n
  Notdienst: ${improvedNotdienst}\n
  Kunden-Name: ${Name}\n
  Kunden-Telefonnummer: ${Telefonnummer}\n`


  mailOptions = {
    from: '"Störungsmeldung Busam" stoerung.meldung.busam@gmail.com', // sender address
    to: 'mb@itunds.de', // list of receivers
    subject: 'Neue Störungsmeldung', // Subject line
    text: allInformation, // plain text body
    //html: output // html body
    attachments: [{
      filename: file.name,
      path: `${__dirname}/uploads/${file.name}`
  }]
};

 

} 

 

 
  let transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: SMTP_USERNAME, // generated ethereal user
        pass: SMTP_PASSWORD  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
      return res.status(400).json({msg: error});
  }
  res.json({msg: 'Success'});
});



});

  // config for your database
  const config = {
    user: SQL_USER,
    password: SQL_PASSWORD,
    server: SQL_SERVER, 
    database: SQL_DATABASE,
    options: {
      instanceName: SQL_INSTANCE,
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