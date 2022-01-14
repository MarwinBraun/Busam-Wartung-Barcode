const express = require('express');
const fileUpload = require('express-fileupload');
var fs = require('fs');
var cors = require('cors')
var bodyParser = require('body-parser');


const app = express();
app.use(cors());

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


app.use('/static', express.static(`${__dirname}/client/public/uploads/`));

app.use(fileUpload());

// Upload Endpoint
app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;
  const name1 = req.body.name1;
  const name2 = req.body.name2;
  const name3 = req.body.name3;
  const zusammen = name1 + ' ' + name2 + ' ' + name3 + ' ' + file.name + ' ' + `http://192.168.178.63:5000/static/${file.name}` + '\n';


fs.appendFile(`${__dirname}/client/public/uploads/mynewfile1.txt`, zusammen, function (err) {
  if (err) throw err;
  console.log('Saved!');
});

if (fs.existsSync(`${__dirname}/client/public/uploads/${file.name}`)) {
    const d = 'dfsfdsf';
    let text = d.toString();
    let together = 'test.jpg';
  file.mv(`${__dirname}/client/public/uploads/${together}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({name1: name1, name2: name2, name3: name3, fileName: file.name, filePath: `http://192.168.178.63:5000/static/${file.name}` });
  });
  }else{

  file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({name1: name1, name2: name2, name3: name3, fileName: file.name, filePath: `http://192.168.178.63:5000/static/${file.name}` });
  });
}
});


app.post('/testapi', (req, res) => {

 const code = req.body.code;

  res.status(200).json({barcode: code, msg: 'FehlerServer'});

});

app.listen(6000, () => console.log('Server Started...'));