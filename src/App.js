import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './style.module.css';
import Navbar from './Components/Navbar';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

import axios from 'axios';
import Foto from './img/Foto.png';  
import Log from './img/log.png'; 
import Log2 from './img/logo2.png'; 

function App() {
  const baseUrl="http://localhost/DB/";
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalCredencial, setModalCredencial] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [alumnoSeleccionado, setAlumnoSeleccionado]=useState({
    id: '',
    numero: '',
    nombre: '',
    carrera: ''
  });

  const handleChange = e => {
      const {name, value} = e.target;
      setAlumnoSeleccionado((prevState)=> ({
        ...prevState,
        [name]: value
      
      }))
      console.log(alumnoSeleccionado);


  }



   const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
    
  }
  
  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }
const abrirCerrarModalCredencial=()=>{
    setModalCredencial(!modalCredencial);
  }



  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
    
  }

  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
    setData(response.data);
    })
  }


  const peticionPost=async()=>{
    var f = new FormData();
    f.append("numero", alumnoSeleccionado.numero);
    f.append("nombre", alumnoSeleccionado.nombre);
    f.append("carrera", alumnoSeleccionado.carrera);
    f.append("METHOD", "POST");
    await axios.post(baseUrl, f)
    .then(response=>{
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPut=async()=>{
    var f = new FormData();
    f.append("numero", alumnoSeleccionado.numero);
    f.append("nombre", alumnoSeleccionado.nombre);
    f.append("carrera", alumnoSeleccionado.carrera);
    f.append("METHOD", "PUT");
    await axios.post(baseUrl, f, {params: {id: alumnoSeleccionado.id}})
    .then(response=>{
      var dataNueva= data;
      dataNueva.map(Alumno =>{
        if(Alumno.id===alumnoSeleccionado.id){
          Alumno.numero=alumnoSeleccionado.numero;
          Alumno.nombre=alumnoSeleccionado.nombre;
          Alumno.carrera=alumnoSeleccionado.carrera;
        }
      });
      
      setData(dataNueva);
      abrirCerrarModalEditar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionDelete=async()=>{
    var f = new FormData();
    f.append("METHOD", "DELETE");
    await axios.post(baseUrl, f, {params: {id: alumnoSeleccionado.id}})
    .then(response=>{
      setData(data.filter(Alumno=>Alumno.id!==alumnoSeleccionado.id));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }
 


  const seleccionarAlumno=(Alumno, caso)=>{
   setAlumnoSeleccionado(Alumno);

      (caso==="Editar")?
      abrirCerrarModalEditar():      
      abrirCerrarModalEliminar();
      
      }
      

      const seleccionarAlumno2=(Alumno, caso)=>{
        setAlumnoSeleccionado(Alumno);
     
           (caso==="Crear")?
           abrirCerrarModalCredencial():
           abrirCerrarModalEliminar();
           
           
           }
           
      

  


  useEffect(()=>{
    peticionGet();
  },[])

  
  
  
  return (
   <div>
     <Navbar/>
  
  

    <div className="Tabla position-absolute  top-50 start-50 translate-middle">
    
    <div  style={{textAlign: 'center' }}>
      
   <div>
       <table className="table table-success table-striped-columns ">
      <thead>
        <tr>
          <th>ID</th>
          <th>Matricula</th>
          <th>Nombre Completo</th>
          <th>Carrera</th>
          <th>Accion</th>
        </tr>
      </thead>
      <tbody>
        {data.map(Alumno=>(
          <tr key={Alumno.id}>
            <td>{Alumno.id}</td>
            <td>{Alumno.numero}</td>
            <td>{Alumno.nombre}</td>
            <td>{Alumno.carrera}</td>
            <td>
          <button className="btn btn-primary" onClick={()=>seleccionarAlumno(Alumno,"Editar")}>Editar</button> {"  "}
          <button className="btn btn-danger" onClick={()=>seleccionarAlumno(Alumno,"Eliminar")}>Eliminar</button>{"  "}
          <button className="btn btn-primary" onClick={()=>seleccionarAlumno2(Alumno,"Crear")}>Crear</button>{"  "}
        
          </td>
          </tr>
        ))}


      </tbody> 
    </table>
    <button className="btn btn-success" onClick={()=>abrirCerrarModalInsertar()}>Insertar</button>      <br /><br />
    
    </div>
    </div>

  


    <Modal isOpen={modalInsertar}>
      <ModalHeader>Insertar datos del Alumno</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Matriculua: </label>
          <br />
          <input type="text" className="form-control" name="numero" placeholder="Ejmp.4402" onChange={handleChange}/>
          <label>Nombre: </label>
          <br />
          <input type="text" className="form-control" name="nombre" placeholder="Nombre Completo" onChange={handleChange}/>
          <br />
          <label>Carrera: </label>
          <br />
          <input type="text" className="form-control" name="carrera" placeholder="Nombre de la carrera" onChange={handleChange}/>
          <br />
          </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>peticionPost()}>Insertar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
      </ModalFooter>
    </Modal>


    
    <Modal isOpen={modalEditar}>
      <ModalHeader>Editar Alumno</ModalHeader>
      <ModalBody>
          <div className="form-group">
          <label>Matriculua: </label>
          <br />
          <input type="text" className="form-control" name="numero" placeholder="Ejmp.4402" onChange={handleChange}  value={alumnoSeleccionado && alumnoSeleccionado.numero}/>
          <label>Nombre: </label>
          <br />
          <input type="text" className="form-control" name="nombre" placeholder="Nombre Completo" onChange={handleChange} value={alumnoSeleccionado && alumnoSeleccionado.nombre}/>
          <br />
          <label>Carrera: </label>
          <br />
          <input type="text" className="form-control" name="carrera" placeholder="Nombre de la carrera" onChange={handleChange} value={alumnoSeleccionado && alumnoSeleccionado.carrera}/>
          <br />
          </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>peticionPut()}>Editar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>abrirCerrarModalEditar()}>Cancelar</button>
      </ModalFooter>
    </Modal>

    <Modal isOpen={modalEliminar}>
        <ModalBody>
        ¿Estás seguro que deseas eliminar el Alumno {alumnoSeleccionado && alumnoSeleccionado.nombre}?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>peticionDelete()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={()=>abrirCerrarModalEliminar()}
          >
            No
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalCredencial}>
      <ModalHeader>Impirmir Credencial</ModalHeader>
      <ModalBody>
    
      <div className={styles.contenedor } Align="left">
    
    <section className={styles.tarjeta} id="tarjeta">
    <div className={styles.delantera}>
      <div className={styles.logo} id="logo">
      <img src={Log2} alt="" Align="left" />
        <img src={Log} alt="" />
      </div>
      <img src={Foto} className={styles.chip} alt="" />
      <div className={styles.logo}  id="logo">
        <div className={styles.grupo} Align="left" id="numero">
          <p className={styles.label}>No.Control:</p>
          <p className={styles.numero} Align="left"name="numero" >
             <input type="text" class={styles.borde} onChange={handleChange} value={alumnoSeleccionado && alumnoSeleccionado.numero}  />
            </p>
        </div>
        <div className={styles.flexbox}>
          <div className={styles.grupo} Align="left" id="nombre">
            <p className={styles.label}>Nombre Estudiante:</p>
            <p className={styles.numero}>
            <p>
            <input type="text" class={styles.borde} onChange={handleChange} value={alumnoSeleccionado && alumnoSeleccionado.nombre} Align="right" />
            </p>
            </p>

          </div>
           <div className={styles.grupo} id="carrera">
            <p className={styles.label}>Carrera:</p>
            <p>
            <input type="text" class={styles.bordes} onChange={handleChange} value={alumnoSeleccionado && alumnoSeleccionado.carrera} Align="left" />
            </p>
          </div>
        </div>
      </div>
    </div>
    </section>
    </div>
    
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>imp()}>Imprimir</button>{"   "}
        <button className="btn btn-danger" onClick={()=>abrirCerrarModalCredencial()}>Cancelar</button>
      </ModalFooter>
    </Modal>
    
    



    </div>   
    </div>
    

    
    
    
  );function imp(){
    window.print()
    }
}

export default App;


