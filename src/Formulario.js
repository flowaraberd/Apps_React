import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import BHome from './OperacionesBasica'

const root = ReactDOM.createRoot(
    document.getElementById('root')
);

export default class Modal extends React.Component{
    render(){
        return (
            <>
            <BHome />
            <div className='container-modal'>
                <div className='title-modal'>
                    <span>Registrate</span>
                </div>
                <div className='form-modal'>
                    <div className='form_input-modal'>
                        <InputText tipo='text' placeholder='Nombres' nombre='name' />
                        <InputPassword tipo='email' placeholder='Correo eléctronico' nombre='email' />
                        <InputTextarea tipo='textarea' placeholder='Mensaje' nombre='message' />
                    </div>
                    <div className='form_btn-modal'>
                        {/* <ButtonLogin nombre='loggin' valor='Enviar' /> */}
                        <SpecialTextLink enlace='javascript:void(0);' clases='' texto='Enviar' />
                        <SpecialTextLink enlace='javascript:void(0);' clases='' texto='Cancelar' />
                    </div>
                </div>
            </div>
            </>
        )
    }
}

function InputText(props){
    return (
        <input 
            type={props.tipo}
            placeholder={props.placeholder}
            name={props.nombre}
            tabIndex='1'/>
    )
}
function InputPassword(props){
    return (
        <input 
            type={props.tipo}
            placeholder={props.placeholder}
            name={props.nombre}
            tabIndex='2'/>
    )
}
function InputTextarea(props){
    return (
        <textarea
            placeholder={props.placeholder}
            name={props.nombre}
            tabIndex='3'>
        </textarea>
    )
}
function ButtonLogin(props){
    return (
        <input 
            type='button'
            name={props.nombre}
            value={props.valor}/>
    )
}
function SpecialTextLink(props){
    return (
        <a href={props.enlace} className={'specialtext ' + props.clases}>{props.texto}</a>
    );
}


root.render(<Modal />)