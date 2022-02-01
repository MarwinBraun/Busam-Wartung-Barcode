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
    
 let ohneComma = stringStoerungsarten.slice(0, -1);

  const allInformation = `Betroffene Anlagennummer: ${AnlagenNR}\n
  Betroffenes Gerät: ${Geraet}\n
  Störungsart: ${ohneComma}\n
  Störcode: ${improvedStoerCode}\n
  Beschreibung des Störungscode: ${improvedStoerText}\n
  Notdienst: ${improvedNotdienst}\n
  Kunden-Name: ${Name}\n
  Kunden-Telefonnummer: ${Telefonnummer}\n`

  var output = `
  <!doctype html>
<html lang="de">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

    
  </head>
  <body>

  <div class="row">
  <div class="col-12 text-center"><img src="https://www.busam-online.de/cms/de/media/pagebau/Logo.gif" class="rounded" alt="..."></div>
   <br/><br/>
   <h3 class="text-center"><u>Neue Störungsmeldung erfasst von ${Name}</u></h3>
  </div> <br/>

<div class="row">
  <div class="col-12">
  <h5>Betroffene Anlagennummer: <span class="fw-bold">${AnlagenNR}</span></h5>
  </div>
</div>

  <div class="row">
    <div class="col-12">
    <h5>Betroffenes Gerät: <span class="fw-bold">${Geraet}</span></h5>
    </div>
  </div>

  <div class="row">
  <div class="col-12">
  <h5>Störungsart: <span class="fw-bold">${ohneComma}</span></h5>
  </div>
</div>

<div class="row">
    <div class="col-12">
    <h5>Beschreibung des Störungscode: <span class="fw-bold">${improvedStoerText}</span></h5>
    </div>
  </div>

  <div class="row">
    <div class="col-12">
    <h5>Notdienst: <span class="fw-bold">${improvedNotdienst}</span></h5>
    </div>
  </div>

  <div class="row">
    <div class="col-12">
    <h5>Kunden-Name: <span class="fw-bold">${Name}</span></h5>
    </div>
  </div>

  <div class="row">
  <div class="col-12">
  <h5>Kunden-Telefonnummer: <span class="fw-bold">${Telefonnummer}</span></h5>
  </div>
</div>

    <!-- Optional JavaScript; choose one of the two! -->

    <!-- Option 1: Bootstrap Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>

    <!-- Option 2: Separate Popper and Bootstrap JS -->
    <!--
    -->
  </body>
</html>
`;


  mailOptions = {
    from: '"Störungsmeldung Busam" stoerung.meldung.busam@gmail.com', // sender address
    to: 'stoerung@busam-online.de', // list of receivers
    subject: 'Neue Störungsmeldung', // Subject line
    text: allInformation, // plain text body
    html: output, // html body

    


};


 
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

    //return res.status(400).json({ msg: 'Das Bild konnte nicht hochgeladen werden.' });
  } else{

    if (req.files.file.size > 30000000){
      return res.json({ msg: 'Das Bild konnte nicht hochgeladen werden, da es die Grenze von 30 MB überschreitet, bitte wählen Sie ein kleineres Bild aus.' });
    } else{
      var output = ``;
      var together;
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
     
                      if(file.size < 30000000){
                        let currentDate = new Date();
                        let milliseconds = currentDate.getMilliseconds().toString();
                        let seconds = currentDate.getSeconds().toString();
                        let minutes = currentDate.getMinutes().toString();
                        let hours = currentDate.getHours().toString();
                        let result           = '';
                        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                        var charactersLength = characters.length;
                        for ( var i = 0; i < 5; i++ ) {
                          result += characters.charAt(Math.floor(Math.random() * 
                     charactersLength));
                       }
                     
                       together = `${milliseconds}_${seconds}_${minutes}_${hours}_${result}_${file.name}`; 
    
                  
    
    
                        file.mv(`${__dirname}/uploads/${together}`, err => {
                          if (err) {
                            console.error(err);
                            return res.status(500).send(err);
                          }
                      
                          //res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
                        });
          
                      } 
    
                    
    let allInformation;
    
    if(file.size < 30000000){
      let ohneComma = stringStoerungsarten.slice(0, -1);
      allInformation = `Betroffene Anlagennummer: ${AnlagenNR}\n
      Betroffenes Gerät: ${Geraet}\n
      Störungsart: ${ohneComma}\n
      Störcode: ${improvedStoerCode}\n
      Beschreibung des Störungscode: ${improvedStoerText}\n
      Es liegt ein Bild der Störungsmeldung im Anhang dieser E-Mail vor. Bitte prüfen Sie dieses Bild.\n
      Notdienst: ${improvedNotdienst}\n
      Kunden-Name: ${Name}\n
      Kunden-Telefonnummer: ${Telefonnummer}\n`;

      output = `
      <!doctype html>
    <html lang="de">
      <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    
        <!-- Bootstrap CSS -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    
        
      </head>
      <body>
    
      <div class="row">
      <div class="col-12 text-center"><img src="https://www.busam-online.de/cms/de/media/pagebau/Logo.gif" class="rounded" alt="..."></div>
       <br/><br/>
       <h3 class="text-center"><u>Neue Störungsmeldung erfasst von ${Name}</u></h3>
      </div> <br/>
  
    <div class="row">
      <div class="col-12">
      <h5>Betroffene Anlagennummer: <span class="fw-bold">${AnlagenNR}</span></h5>
      </div>
    </div>
    
      <div class="row">
        <div class="col-12">
        <h5>Betroffenes Gerät: <span class="fw-bold">${Geraet}</span></h5>
        </div>
      </div>
    
      <div class="row">
      <div class="col-12">
      <h5>Störungsart: <span class="fw-bold">${ohneComma}</span></h5>
      </div>
    </div>
    
    <div class="row">
        <div class="col-12">
        <h5>Beschreibung des Störungscode: <span class="fw-bold">${improvedStoerText}</span></h5>
        </div>
      </div>

      <div class="row">
      <div class="col-12">
      <h5><span class="fw-bold">Es liegt ein Bild der Störungsmeldung im Anhang dieser E-Mail vor. Bitte prüfen Sie dieses Bild.</span></h5>
      </div>
    </div>
    
      <div class="row">
        <div class="col-12">
        <h5>Notdienst: <span class="fw-bold">${improvedNotdienst}</span></h5>
        </div>
      </div>
    
      <div class="row">
        <div class="col-12">
        <h5>Kunden-Name: <span class="fw-bold">${Name}</span></h5>
        </div>
      </div>
    
      <div class="row">
      <div class="col-12">
      <h5>Kunden-Telefonnummer: <span class="fw-bold">${Telefonnummer}</span></h5>
      </div>
    </div>
    
        <!-- Optional JavaScript; choose one of the two! -->
    
        <!-- Option 1: Bootstrap Bundle with Popper -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    
        <!-- Option 2: Separate Popper and Bootstrap JS -->
        <!--
        -->
      </body>
    </html>
    `;
    




    } else{
      let ohneComma = stringStoerungsarten.slice(0, -1);
      allInformation = `Betroffene Anlagennummer: ${AnlagenNR}\n
      Betroffenes Gerät: ${Geraet}\n
      Störungsart: ${ohneComma}\n
      Störcode: ${improvedStoerCode}\n
      Beschreibung des Störungscode: ${improvedStoerText}\n
      Notdienst: ${improvedNotdienst}\n
      Kunden-Name: ${Name}\n
      Kunden-Telefonnummer: ${Telefonnummer}\n`;

      output = `
      <!doctype html>
    <html lang="de">
      <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    
        <!-- Bootstrap CSS -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    
        
      </head>
      <body>
    
      <div class="row">
        <div class="col-12 text-center"><img src="https://www.busam-online.de/cms/de/media/pagebau/Logo.gif" class="rounded" alt="..."></div>
         <br/><br/>
         <h3 class="text-center"><u>Neue Störungsmeldung erfasst von ${Name}</u></h3>
        </div> <br/>
    
      <div class="row">
        <div class="col-12">
        <h5>Betroffene Anlagennummer: <span class="fw-bold">${AnlagenNR}</span></h5>
        </div>
      </div>
    
      <div class="row">
        <div class="col-12">
        <h5>Betroffenes Gerät: <span class="fw-bold">${Geraet}</span></h5>
        </div>
      </div>
    
      <div class="row">
      <div class="col-12">
      <h5>Störungsart: <span class="fw-bold">${ohneComma}</span></h5>
      </div>
    </div>
    
    <div class="row">
        <div class="col-12">
        <h5>Beschreibung des Störungscode: <span class="fw-bold">${improvedStoerText}</span></h5>
        </div>
      </div>
    
      <div class="row">
        <div class="col-12">
        <h5>Notdienst: <span class="fw-bold">${improvedNotdienst}</span></h5>
        </div>
      </div>
    
      <div class="row">
        <div class="col-12">
        <h5>Kunden-Name: <span class="fw-bold">${Name}</span></h5>
        </div>
      </div>
    
      <div class="row">
      <div class="col-12">
      <h5>Kunden-Telefonnummer: <span class="fw-bold">${Telefonnummer}</span></h5>
      </div>
    </div>
    
        <!-- Optional JavaScript; choose one of the two! -->
    
        <!-- Option 1: Bootstrap Bundle with Popper -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    
        <!-- Option 2: Separate Popper and Bootstrap JS -->
        <!--
        -->
      </body>
    </html>
    `;
    

    }  
    
    
    
      if(file.size < 30000000){
    
        mailOptions = {
          from: '"Störungsmeldung Busam" stoerung.meldung.busam@gmail.com', // sender address
          to: 'stoerung@busam-online.de', // list of receivers
          subject: 'Neue Störungsmeldung', // Subject line
          text: allInformation,
          html: output,
          attachments: [{
            filename: file.name,
            path: `${__dirname}/uploads/${together}`
        }]
      };
      
    
    
      } else{
        mailOptions = {
          from: '"Störungsmeldung Busam" stoerung.meldung.busam@gmail.com', // sender address
          to: 'stoerung@busam-online.de', // list of receivers
          subject: 'Neue Störungsmeldung', // Subject line
          text: allInformation, // plain text body
          html: output // html body
       
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
    
     
    } 

  


} 


 




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