import React, { useState, useEffect } from "react"

import { useParams } from "react-router-dom"


import  {Container, Col, Row, Image, Form, ButtonGroup, ToggleButton} from 'react-bootstrap'

const Home = () => {
  const [TextAnlage, setTextAnlage] = useState('');
  const [GeraetText, setGeraetText] = useState('');
    const [checkedHeizung, setCheckedHeizung] = useState(false);
    const [checkedWarmWasser, setCheckedWarmWasser] = useState(false);
    const [checkedUndicht, setCheckedUndicht] = useState(false);
   
    const params = useParams()

        useEffect(() => {  
          if(!params.anlagenid || !params.geraetid) { 
          alert('Keine Anlagen-Nummer oder Gerätebezeichnung vergeben!')
          window.location.href = "https://busam-online.de"; 
        }

        params.anlagenid.replace('/', "")
        params.geraetid.replace(/\\/g, "")
        params.anlagenid.replace('/', "")
        params.geraetid.replace(/\\/g, "")

           setTextAnlage(params.anlagenid)
           setGeraetText(params.geraetid) 

        });
   
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
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Wartungsanlagen Nummer</Form.Label>
    <Form.Control value={TextAnlage} onChange={(e) => setTextAnlage(e.target.value)} type="text" placeholder="Wartungsanlagen-Nummer" />
   
  </Form.Group>

  </Form>

  <Form>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Geräte Nummer / Bezeichnung</Form.Label>
    <Form.Control value={GeraetText} onChange={(e) => setGeraetText(e.target.value)} type="text" placeholder="Geräte Nummer / Bezeichnung" />
 
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
<ToggleButton
  id="toggle-checkWasser"
  type="checkbox"
  variant="outline-primary"
  checked={checkedWarmWasser}
  value="1"
  onChange={(e) => setCheckedWarmWasser(e.currentTarget.checked)}
>
  Kein Warmwasser
</ToggleButton>
</ButtonGroup>

<ButtonGroup className="mb-2">
<ToggleButton
  id="toggle-checkUndicht"
  type="checkbox"
  variant="outline-primary"
  checked={checkedUndicht}
  value="1"
  onChange={(e) => setCheckedUndicht(e.currentTarget.checked)}
>
  Undichtigkeit an der Heizungsanlage
</ToggleButton>
</ButtonGroup> 
<br/>
<Form.Text className="text-muted">
      (Mehrfachauswahl möglich)
    </Form.Text>
              
              </Col>
          </Row>
      </Container>
    )
}

export default Home
