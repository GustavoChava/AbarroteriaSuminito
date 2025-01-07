import { useEffect, useState } from 'react'
import { useAuth } from '../Seguridad/AuthContext';
import { NavLink } from './Navbar.jsx'


export function Encabezado ({subtitulo, navegation}) {
    /*PROPS
        navegation: permite programar la ruta del boton de regreso
    */
    const { empleado } = useAuth(); // Obtén el usuario del contexto

    return (
        <>
            {/*Ver departamento de la UNAH y el servicio a que usuario se realiza*/}
            <div className="Encabezado">
                <div>
                    <img src="https://cdn-icons-png.freepik.com/256/7275/7275164.png?semt=ais_hybrid" />
                    <div className="tituloEncabezado">
                        <h1>SUMINITO</h1>
                        {/*<h3>{subtitulo}</h3>*/}
                    </div>
                </div>
                {/*--Boton de regreso/salida--*/}
                <div class="en-empleado">
                    <h3>{empleado.nombres}</h3>
                <NavLink  to={navegation}>
                    <img className="opc-salir" src="https://cdn-icons-png.flaticon.com/512/8045/8045212.png" alt="Salir" />
                </NavLink>
                </div>
                
                
            </div>
            
        </>
    )
}