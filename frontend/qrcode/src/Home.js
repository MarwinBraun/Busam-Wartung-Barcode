import React, { useState, useEffect, useRef } from "react"

import { useParams } from "react-router-dom"

import axios from "axios"


import  {Spinner, Table, Modal, Alert, Button, Container, Col, Row, Image, Form, ButtonGroup, ToggleButton} from 'react-bootstrap'

const Home = () => {
  const [TextAnlage, setTextAnlage] = useState('');
  const [GeraetText, setGeraetText] = useState('');
  const [Name, setName] = useState('');
  const [Telefonnummer, setTelefonnummer] = useState('');
    const [checkedHeizung, setCheckedHeizung] = useState(false);
    const [checkedHeizungValue, setcheckedHeizungValue] = useState('no');
    const [checkedWarmWasser, setCheckedWarmWasser] = useState(false);
    const [checkedWarmWasserValue, setcheckedWarmWasserValue] = useState('no');
    const [checkedUndicht, setCheckedUndicht] = useState(false);
    const [checkedUndichtValue, setcheckedUndichtValue] = useState('no');
    const [StoerCodeValue, setStoerCodeValue] = useState("");
    const [NotdienstLeistungValue, setNotdienstLeistungValue] = useState("");
    const [AlertStoerung, setAlertStoerung] = useState(false);
    const [AlertStoerCode, setAlertStoerCode] = useState(false);
    const [AlertNotdienst, setAlertNotdienst] = useState(false);
    const [AlertName, setAlertName] = useState(false);
    const [AlertServerFailExplanation, setAlertServerFailExplanation] = useState(false);
    const [AlertDeviceFailExplanation, setAlertDeviceFailExplanation] = useState(false);
    const [AlertMessDataFailExplanation, setAlertMessDataFailExplanation] = useState(false);
    const [AlertHistoryFailExplanation, setAlertHistoryFailExplanation] = useState(false);
    const [AlertServerFail, setAlertServerFail] = useState(false);
    const [AlertGetDevices, setAlertGetDevices] = useState(false);
    const [AlertGetMessData, setAlertGetMessData] = useState(false);
    const [AlertGetHistoryData, setAlertGetHistoryData] = useState(false);
    const [AlertSuccess, setAlertSuccess] = useState(false);
    const [AlertLoginSuccess, setAlertLoginSuccess] = useState(false);
    const [AlertLoginFail, setAlertLoginFail] = useState(false);
    const [AlertNoDeviceAvailable, setAlertNoDeviceAvailable] = useState(false);
    const [AlertWrongFileValidation, setAlertWrongFileValidation] = useState(false);
    const [AlertNoMessdatenAvailable, setAlertNoMessdatenAvailable] = useState(false);
    const [AlertNoHistoryAvailable, setAlertNoHistoryAvailable] = useState(false);
    const [ExplanationText, setExplanationText] = useState('');
    const [DeviceExplanationText, setDeviceExplanationText] = useState('');
    const [MessDataExplanationText, setMessDataExplanationText] = useState('');
    const [HistoryExplanationText, setHistoryExplanationText] = useState('');
    const [RenderSendButton, setRenderSendButton] = useState(true);
    const [RenderSignUpButton, setRenderSignUpButton] = useState(true);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [DataComingBack, setDataComingBack] = useState({});
    const [MessDataComingBack, setMessDataComingBack] = useState({});
    const [HistoryDataComingBack, setHistoryDataComingBack] = useState({});
    const [showGeraeteTable, setshowGeraeteTable] = useState(false);
    const [showMessDataTable, setshowMessDataTable] = useState(false);
    const [showHistoryDataTable, setshowHistoryDataTable] = useState(false);
    const [file, setFile] = useState('');
    const [StoerText, setStoerText] = useState('');
    const [AlertExtendedStoerung, setAlertExtendedStoerung] = useState(false);
    const [filename, setFilename] = useState('Bild schießen oder auswählen');
    const [Loading, setLoading] = useState(false);
    const [LoadingSend, setLoadingSend] = useState(false);
    const inputRef = useRef(null);

    const onChange = e => {
      setFile(e.target.files[0]);
      setFilename(e.target.files[0].name);
    };
  

    const handleShow = () => { 
    setShowLoginModal(true);
    setAlertLoginFail(false)
    setAlertLoginSuccess(false)
    setRenderSignUpButton(true)
    setUsername('')
    setPassword('')
    setshowGeraeteTable(false)
    setAlertNoDeviceAvailable(false)
    setAlertDeviceFailExplanation(false)
    setDeviceExplanationText('')
    setAlertGetDevices(false)

    setshowMessDataTable(false)
    setAlertNoMessdatenAvailable(false)
    setAlertMessDataFailExplanation(false)
    setMessDataExplanationText('')
    setAlertGetMessData(false)


    setshowHistoryDataTable(false)
    setAlertNoHistoryAvailable(false)
    setAlertHistoryFailExplanation(false)
    setHistoryExplanationText('')
    setAlertGetHistoryData(false)
    
    //inputRef.current.focus();

  }

  const handleClose = () => { 
    setShowLoginModal(false);
    setAlertLoginFail(false)
    setAlertLoginSuccess(false)
    setRenderSignUpButton(true)
    setUsername('')
    setPassword('')
    setshowGeraeteTable(false)
    setLoading(false)
    //console.log(DataComingBack);

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
        if(Username === 'monteur' && Password === 'monteur'){
        setLoading(true)
        setAlertLoginSuccess(true)
        setAlertLoginFail(false)
        setRenderSignUpButton(false)
        setUsername('')
        setPassword('')
try {
const anfrage = await axios.get('http://stoerung.busam-online.de:5000/getDeviceData', {
    params: {
      AnlagenNummer: TextAnlage 
    }
  }) 

    var myarr = new Array();
    const back = anfrage.data;

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
     //console.log(myarr);
      
     }
     setDataComingBack(myarr);
     setshowGeraeteTable(true);
    } else {
      setAlertNoDeviceAvailable(true)
    } 
  
  } catch (err) { 
      if (err.response.status === 500) {
        setAlertGetDevices(true)
    }else {
      setAlertDeviceFailExplanation(true)
      setDeviceExplanationText(err.response.data.msg)
    } 
  } 
   


  try {
    const anfrage = await axios.get('http://stoerung.busam-online.de:5000/getMessData', {
        params: {
          AnlagenNummer: TextAnlage 
        }
      }) 
    
        var myarr = new Array();
        const back = anfrage.data;
    
        if(back.msg.length){
         setAlertNoMessdatenAvailable(false)
         for(var i = 0; i < back.msg.length; i++) {
          let id = back.msg[i].id;
           let device = back.msg[i].Messdaten;
           let deviceSplit = device.split(';')
         //console.log(back);
       
         myarr.push({'id': id, 
         'Messdatum': deviceSplit[0],
         'Gasanschlußdruck': deviceSplit[1],
         'Kaminzug': deviceSplit[2],
         'KesseltempMin': deviceSplit[3],
         'GasfliesdruckMin': deviceSplit[4],
         'AbgastemperaturMin': deviceSplit[5],
         'WirkungsgradMin': deviceSplit[6],
         'CO2Min': deviceSplit[7],
         'COPPMMin': deviceSplit[8],
         'O2Min': deviceSplit[9],
         'KesseltempMax': deviceSplit[10],
         'GasfliesdruckMax': deviceSplit[11],
         'AbgastemperaturMax': deviceSplit[12],
         'WirkungsgradMax': deviceSplit[13],
         'CO2Max': deviceSplit[14],
         'COPPMMax': deviceSplit[15],
         'O2Max': deviceSplit[16],
         'WasserqualiDH': deviceSplit[17],
         'WasserqualiLeitwert': deviceSplit[18],
         'WasserqualiPH': deviceSplit[19],
         'Anlagedruck': deviceSplit[20],
         'Vordruck': deviceSplit[21],
         'NachfuellMenge': deviceSplit[22],
       
       });
         // console.log(myarr);
          
         }
         setMessDataComingBack(myarr);
         setshowMessDataTable(true);
        } else {
          setAlertNoMessdatenAvailable(true)
        } 
      
      } catch (err) { 
          if (err.response.status === 500) {
            setAlertGetMessData(true)
        }else {
          setAlertMessDataFailExplanation(true)
          setMessDataExplanationText(err.response.data.msg)
        } 
      } 
       



      try {
        const anfrage = await axios.get('http://stoerung.busam-online.de:5000/getHistory', {
            params: {
              AnlagenNummer: TextAnlage 
            }
          }) 
        
            var myarr = new Array();
            const back = anfrage.data;
        
            if(back.msg.length){
             setAlertNoHistoryAvailable(false)
             for(var i = 0; i < back.msg.length; i++) {
              let id = back.msg[i].id;
               let AuftragsNr = back.msg[i].AuftragsNr;
               let Betreff = back.msg[i].Betreff;
               let TerminDatum = '';
               let Monteur = '';
               let TerminText = '';
               if(back.msg[i].TerminDatum !== null) {
                 let split = back.msg[i].TerminDatum.split('-');
                 let Day = split[2].split('T');
                 TerminDatum = Day[0] + '.' + split[1] + '.' + split[0];
              }else {
                 TerminDatum = '';
              }

              if(back.msg[i].Monteur !== null) {
                Monteur = back.msg[i].Monteur
             }else {
              Monteur = '';
             }


             if(back.msg[i].TerminText !== 'NULL') {
              TerminText = back.msg[i].TerminText
           }else {
            TerminText = '';
           }

           let Planstunden = back.msg[i].PlanStunden;
             //console.log(back);
           
             myarr.push({'id': id, 
             'AuftragsNr': AuftragsNr,
             'Betreff': Betreff,
             'TerminDatum': TerminDatum,
             'Monteur': Monteur,
             'TerminText': TerminText,
             'Planstunden': Planstunden
             
           
           });
             // console.log(myarr);
              
             }
             setHistoryDataComingBack(myarr);
             setshowHistoryDataTable(true);
            } else {
              setAlertNoHistoryAvailable(true)
            } 

            setLoading(false)
          
          } catch (err) { 
              if (err.response.status === 500) {
                setAlertGetHistoryData(true)
            }else {
              setAlertHistoryFailExplanation(true)
              setHistoryExplanationText(err.response.data.msg)
            } 
          } 
           
    
    
    
    
      



  

  

 

        } else {
          setAlertLoginFail(true)
          setAlertLoginSuccess(false)
          setRenderSignUpButton(true)
          setUsername('')
          setPassword('')
        }

      }

        const sendMail = async () => {
          setAlertStoerung(false)
          setAlertStoerCode(false)
          setAlertNotdienst(false)
          setAlertWrongFileValidation(false)
          setAlertName(false)
          setAlertSuccess(false)
          setAlertServerFail(false)
          setAlertServerFailExplanation(false)
          setAlertExtendedStoerung(false)
          setExplanationText('')


          if(checkedHeizung === false && checkedWarmWasser === false  && checkedUndicht === false ){
           setAlertStoerung(true)

           } else if(StoerCodeValue === "") {
            setAlertStoerCode(true)  
          } 
          
          else if(StoerCodeValue === 'yes' && file === "" && StoerText === "" ) {
            setAlertExtendedStoerung(true)  
          } 

          else if(NotdienstLeistungValue === "") {
            setAlertNotdienst(true)  
          } 
          
          else if(Name === '' || Telefonnummer === '') {
            setAlertName(true)  
          }

         else if(file !== "") {
            let fileValidation = filename.split('.'); 
            if(fileValidation[1] === 'png' || fileValidation[1] === 'jpg' || fileValidation[1] === 'jpeg'){
              setRenderSendButton(false)
              setLoadingSend(true);
                   
            
            try { 
              const formData = new FormData();
              formData.append('file', file);
              formData.append('AnlagenNummer', TextAnlage);
              formData.append('Geraet', GeraetText);
              formData.append('Heizung', checkedHeizungValue);
              formData.append('WarmWasser', checkedWarmWasserValue);
              formData.append('Undicht', checkedUndichtValue);
              formData.append('StoerCode', StoerCodeValue);
              formData.append('StoerText', StoerText);
              formData.append('Notdienst', NotdienstLeistungValue);
              formData.append('Name', Name);
              formData.append('Telefonnummer', Telefonnummer);
              const res = await axios.post('http://stoerung.busam-online.de:5000/sendMail', formData, {
                
                headers: {
                  'Content-Type': 'multipart/form-data'
                },
    
              /*
                AnlagenNummer: TextAnlage,
                Geraet: GeraetText,
                Heizung: checkedHeizung,
                WarmWasser: checkedWarmWasser,
                Undicht: checkedUndicht,
                StoerCode: StoerCodeValue,
                Notdienst: NotdienstLeistungValue,
                Name: Name,
                Telefonnummer: Telefonnummer
    
                */
    
              })

             // const { msgg } = res.data;
          
              
             // console.log(res.data.msgg);

              if(res.data.msg === 'Success'){
                setLoadingSend(false)
              //alert(res.data);
              setAlertSuccess(true)
              setRenderSendButton(false)

             }
              
              if(res.data.msg === 'Das Bild konnte nicht hochgeladen werden, da es die Grenze von 30 MB überschreitet, bitte wählen Sie ein kleineres Bild aus.'){
              setLoadingSend(false)
          
                setExplanationText(res.data.msg)
                setAlertServerFail(true)
                setRenderSendButton(true)
             
             } 

          
              
            } catch (err) { 
              //if (err.response.status === 400) {
              //  setAlertServerFail(true)
            //}else {
              //setAlertServerFailExplanation(true)
              //setExplanationText(err.response.data.msg)
            //} 
          }   
    


            } else{
              setAlertWrongFileValidation(true) 
            } 
           
          } 

        
           
       else if(file === "")  { 
        setLoadingSend(true)
        setRenderSendButton(false)
        try { 
          const formData = new FormData();
          formData.append('file', file);
          formData.append('AnlagenNummer', TextAnlage);
          formData.append('Geraet', GeraetText);
          formData.append('Heizung', checkedHeizungValue);
          formData.append('WarmWasser', checkedWarmWasserValue);
          formData.append('Undicht', checkedUndichtValue);
          formData.append('StoerCode', StoerCodeValue);
          formData.append('StoerText', StoerText);
          formData.append('Notdienst', NotdienstLeistungValue);
          formData.append('Name', Name);
          formData.append('Telefonnummer', Telefonnummer);
          const res = await axios.post('http://stoerung.busam-online.de:5000/sendMail', formData, {
            
            headers: {
              'Content-Type': 'multipart/form-data'
            },

          /*
            AnlagenNummer: TextAnlage,
            Geraet: GeraetText,
            Heizung: checkedHeizung,
            WarmWasser: checkedWarmWasser,
            Undicht: checkedUndicht,
            StoerCode: StoerCodeValue,
            Notdienst: NotdienstLeistungValue,
            Name: Name,
            Telefonnummer: Telefonnummer

            */

          })


          if(res.data.msg === 'Success'){

            setLoadingSend(false)
            setAlertSuccess(true)
            setRenderSendButton(false)

            } 

            if(res.data.msg === 'Das Bild konnte nicht hochgeladen werden, da es die Grenze von 30 MB überschreitet, bitte wählen Sie ein kleineres Bild aus.'){
              setLoadingSend(false)
              setExplanationText(res.data.msg)
              setAlertServerFail(true)
              setRenderSendButton(false)
           
            } 




         
        
          
        } catch (err) { 
         // if (err.response.status === 500) {
           // setAlertServerFail(true)
       // }//else {
          //setAlertServerFailExplanation(true)
          //setExplanationText(err.response.data.msg)
        //} 
      }   
      }  
      
      } 
      
      
          
      function HeizungCheck (e) {

        setCheckedHeizung(e.currentTarget.checked)
        //alert(checkedHeizung)
        if (checkedHeizung){
            setcheckedHeizungValue('no')
        } else{
          setcheckedHeizungValue('yes')
        } 

      } 

      function UndichtCheck (e) {

        setCheckedUndicht(e.currentTarget.checked)
       // alert(checkedUndicht)

        if (checkedUndicht){
            setcheckedUndichtValue('no')
        } else{
          setcheckedUndichtValue('yes')
        } 

      } 

       

      function WarmWasserCheck (e) {

        setCheckedWarmWasser(e.currentTarget.checked)
        //alert(checkedWarmWasser)

        if (checkedWarmWasser){
            setcheckedWarmWasserValue('no')
        } else{
          setcheckedWarmWasserValue('yes')
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
    onChange={(e) => HeizungCheck(e)}
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
  onChange={(e) => WarmWasserCheck(e)}
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
  onChange={(e) => UndichtCheck(e)}
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


 
</ButtonGroup> <br/> <br/>
{StoerCodeValue === 'yes' ? (

  <div>

  <Form>
  <Form.Group className="mb-3">
    <Form.Label>Bitte den Störungscode beschreiben oder ein Bild des Fehlers hochladen</Form.Label>
    <Form.Control as="textarea" rows={3}  value={StoerText} onChange={(e) => setStoerText(e.target.value)} type="text" placeholder="Beschreiben Sie die angezeigte Störungsmeldung..." />
 
  </Form.Group>

  </Form>

  <br/>

  <Form>
  <Form.Group as={Row}>
  <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={onChange}
          />
      </Form.Group>
      </Form>
      </div>

) : null} 




<br/> 

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

{AlertExtendedStoerung ? (
  <Alert variant="danger" onClose={() => setAlertExtendedStoerung(false)} dismissible>
        <Alert.Heading>Es wurde keine Beschreibung oder kein Bild über den Störcode hochgeladen.</Alert.Heading>
        <p>
         Bitte beschreiben Sie den Störungscode oder stellen uns ein Bild von der angezeigten Meldung zur Verfügung.
        </p>
      </Alert>
  ): null }

{AlertWrongFileValidation ? (
  <Alert variant="danger" onClose={() => setAlertWrongFileValidation(false)} dismissible>
        <Alert.Heading>Es wurde kein gültiges Bildformat ausgewählt.</Alert.Heading>
        <p>
        Bitte stellen Sie uns ausschließlich ein Bild zur Verfügung, andere Dateiformate werden nicht unterstützt.
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

{LoadingSend ? (


<Row className="justify-content-md-center">
<Button variant="primary" disabled>
    <Spinner
      as="span"
      animation="border"
      size="sm"
      role="status"
      aria-hidden="true"
    />
    Bitte haben Sie einen Moment Geduld und schließen die Seite nicht, Sie erhalten eine Rückmeldung, sobald Ihre Störungsmeldung an uns erfolgreich übersandt wurde...
  </Button>
</Row>

) : null} 


{AlertSuccess ? (
  <Alert variant="success" onClose={() => setAlertSuccess(false)} dismissible>
        <Alert.Heading>Übertragung erfolgreich</Alert.Heading>
        <p>
          Vielen Dank für die Erstellung Ihrer Störungsmeldung, wir werden Sie zeitnah kontaktieren.
        </p>
      </Alert>
  ): null }



{RenderSendButton ? (
  <div>
  <Button onClick={sendMail} variant="primary">Absenden</Button> <br/> <br/><br/><br/>
  </div>
  ): null }


              </Col>
          </Row>

          <Modal onShow={() => {inputRef.current.focus()}} show={showLoginModal} onHide={handleClose}>
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
    <Form.Control ref={inputRef} value={Username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Benutzername" />
   
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

{AlertNoHistoryAvailable ? (
  <Alert variant="info">
       Keine Historie vorhanden.
        
      </Alert>
  ): null }

{AlertHistoryFailExplanation ? (
  <Alert variant="danger">
        
     
        {HistoryExplanationText}
        
      </Alert>
  ): null }

{AlertGetHistoryData ? (
  <Alert variant="danger">
        
        
          Die Wartungshistorie konnte nicht abgerufen werden. 
     
      </Alert>
  ): null }





{AlertNoDeviceAvailable ? (
  <Alert variant="info">
       Keine Gerätedaten vorhanden.
        
      </Alert>
  ): null }

{AlertDeviceFailExplanation ? (
  <Alert variant="danger">
        
     
        {DeviceExplanationText}
        
      </Alert>
  ): null }

{AlertGetDevices ? (
  <Alert variant="danger">
        
        
          Die Gerätedaten konnten nicht abgerufen werden. 
     
      </Alert>
  ): null }



{AlertNoMessdatenAvailable ? (
  <Alert variant="info">
       Keine Messdaten vorhanden.
        
      </Alert>
  ): null }

{AlertMessDataFailExplanation ? (
  <Alert variant="danger">
        
     
        {MessDataExplanationText}
        
      </Alert>
  ): null }

{AlertGetMessData ? (
  <Alert variant="danger">
        
        
          Die Messdaten konnten nicht abgerufen werden. 
     
      </Alert>
  ): null }




{showHistoryDataTable ? 
   (
     <div>
      <h5>Die letzten 5 Einträge der Wartungshistorie</h5>
     
   
  <Table bordered hover responsive>
   <thead>
     <tr>
       <th>Wartungsauftragnummer</th>
       <th>Betreff</th>
       <th>Datum</th>
       <th>Monteur</th>
       <th>Termin-Text</th>
       <th>Planstunden</th>
     </tr>
   </thead>
   <tbody>
    
  
   {HistoryDataComingBack.map(device => (
     
    //let newArray = device.Geraetedaten;
    //let  DevicesImproved = newArray.split(';')
 

   <tr key={device.id}>
     <td>{device.AuftragsNr}</td>
     <td>{device.Betreff}</td>
     <td>{device.TerminDatum}</td>
     <td>{device.Monteur}</td>
     <td>{device.TerminText}</td>
     <td>{device.Planstunden}</td>
   
  
 </tr>

   )) }
    


   </tbody>
  </Table>
  </div>
    ) :
   null 
   
   }
 {Loading ? (


 <Row className="justify-content-md-center">
        <Spinner animation="border" role="status">
  <span className="visually-hidden">Loading...</span>
</Spinner>
</Row>

 ) : null} 




  

{showGeraeteTable ? 
   (
     <div>
      <h5>Gerätedaten</h5>
     
   
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
  </div>
    ) :
   null 
   
   }
 

 {showMessDataTable ? 
   (
     <div>
      <h5>Messdaten</h5>
     
   
  <Table bordered hover responsive>
   <thead>
     <tr>
       <th>Messdatum</th>
       <th>Gasanschlußdruck / mbar</th>
       <th>Kaminzug / mbar</th>
       <th>Kesseltemp. min / C</th>
       <th>Gasfliesdruck min / bar</th>
       <th>Abgastemperatur min / C</th>
       <th>Wirkungsgrad min / %</th>
       <th>CO2 min / %</th>
       <th>CO-ppm min</th>
       <th>O2 min / %</th>
       <th>Kesseltemp max / C</th>
       <th>Gasfliesdruck max / mbar</th>
       <th>Abgastemp. max / C</th>
       <th>Wirkungsgrad max. / %</th>
       <th>CO2 max / %</th>
       <th>CO-ppm max</th>
       <th>O2 Max / %</th>
       <th>Wasserqualität dh</th>
       <th>Wasserqualität Leitwert yS</th>
       <th>Wasserqualität ph-Wert</th>
       <th>Anlagedruck / bar</th>
       <th>Vordruck MAG / bar</th>
       <th>Nachfüllmenge / Liter</th>
     </tr>
   </thead>
   <tbody>
    
  
   {MessDataComingBack.map(device => (
     
    //let newArray = device.Geraetedaten;
    //let  DevicesImproved = newArray.split(';')
 

   <tr key={device.id}>
     <td>{device.Messdatum}</td>
     <td>{device.Gasanschlußdruck}</td>
     <td>{device.Kaminzug}</td>
     <td>{device.KesseltempMin}</td>
     <td>{device.GasfliesdruckMin}</td>
     <td>{device.AbgastemperaturMin}</td>
     <td>{device.WirkungsgradMin}</td>
     <td>{device.CO2Min}</td>
     <td>{device.COPPMMin}</td>
     <td>{device.O2Min}</td>
     <td>{device.KesseltempMax}</td>
     <td>{device.GasfliesdruckMax}</td>
     <td>{device.AbgastemperaturMax}</td>
     <td>{device.WirkungsgradMax}</td>
     <td>{device.CO2Max}</td>
     <td>{device.COPPMMax}</td>
     <td>{device.O2Max}</td>
     <td>{device.WasserqualiDH}</td>
     <td>{device.WasserqualiLeitwert}</td>
     <td>{device.WasserqualiPH}</td>
     <td>{device.Anlagedruck}</td>
     <td>{device.Vordruck}</td>
     <td>{device.NachfuellMenge}</td>
  
 </tr>

   )) }
    


   </tbody>
  </Table>
  </div>
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
