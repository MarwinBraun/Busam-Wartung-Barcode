import React, { useState, useEffect } from "react"

import { useParams } from "react-router-dom"

import axios from "axios"


import  {Alert, Button, Container, Col, Row, Image, Form, ButtonGroup, ToggleButton} from 'react-bootstrap'

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

        


        const sendMail = () => {
          setAlertStoerung(false)
          setAlertStoerCode(false)
          setAlertNotdienst(false)
          setAlertName(false)


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
          axios.post('http://192.168.50.250:5000/sendMail', {
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
          .then((response) => {
            console.log(response);
          }, (error) => {
            console.log(error);
          });
        }  

      
      }  



        return (
      <Container>
          <Row>
              <Col xs={4}><Image src={'https://www.busam-online.de/cms/de/media/pagebau/Logo.gif'} fluid/></Col>
              <Col style={{position: "relative"}} xs={8}><Col style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}><h3>Busam Störungsmeldung</h3></Col></Col>
         
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


  <Button onClick={sendMail} variant="primary">Absenden</Button>

 


              </Col>
          </Row>
      </Container>
    )
}

export default Home
