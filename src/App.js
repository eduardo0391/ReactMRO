import React, { useState , useEffect} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../src/App.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
//import DatePicker from 'react-date-picker';
import Datepicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import "react-date-picker/dist/DatePicker.js";
import Moment from 'moment';

function App() {
  //const baseUrl = 'http://localhost:55205/api/Movemen11t';
  const baseUrl = 'http://localhost:1010/api/Movement'; 
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsert]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [movementSeleccionado, setMovementSeleccionado]= useState(
    {
      id:'',
      name:'',
      description:'',
      unitPrice:'' , 
      date:''
    }
  );
let currentDate= new Date();
const [dateValue, setDate]= useState(new Date (currentDate.getFullYear(),currentDate.getMonth() ,currentDate.getDate()));

  const handleChange=e=>{
    const {name, value}= e.target;
    setMovementSeleccionado(
      {...movementSeleccionado, 
        [name]:value
      }
    );
    console.log(movementSeleccionado);
  }

  const abrirCerrarModalInsert=()=>{
    setModalInsert(!modalInsertar);
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar=()=> {
    setModalEliminar(!modalEliminar);
  }

  const peticionGet= async()=>{
    await axios.get(baseUrl)
    .then(response => 
      {
        setData(response.data);
      }
    ).catch(error=>{
      console.log(error);
    })
  }
  
  const peticionPost=async()=>{
    delete movementSeleccionado.id;
    // movementSeleccionado.lanzamiento=parseInt(movementSeleccionado.lanzamiento);
    await axios.post(baseUrl, movementSeleccionado)
    .then(response=>{
      setData(data.concat(response.data));
      abrirCerrarModalInsert();
    }).catch(error=>{
      console.log(error);
    })
  }
  
  const peticionPut = async()=>{
    await axios.put(baseUrl+ "/" + movementSeleccionado.id, movementSeleccionado)
    .then(response=> {
          var dataAuxiliar = data;
          dataAuxiliar.map(movement => {
            if (movement.id === response.data.id)
            {
              movement.name = response.data.name;
              movement.date = response.data.date;
              movement.unitPrice = response.data.unitPrice;
              movement.description = response.data.description;             
            }
          });
              abrirCerrarModalEditar();
      }
    ).catch(
      error=>{
        console.log(error);
      }
    )
  }

  
  const peticionDelete = async()=>{
    await axios.delete(baseUrl+ "/"+movementSeleccionado.id).then(
      response=> {
        setData(data.filter(movement => movement.id!==response.data));
        abrirCerrarModalEliminar();
      }
    ).catch(
      error=>{
        console.log(error);
      }
    )
  }

  
  const seleccionarGestor=(gestor, caso)=>
  {
    setMovementSeleccionado(gestor);
    (caso==="Editar")?
     abrirCerrarModalEditar(): abrirCerrarModalEliminar();
  }
 
  useEffect(()=>{
    peticionGet();
  }, [])

  return(
    <div className="App">


      <br></br>
      <button onClick={()=>abrirCerrarModalInsert()} className="btn btn-success">Insertar Nuevo Gestor</button>
      <br></br>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Movement</th>
            <th>Date</th>
            <th>Unit Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map(movement=>(
          <tr key={movement.id}>
          <td>{movement.id}</td>
          <td>{movement.name}</td>
          <td>{movement.description}</td>
          <td>{Moment(movement.date).format('DD/MM/yyyy') }</td>
          <td>{movement.unitPrice}</td>
          <td>
              <button className="btn btn-primary" onClick={()=>seleccionarGestor(movement, "Editar")}>Editar</button>
              <button className="btn btn-danger" onClick={()=> seleccionarGestor(movement, "Eliminar")}>Eliminar</button>
          </td>
          </tr>
          ))}
     
        </tbody>
      </table>

      <Modal isOpen={modalInsertar}>
            <ModalHeader>Insertar Gestor de base de datos</ModalHeader>
            <ModalBody>
                <div className="form-group">
                  <label>Movimiento:</label>
                  <br/>
                  <input type="text" className="form-control"  name="name" onChange={handleChange}></input>
                  <br/>
                  <label>Fecha:</label>
                  <br/>
                      <Datepicker 
                          name="date" 
                          onChange={handleChange}
                          onChange={date => handleChange({ target: { value: date, name: 'date' } })}
                          className="form-control"
                          selected={movementSeleccionado.date? new Date( movementSeleccionado.date): dateValue}
                          dateFormat="dd/MM/yyyy"/>

                  <br/>
                  <br/>
                  <label>Monto:</label>
                  <br/>
                  <input type="text" className="form-control"  name="unitPrice" onChange={handleChange}></input>
                  <br/>
                </div>
            </ModalBody>
            <ModalFooter>
                  <button className="btn btn-primary" onClick={()=>peticionPost()}>Insertar</button>{"  "} 
                  <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsert()}>Cancelar</button>{" "}
            </ModalFooter>
      </Modal>

      <Modal isOpen={modalEditar}>
            <ModalHeader>Actualizar Gestor de base de datos</ModalHeader>
            <ModalBody>
                <div className="form-group">
                  <label>Field1:</label>
                  <br/>
                  <input type="text" className="form-control" name="name" onChange={handleChange} value={movementSeleccionado && movementSeleccionado.name}></input>
                  <br/>
                  <label>Field2:</label>
                  <br/>
                  <input type="text" className="form-control" name="description" onChange={handleChange} value={movementSeleccionado && movementSeleccionado.description}></input>
                  <br/>
                  <label>Field3:</label>
                  <br/>
                  <Datepicker 
                          name="date" 
                          onChange={handleChange}
                          onChange={date => handleChange({ target: { value: date, name: 'date' } })}
                          className="form-control"
                          dateFormat="dd/MM/yyyy"
                          selected={ movementSeleccionado.date ? new Date( movementSeleccionado.date): null}
                          // onChange={date=> setDate(movementSeleccionado.date)}
                          >
                            
                          </Datepicker>
                       
                  {/* <input type="text" className="form-control" name="name" onChange={handleChange} value={movementSeleccionado && movementSeleccionado.date}></input> */}
                  <br/>
                  <label>Field4:</label>
                  <br/>
                  <input type="text" className="form-control" name="unitPrice" onChange={handleChange} value={movementSeleccionado && movementSeleccionado.unitPrice}></input>
                  <br/>               
                </div>
            </ModalBody>
            <ModalFooter>
                  <button className="btn btn-primary" onClick={()=>peticionPut()}>Guardar</button>{"  "} 
                  <button className="btn btn-danger" onClick={()=>abrirCerrarModalEditar()}>Cancelar</button>{" "}
            </ModalFooter>
      </Modal>

      <Modal isOpen={modalEliminar}>
        <ModalBody>
          Está seguro que desea eliminar el gestor de datos {movementSeleccionado && movementSeleccionado.nombre} ?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>peticionDelete()}>
            si
          </button>
          <button
          className="btn btn-secondary"
          onClick={()=>abrirCerrarModalEliminar()}
          >
          No  
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;   