import React from "react";
import ReactDOM from "react-dom/client"

const root = ReactDOM.createRoot(document.getElementById("root"));

class Car extends React.Component{
  constructor(props){
    super(props);
    this.state = {name: "", fecha: new Date()};
    this.changeName = this.changeName.bind(this);
    this.btnData = this.btnData.bind(this);
  }
  changeName(e){
    this.setState({fecha: new Date()})
    // this.setState({name: e.target.value, fecha: new Date()})
  }
  componentDidMount(){
    setInterval(this.changeName, 1234)
  }
  btnData(e){
    console.log('btn: ' + e.target.classList);
  }
  render(){
    return (
      <>
      <Button call={this.btnData}/>
      <p>Welcome {this.state.name}, Fecha: {this.state.fecha.toLocaleTimeString()}</p>
      <input type="text" placeholder="Introducir nombre" onChange={this.changeName} />
      </>
    )
  };
}

function Button(props){
  return (
    <input type='button' value='Entrar' className='Entrybtn' onClick={props.call}/>
  );
}

function App(props){
  return(
    <>
    <h1><center>Welcome to React App</center></h1>
    <p>Mi nombre: {props.name} y apellido {props.apellido}</p>
    <Car />
    <Button />
    </>
    );
}

root.render(<App name="Carlos" apellido="Made"/>);