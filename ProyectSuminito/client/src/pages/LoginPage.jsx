import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Formik } from 'formik'
import React from 'react';
import { getEmpleadoLoginRequest, getEmpleadoRequest } from '../api/producto.api'
import { useAuth } from "../Seguridad/AuthContext";
import bcrypt from 'bcryptjs';

export function LoginPage() {
  const navigate = useNavigate();

  const [tipo, setTipo] = useState(true);//mostrar contraseña
  const [error, setError] = useState(false);//mostrar error
  const { login } = useAuth();

  
  const tipoPassword = tipo ? 'password' : 'text'

  const verClave = () => {
    setTipo(!tipo)
  }

  return (
    <>
      <div className='seccionLogin'>
        <img className="Logo3" src="https://images.vexels.com/media/users/3/137047/isolated/preview/5831a17a290077c646a48c4db78a81bb-icono-de-perfil-de-usuario-azul.png" />
        <Formik initialValues={{
          usuarioApp: '',
          clave: ''
        }}
          onSubmit={async (values, actions) => {
            //Validar el usuario ingresado con la bd
            try {
              //const responce = await getEmpleadoLoginRequest(values);
              const responce = await getEmpleadoRequest(values.usuarioApp);
              console.log(responce.data)
              //verifica que exista y si los datos son correctos
              if (values.usuarioApp === responce.data.usuarioApp) {
                console.log(values);

                const validaPassword = await bcrypt.compare(values.clave, responce.data.contrasena);
                if (validaPassword) {
                  setError(false);
                  //Envia a la pagina o menu principal del la tienda
                  login(responce.data);
                  //navigate(`/suminito/${values.idEmpleado}`)
                }else{
                  setError(true);
                }

              } else {
                console.log('algo esta mal')
                setError(true);
              }
              actions.resetForm()
            } catch (error) {
              console.error(error);
            }
          }}
        >
          {/*handleChange: para tomar los datos ingresados en los input*/}
          {({ handleChange, handleSubmit, values, isSubmitting }) => (
            <Form className='datosUsuario' onSubmit={handleSubmit}>
              <input className="nEmpleado" type="text" name='usuarioApp' placeholder='Usuario' onChange={handleChange} value={values.usuarioApp} />
              <input className="claveEmpleado" type={tipoPassword} name='clave' placeholder="Clave" onChange={handleChange} value={values.clave} />
              <label onClick={verClave}>ver clave</label>
              {/*Si el usuario no existe o los datos son incorrectos
                ->mostrara un mensaje en pantall*/}
              <button className="buttonInicio" type='submit' disabled={isSubmitting}>
                {isSubmitting ? "Autenticando..." : "Iniciar Seccion"}
              </button>
              {error && <p className="error-message">Credenciales inválidas. Por favor, inténtalo nuevamente.</p>}
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}

export default LoginPage;