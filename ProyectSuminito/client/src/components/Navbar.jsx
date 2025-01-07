import { NavLink as NavLinkReactRoute } from 'react-router-dom'

/*
    COMPONENTE: para navegar entre las distintas paginas
    1- isAction: para desactivar el boton cuando se encuentra en la pagina del mismo enlace
*/
export const NavLink = ({to, children, ...props}) => {
    return (
        <NavLinkReactRoute 
        {...props}
        className={({ isActive}) =>{
            return isActive ? 'is-active' : undefined;
        }} to={to}>
            {children}
        </NavLinkReactRoute>
    )
}