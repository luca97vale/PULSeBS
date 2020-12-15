import React, {useEffect} from 'react';
import {AuthContext} from '../auth/AuthContext'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import moment from 'moment';
import Modal from 'react-modal';
import DayPickerSupportOfficer from './DayPickerSupportOfficer';
import API from '../api/API';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

const SupportOfficerUpdate = (props) => {

    let {} = props;
    const [year,setYear] = React.useState(1);
    const [msg,setMsg] = React.useState("");
    const [type,setType] = React.useState("remove");
    const [range,setRange] = React.useState({from: undefined,to: undefined});
    const [modalIsOpen,setIsOpen] = React.useState(false);
    // same as componentDidMount()
    useEffect(() => {
    }, []);

    function openModal() {
        setIsOpen(true);
    }

    function updateListSupportOfficer() {
        if(range.from !== undefined && range.to !== undefined && type !== undefined && year !== undefined){
            API.updateListSupportOfficer(year,range.from._i,range.to._i,type).then((e) =>{

            }).catch((e) =>{
                throw e;
            })
            setMsg("the list of bookable lectures has been update");
            openModal();
        }else{
            setMsg("Please, select all fields!!!");
            openModal();
        }
    }
    function setInterval(range){
        const from = returnMoment(range.from);
        const to = range.to ? returnMoment(range.to) : undefined;
        setRange({from: from, to: to});
    }

    function returnMoment(date){
        const format1 = "YYYY-MM-DD HH:mm:ss";
        let dateTime = moment(date).format(format1);
        dateTime = moment(dateTime,"YYYY-MM-DD HH:mm:ss");
        return dateTime;
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
      }
     
      function closeModal(){
        setIsOpen(false);
      }

    return(
        <AuthContext.Consumer>
          {(context) => (
            <>
                <Row className="">
                    <Col sm={2} className="below-nav"></Col>
                    <Col sm={4}
                        className="below-nav">
                        <Row>
                            <h1>Select the period</h1>
                        </Row>
                        <DayPickerSupportOfficer setRange={(range) => setInterval(range)}/>
                        <Row>
                            <button type="button"className="btn btn-success" onClick={() =>updateListSupportOfficer()}>Submit</button>
                        </Row>
                    </Col>
                    <Col sm={2} className="below-nav">
                        <Row><h1>Select the year</h1>
                        </Row>
                        <Row>
                            <input type="button" className={year === 1? "btn btn-primary" : "btn btn-outline-primary"} onClick={() => setYear(1)}value="1"/>
                            <input type="button" className={year === 2? "btn btn-primary" : "btn btn-outline-primary"} onClick={() => setYear(2)}value="2"/>
                            <input type="button" className={year === 3? "btn btn-primary" : "btn btn-outline-primary"} onClick={() => setYear(3)}value="3"/>
                            <input type="button" className={year === 4? "btn btn-primary" : "btn btn-outline-primary"} onClick={() => setYear(4)}value="4"/>
                            <input type="button" className={year === 5? "btn btn-primary" : "btn btn-outline-primary"} onClick={() => setYear(5)}value="5"/>
                        </Row>
                    </Col>
                    <Col sm={2} className="below-nav">
                        <Row><h1>Add or Remove</h1>
                        </Row>
                        <Row>
                            <input type="button" className={type === "add"? "btn btn-primary" : "btn btn-outline-primary"} onClick={() => setType("add")}value="Add"/>
                            <input type="button" className={type === "remove"? "btn btn-primary" : "btn btn-outline-primary"} onClick={() => setType("remove")}value="Remove"/>
                        </Row>
                    </Col>
                    <Col sm={1}/>
                </Row>
                <div>
                <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                >
                <h1>{msg}</h1>
                </Modal>
            </div>
            </>
          )}
        </AuthContext.Consumer>
      );
}

export default SupportOfficerUpdate;