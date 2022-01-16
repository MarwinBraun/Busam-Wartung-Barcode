import React, { useState, useEffect } from "react"

import { useParams } from "react-router-dom"

import axios from "axios"


import  {Table, Modal, Alert, Button, Container, Col, Row, Image, Form, ButtonGroup, ToggleButton} from 'react-bootstrap'

const Home = () => {
  const [TextAnlage, setTextAnlage] = useState('');
  const [GeraetText, setGeraetText] = useState('');
  const [Name, setName] = useState('');
  const [Telefonnummer, setTelefonnummer] = useState('');
    const [checkedHeizung, setCheckedHeizung] = useState(false);
    const [checkedWarmWasser, setCheckedWarmWasser] = useState(false);
    const [checkedUndicht, setCheckedUndicht] = useState(false);
    const [StoerCodeValue, setStoerCodeValue] = useState("");
    const [NotdienstLeistungValue, setNotdienstLeistungValue] = useState("");
    const [AlertStoerung, setAlertStoerung] = useState(false);
    const [AlertStoerCode, setAlertStoerCode] = useState(false);
    const [AlertNotdienst, setAlertNotdienst] = useState(false);
    const [AlertName, setAlertName] = useState(false);
    const [AlertServerFailExplanation, setAlertServerFailExplanation] = useState(false);
    const [AlertServerFail, setAlertServerFail] = useState(false);
    const [AlertSuccess, setAlertSuccess] = useState(false);
    const [AlertLoginSuccess, setAlertLoginSuccess] = useState(false);
    const [AlertLoginFail, setAlertLoginFail] = useState(false);
    const [AlertNoDeviceAvailable, setAlertNoDeviceAvailable] = useState(false);
    const [ExplanationText, setExplanationText] = useState('');
    const [RenderSendButton, setRenderSendButton] = useState(true);
    const [RenderSignUpButton, setRenderSignUpButton] = useState(true);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [DataComingBack, setDataComingBack] = useState({});
    const [showGeraeteTable, setshowGeraeteTable] = useState(false);
  


    const handleShow = () => { 
    setShowLoginModal(true);
    setAlertLoginFail(false)
    setAlertLoginSuccess(false)
    setRenderSignUpButton(true)
    setUsername('')
    setPassword('')
    setshowGeraeteTable(false)
    setAlertNoDeviceAvailable(false)

  }

  const handleClose = () => { 
    setShowLoginModal(false);
    setAlertLoginFail(false)
    setAlertLoginSuccess(false)
    setRenderSignUpButton(true)
    setUsername('')
    setPassword('')
    setshowGeraeteTable(false)
    console.log(DataComingBack);

  }

    const StoerCodeOptions = [
      {name: "Ja", value: "yes"},
      {name: "Nein", value: "no"},   

    ];

    const NotdienstLeistungOptions = [
      {name: "Ja", value: "yes"},
      {name: "Nein", value: "no"},   

    ];

    const params = useParams()

        useEffect(() => {  
          if(!params.anlagenid || !params.geraetid) { 
          alert('Keine Anlagen-Nummer oder Gerätebezeichnung vergeben!')
          window.location.href = "https://busam-online.de"; 
        }


           setTextAnlage(params.anlagenid)
           setGeraetText(params.geraetid) 

        });

        const checkLogin = async () => {
        if(Username === '1' && Password === '1'){
        setAlertLoginSuccess(true)
        setAlertLoginFail(false)
        setRenderSignUpButton(false)
        setUsername('')
        setPassword('')

const anfrage = await axios.get('http://192.168.50.250:5000/getDeviceData', {
    params: {
      AnlagenNummer: TextAnlage 
    }
  }).then(function (response) {

    var myarr = new Array();
    const back = response.data;

    if(back.msg.length){
     setAlertNoDeviceAvailable(false)
     for(var i = 0; i < back.msg.length; i++) {
      let id = back.msg[i].id;
       let device = back.msg[i].Geraetedaten;
       let deviceSplit = device.split(';')
     //console.log(back);
   
     myarr.push({'id': id, 
     'Bauteil': deviceSplit[0],
     'Hersteller': deviceSplit[1],
     'Seriennummer': deviceSplit[2],
     'Baujahr': deviceSplit[3],
     'Typ': deviceSplit[4],
     'KältemittelTyp': deviceSplit[5],
     'KältemittelMenge': deviceSplit[6],
     'Inbetriebnahme': deviceSplit[7],
     'Standort': deviceSplit[8],
     'Besonderheit': deviceSplit[10],
     'Infotext': deviceSplit[11],
   
   });
      console.log(myarr);
      
     }
     setDataComingBack(myarr);
     setshowGeraeteTable(true);
    } else {
      setAlertNoDeviceAvailable(true)
    }
    //setTimeout(function(){
      //console.log(DataComingBack);
    //}, 2000)
    //console.log(back);
  })

  

 
  //const zwischen = new Array();
  
  // for (var i = 0; i < back.length; i++ ) {
   //await setDataComingBack(back[i])
   //zwischen.push(back[i]);
   //console.log(back);
  //}

  //console.log(zwischen);
   
  //await setDataComingBack(back);
  //setshowGeraeteTable(true);
  //console.log(DataComingBack);
  //setshowGeraeteTable(true);

  //back.map(device => {
    //let ger = {
     //Geraetedaten : device.Geraetedaten
    //}
    //setDataComingBack([...DataComingBack, ger])
    //})

  //console.log(DataComingBack);
  //console.log(TextAnlage);

  //.then(function (response) {
    //alert(response.data);
    //const back = await response.json();
    //setAlleGeraete(back);
    //setshowGeraeteTable(true)
    //alert(JSON.stringify(AlleGeraete))
    //console.log(AlleGeraete);
  //}) 

        /*
        const res = axios.get('http://192.168.50.250:5000/getDeviceData', {
          params: { AnlagenNummer: TextAnlage  }
            

          })
          */

      // setAlleGeraete(res.data);
      // alert(JSON.stringify(res.recordset.recordset));
     
         // setAlleGeraete(answer.data);
          //console.log(1);

         

        /*

        try { 
          const res = axios.get('http://192.168.50.250:5000/getDeviceData', {
          params: { AnlagenNummer: TextAnlage  }
            

          })

       setAlleGeraete(res.data);
       setshowGeraeteTable(true)
          
        } catch (err) { 
          if (err.response.status === 500) {
            setAlertServerFail(true)
        }else {
          setAlertServerFailExplanation(true)
          setExplanationText(err.response.data.msg)
        } 

      } */

        } else {
          setAlertLoginFail(true)
          setAlertLoginSuccess(false)
          setRenderSignUpButton(true)
          setUsername('')
          setPassword('')
        }

      }

        const sendMail = () => {
          setAlertStoerung(false)
          setAlertStoerCode(false)
          setAlertNotdienst(false)
          setAlertName(false)
          setAlertSuccess(false)
          setAlertServerFail(false)
          setAlertServerFailExplanation(false)
          setExplanationText('')


          if(checkedHeizung === false && checkedWarmWasser === false  && checkedUndicht === false ){
           setAlertStoerung(true)

           } else if(StoerCodeValue === "") {
            setAlertStoerCode(true)  
          } else if(NotdienstLeistungValue === "") {
            setAlertNotdienst(true)  
          } else if(Name === '' || Telefonnummer === '') {
            setAlertName(true)  
          }
           
           else { 
        try { 
          const res = axios.post('http://192.168.50.250:5000/sendMail', {
            AnlagenNummer: TextAnlage,
            Geraet: GeraetText,
            Heizung: checkedHeizung,
            WarmWasser: checkedWarmWasser,
            Undicht: checkedUndicht,
            StoerCode: StoerCodeValue,
            Notdienst: NotdienstLeistungValue,
            Name: Name,
            Telefonnummer: Telefonnummer

          })

          setAlertSuccess(true)
          setRenderSendButton(false)
          
        } catch (err) { 
          if (err.response.status === 500) {
            setAlertServerFail(true)
        }else {
          setAlertServerFailExplanation(true)
          setExplanationText(err.response.data.msg)
        } 
      }   
      }  
      
      }  



        return (
      <Container>
          <Row>
              <Col xs={4}><Image src={'https://www.busam-online.de/cms/de/media/pagebau/Logo.gif'} fluid/></Col>
              <Col style={{position: "relative"}} xs={8}><Col xs={12} style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center"}}><h3>Busam Störungsmeldung</h3></Col></Col>
         
          </Row>
          <br/>

          <Row>
            <Col xs={5}><Button onClick={handleShow} variant="info">Informationen anzeigen (nur für Monteure)</Button></Col>
          </Row>
<br/>


          <Row>
              <Col xs={12}>
              
              <Form>
  <Form.Group className="mb-3">
    <Form.Label>Wartungsanlagen Nummer</Form.Label>
    <Form.Control disabled value={TextAnlage} onChange={(e) => setTextAnlage(e.target.value)} type="text" placeholder="Wartungsanlagen-Nummer" />
   
  </Form.Group>

  </Form>

  <Form>
  <Form.Group className="mb-3">
    <Form.Label>Geräte Nummer / Bezeichnung</Form.Label>
    <Form.Control disabled value={GeraetText} onChange={(e) => setGeraetText(e.target.value)} type="text" placeholder="Geräte Nummer / Bezeichnung" />
 
  </Form.Group>

  </Form>
  <br/>

  <h5>Welche Störung liegt vor?</h5>

  <ButtonGroup className="mb-2">
  <ToggleButton
    id="toggle-checkHeizung"
    type="checkbox"
    variant="outline-primary"
    checked={checkedHeizung}
    value="1"
    onChange={(e) => setCheckedHeizung(e.currentTarget.checked)}
  >
    Keine Heizung
  </ToggleButton>
</ButtonGroup>

<ButtonGroup className="mb-2">
<ToggleButton style={{marginLeft: "10px"}}
  id="toggle-checkWasser"
  type="checkbox"
  variant="outline-primary"
  checked={checkedWarmWasser}
  value="2"
  onChange={(e) => setCheckedWarmWasser(e.currentTarget.checked)}
>
  Kein Warmwasser
</ToggleButton>
</ButtonGroup>

<ButtonGroup className="mb-2">
<ToggleButton style={{marginLeft: "10px"}}
  id="toggle-checkUndicht"
  type="checkbox"
  variant="outline-primary"
  checked={checkedUndicht}
  value="3"
  onChange={(e) => setCheckedUndicht(e.currentTarget.checked)}
>
  Undichtigkeit an der Heizungsanlage
</ToggleButton>
</ButtonGroup> 
<br/>
<Form.Text className="text-muted">
      (Mehrfachauswahl möglich)
    </Form.Text>

    <br/> <br/>

  <h5>Wird an der Heizungsanlage ein Störcode angezeigt?</h5>

  <ButtonGroup  className="mb-2">
  {StoerCodeOptions.map((option, index) => (

<ToggleButton
style={{marginLeft: "10px"}}
key={index}
id={`option-${index}`}
type="radio"
name="radio"
value={option.value}
checked={StoerCodeValue === option.value}
onChange={e => setStoerCodeValue(e.currentTarget.value)}
variant="outline-primary"



>
{option.name}
</ToggleButton>


  ))}


  
</ButtonGroup>

<br/> <br/>

<h5>Soll die Störung als Notdienstleistung übermittelt werden?</h5>

<ButtonGroup  className="mb-2">
{NotdienstLeistungOptions.map((option, index) => (

<ToggleButton
style={{marginLeft: "10px"}}
key={index}
id={`optionNotdienst-${index}`}
type="radio"
name="radioNotdienst"
value={option.value}
checked={NotdienstLeistungValue === option.value}
onChange={e => setNotdienstLeistungValue(e.currentTarget.value)}
variant="outline-primary"



>
{option.name}
</ToggleButton>


))}



</ButtonGroup>

<br/> <br/>


  <Form.Group className="mb-3">
    <Form.Label>Ihr Name:</Form.Label>
    <Form.Control value={Name} onChange={(e) => setName(e.target.value)} type="text" />
   
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Ihre Telefonnummer:</Form.Label>
    <Form.Control value={Telefonnummer} onChange={(e) => setTelefonnummer(e.target.value)} type="text" />
   
  </Form.Group>

  <br/>

  {AlertStoerung ? (
  <Alert variant="danger" onClose={() => setAlertStoerung(false)} dismissible>
        <Alert.Heading>Es wurde keine Auswahl der Störung getroffen</Alert.Heading>
        <p>
          Bite kreuzen Sie eine oder mehrere Optionen unter "Welche Störung liegt vor?" an. 
        </p>
      </Alert>
  ): null }

{AlertStoerCode ? (
  <Alert variant="danger" onClose={() => setAlertStoerCode(false)} dismissible>
        <Alert.Heading>Es wurde keine Auswahl über den Störcode getroffen</Alert.Heading>
        <p>
          Bitte kreuzen Sie eine Option unter "Wird an der Heizungsanlage ein Störcode angezeigt?" an. 
        </p>
      </Alert>
  ): null }

{AlertNotdienst ? (
  <Alert variant="danger" onClose={() => setAlertNotdienst(false)} dismissible>
        <Alert.Heading>Es wurde keine Auswahl über die Notdienstleistung getroffen</Alert.Heading>
        <p>
          Bitte kreuzen Sie eine Option unter "Soll die Störung als Notdienstleistung übermittelt werden?" an. 
        </p>
      </Alert>
  ): null }

{AlertName ? (
  <Alert variant="danger" onClose={() => setAlertName(false)} dismissible>
        <Alert.Heading>Es wurde kein Name oder eine Telefonnummer eingetragen</Alert.Heading>
        <p>
          Bitte tragen Sie Ihren Namen und Ihre Telefonnummer ein. 
        </p>
      </Alert>
  ): null }

{AlertServerFail ? (
  <Alert variant="danger" onClose={() => setAlertServerFail(false)} dismissible>
        <Alert.Heading>Serverfehler</Alert.Heading>
        <p>
        {ExplanationText}
        </p>
      </Alert>
  ): null }

{AlertServerFailExplanation ? (
  <Alert variant="danger" onClose={() => setAlertServerFailExplanation(false)} dismissible>
        <Alert.Heading>Serverfehler</Alert.Heading>
        <p>
          Es liegt ein Problem mit dem Server vor, bitte informieren Sie die Firma Busam telefonisch. 
        </p>
      </Alert>
  ): null }

{AlertSuccess ? (
  <Alert variant="success" onClose={() => setAlertSuccess(false)} dismissible>
        <Alert.Heading>Übertragung erfolgreich</Alert.Heading>
        <p>
          Vielen Dank für die Erstellung Ihrer Störungsmeldung, wir werden Sie zeitnah kontaktieren.
        </p>
      </Alert>
  ): null }



{RenderSendButton ? (
  <Button onClick={sendMail} variant="primary">Absenden</Button>
  ): null }


              </Col>
          </Row>

          <Modal show={showLoginModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Anmeldung für Wartungsanlagen-Informationen</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
        {AlertLoginFail ? (
  <Alert variant="danger" onClose={() => setAlertLoginFail(false)} dismissible>
       Der Benutzername oder das Passwort ist falsch!
        
      </Alert>
  ): null }

{AlertLoginSuccess ? (
  <Alert variant="success" onClose={() => setAlertLoginSuccess(false)} dismissible>
       Die Anmeldung war erfolgreich. Sie können nun die Wartungsanlagedaten einsehen. 
        
      </Alert>
  ): null }
           {RenderSignUpButton ? (
             <div>
           <Form>
  <Form.Group className="mb-3">
    <Form.Label>Benutzername:</Form.Label>
    <Form.Control value={Username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Benutzername" />
   
  </Form.Group>

  </Form>
  
  <Form>
  <Form.Group className="mb-3">
    <Form.Label>Passwort:</Form.Label>
    <Form.Control value={Password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Passwort" />
   
  </Form.Group>

  </Form>

  </div>
    ): null }

{AlertNoDeviceAvailable ? (
  <Alert variant="info">
       Keine Gerätedaten vorhanden
        
      </Alert>
  ): null }

{showGeraeteTable ? 
   (
  <Table bordered hover responsive>
   <thead>
     <tr>
       <th>Bauteil</th>
       <th>Hersteller</th>
       <th>Seriennummer</th>
       <th>Baujahr</th>
       <th>Typ</th>
       <th>Kältemittel-Typ</th>
       <th>Kältemittel-Menge</th>
       <th>Inbetriebnahme</th>
       <th>Standort</th>
       <th>Besonderheit</th>
       <th>InfoText</th>
     </tr>
   </thead>
   <tbody>
    
  
   {DataComingBack.map(device => (
     
    //let newArray = device.Geraetedaten;
    //let  DevicesImproved = newArray.split(';')
 

   <tr key={device.id}>
     <td>{device.Bauteil}</td>
     <td>{device.Hersteller}</td>
     <td>{device.Seriennummer}</td>
     <td>{device.Baujahr}</td>
     <td>{device.Typ}</td>
     <td>{device.KältemittelTyp}</td>
     <td>{device.KältemittelMenge}</td>
     <td>{device.Inbetriebnahme}</td>
     <td>{device.Standort}</td>
     <td>{device.Besonderheit}</td>
     <td>{device.Infotext}</td>
  
 </tr>

   )) }
    


   </tbody>
  </Table>
    ) :
   null 
   
   }
 


  </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Schließen
          </Button>
          {RenderSignUpButton ? (
          <Button variant="primary" onClick={checkLogin}>
            Anmelden
          </Button>
           ): null }
        </Modal.Footer>
      </Modal>


      </Container>

      
    )
}

export default Home
