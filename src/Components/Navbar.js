import React from "react";
import Log3 from '../img/log.png'; 


function Navbar() {
    return (
                <nav class="navbar navbar-expand-lg bg-dark" >
  <div class="container-fluid">
  <img src={Log3} className="Logo ml-5 mr-5" width="200px" />
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav  me-auto mb-2 mb-lg-0">
        <li class="nav-item Aling-items-left">
          <a class="nav-link active text-light " aria-current="page" href="#">Inicio</a>
        </li>
        <li class="nav-item">
        <a class="nav-link dropdown-toggle text-light" href="" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Docentes
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item text-light" href="#">Action</a></li>
            <li><a class="dropdown-item text-light" href="#">Another action</a></li>
           
            <li><a class="dropdown-item text-light" href="#">Something else here</a></li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle text-light" href="" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Carrera 
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item text-light" href="#">Action</a></li>
            <li><a class="dropdown-item text-light" href="#">Another action</a></li>
            <li><a class="dropdown-item text-light" href="#">Something else here</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled text-light"></a>
        </li>
      </ul>
       </div>
  </div>
</nav>

      
      
    );
  }
  
  export default Navbar;