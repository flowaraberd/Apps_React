import React from 'react'
import ReactDOM from 'react-dom/client'
import './OperacionesBasica.css'
import './index.css'
import Modal from './Formulario'

const root = ReactDOM.createRoot(
    document.getElementById('root')
);

const oNombre = {
    s: "Suma",
    r: "resta",
    m: "Multiplicación",
    d: "División"
}

class Operaciones extends React.Component{
    constructor(props){
        super(props);
        this.oSuma = this.oSuma.bind(this);
        this.oResta = this.oResta.bind(this);
        this.oMultiplicacion = this.oMultiplicacion.bind(this);
        this.oDivision = this.oDivision.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {suma: '', resta: '', multiplicacion: '', division: ''};
    }

    oSuma(n){
        if(isNaN(n))
            return n + 5;
        
        return parseFloat(n) + 5;
    }
    oResta(n){
        return n - 5;
    }
    oMultiplicacion(n){
        return n * 5;
    }
    oDivision(n){
        return Math.round((n / 5) * 100000) / 100000;
    }

    handleChange(e){
        const number = e.target.value;
        if(isNaN(number))
            return false;

        if(number == ''){
            this.setState(
                {
                    suma: '', 
                    resta: '', 
                    multiplicacion: '', 
                    division: ''
                }
            );
            return false;
        }

        this.setState(
            {
                suma: this.oSuma(number), 
                resta: this.oResta(number), 
                multiplicacion: this.oMultiplicacion(number), 
                division: this.oDivision(number)
            }
        );
    };

    render(){
        return (
            <>
            <BHome />
            <div className='container-modal'>
                <div className='title-modal'>
                    <span>Operaciones - con el numero 5</span>
                </div>
                <div className='form-modal'>
                    <div className='form_input-modal'>
                        <InputText tipo='text' funcion={this.handleChange} placeholder='Introducir el numero' name='number' />
                    </div>
                    <div className='form_btn-modal form_span-modal'>
                        <OperacionResultado clases='resultado' nombre={oNombre.s} resultado={this.state.suma} />
                        <OperacionResultado clases='resultado' nombre={oNombre.r} resultado={this.state.resta} />
                        <OperacionResultado clases='resultado' nombre={oNombre.m} resultado={this.state.multiplicacion} />
                        <OperacionResultado clases='resultado' nombre={oNombre.d} resultado={this.state.division} />
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
            tabIndex='1'
            onChange={props.funcion}/>
    )
}

function OperacionResultado(props){
    return (
        <span className={'operacionesResultado ' + props.clases}>{props.nombre + ': ' + props.resultado}</span>
    );
}

function Home(props){
    const clase = props.target.classList.value;
    switch(clase){
        case 'form':
            root.render(<Modal />);
            break;
        case 'operation':
             root.render(<Operaciones />);
             break;
        default:
            console.log(clase);
    }
}

export default function BHome(){
    return (
        <div>
            <input type='button' className='form' value='Modal Form' onClick={Home}/>
            <input type='button' className='operation' value='Modal Operation' onClick={Home}/>
        </div>
    )
}

root.render(<BHome />)