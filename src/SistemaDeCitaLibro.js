import React from 'react'
import ReactDOM  from 'react-dom/client'
import './citalibro.css'

const root = ReactDOM.createRoot(
    document.getElementById('root')
);

class Container extends React.Component{
    constructor(props){
        super(props);
        this.agregarCita = this.agregarCita.bind(this);
        this.allInputIds = ['names','author','publisher','numberPage','serialNumber','textArea'];
        this.state = {mensaje: '', filas: []};
    }

    agregarCita(e){
        const tabla = document.querySelector('table tbody');
        let allData = {
            "names": '',
            "author": '',
            "publisher": '',
            "numberPage": '',
            "serialNumber": '',
            "textArea": ''
        }
        this.allInputIds.forEach((valor)=>{
            const input = document.getElementById(valor);
            if(input.value.length < 1){
                console.log(input.value);
                this.setState({mensaje: 'Por favor completar todos los campos.'});
                return false;
            }
            allData[valor] = input.value;
        });
        const row = (
            <tr key={allData['names']} style={{ textAlign: 'center' }}>
                <td>{allData['names']}</td>
                <td>{allData['author']}</td>
                <td>{allData['publisher']}</td>
                <td>{allData['numberPage']}</td>
                <td>{allData['serialNumber']}</td>
                <td><a href='#'>X</a></td>
            </tr>
        );

        this.setState({mensaje: '', filas: [row]});
        return true;
    }
    render(){
        return (
            <div className='container'>
                <Formulario mensaje={this.state.hello} agregarCita={this.agregarCita}/>
                <Biblioteca filas={this.state.filas} />
            </div>
        );
    }
}

class Formulario extends React.Component{
    render(){
        return (
            <div className='form'>
                <InputText clases_content='pp' clases='pp' label='Nombre' id='names' place='Nombre de la obra' name='name'/>
                <InputText clases_content='pp' clases='pp' label='Autor' id='author' place='Autor' name='author'/>
                <InputText clases_content='pp' clases='pp' label='Publicadora' id='publisher' place='Publicadora' name='publisher'/>
                <InputNumber clases_content='fiftyp' clases='_fiftyp' label='Numero de pagina' id='numberPage' name='numberPage'/>
                <InputNumber clases_content='fiftyp' clases='_fiftyp' label='Numero de serial' id='serialNumber' name='serialNumber'/>
                <TextArea clases_content='pp' clases='pp' label='Mensaje de la cita del libro' id='textArea' name='textArea' place='Citas' />
                <span>{this.props.mensaje}</span>
                <BottomForm clases='pp' valor='Agregar' llamar={this.props.agregarCita} />
            </div>
        );
    }
}

class Biblioteca extends React.Component{
    render(){
        return (
            <div className='biblioteca'>
                <table border='1'>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Autor</th>
                            <th>Publicadora</th>
                            <th>Pagina</th>
                            <th>Serial</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.filas}
                        <tr style={{textAlign: 'center'}}>
                            <td>La luz de noche</td>
                            <td>Rodrigo B.</td>
                            <td>Omega</td>
                            <td>231</td>
                            <td>1</td>
                            <td><a href='#'>X</a></td>
                        </tr>
                        <tr style={{textAlign: 'center'}}>
                            <td>La luz de noche</td>
                            <td>Rodrigo B.</td>
                            <td>Omega</td>
                            <td>231</td>
                            <td>2</td>
                            <td><a href='#'>X</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

function InputText(props){
    return (
        <div className={'input_content ' + props.clases_content}>
        <label htmlFor={props.id}>{props.label}</label>
        <input type='text' className={'inputText ' + props.clases} id={props.id} placeholder={props.place} name={props.name} />
        </div>
    );
}
function InputNumber(props){
    return (
        <div className={'input_content ' + props.clases_content}>
        <label htmlFor={props.id}>{props.label}</label>
        <input type='number' min='0' className={'inputNumber ' + props.clases} id={props.id} name={props.name} />
        </div>
    );
}
function TextArea(props){
    return (
        <div className={'input_content ' + props.clases_content}>
            <label htmlFor={props.id}>{props.label}</label>
            <textarea id={props.id} className={'textArea ' + props.clases} placeholder={props.place}></textarea>
        </div>
    );
}
function BottomForm(props){
    return (
        <input type='button' className={'inputForm ' + props.clases} value={props.valor} onClick={() => {props.llamar()}} />
    );
}

// root.render(<p>Hello world!</p>)
root.render(<Container />)