const express = require('express');
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




app.listen(5000, () => console.log('Server gestartet...'));