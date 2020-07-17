import React,{Component} from 'react';
import './App.css';
import Users from './component/Users.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import EditUser from './component/EditUser'

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      users:[],
      userEdited:{}
    };

  }

//Se ejecuta cuando se renderiza este componente
componentDidMount(){
  this.obtenerDatos();
}

obtenerDatos = () => {
   //Primer argumento -> url de la petición que queremos realizar
  //Segundo argumento -> opciones para la petición (headers, body, method)
  let  url = 'https://academlo-api-users.herokuapp.com/users'
  fetch(url)
  .then(response => response.json())   //Regresa una promesa para poder transformar/interpretar esos datos en formato json
  .then(data => {
    this.setState({ users : data.data })
    }) //Respuesta de la petición que ya podremos manejar con javascript
  .catch(error => console.log(error));  
}


addUser = event => {

    if(event.target.name.value!=="" && event.target.lastname.value !=="" && event.target.email.value!=="" && event.target.password.value!==""){
      event.preventDefault();
      //Agregar una petición POST
        let  url = ' https://academlo-api-users.herokuapp.com/users '
        let content = {
          name: event.target.name.value,
          lastname: event.target.lastname.value,
          email: event.target.email.value,
          password: event.target.password.value,
        };
        let form=event.target;
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=UTF-8"
          },
          body: JSON.stringify(content)
        })
          .then(response => response.json())
          .then(results => {console.log(results);
          alert("Registro asignado con éxito");
          this.obtenerDatos();
          })
          .catch(error => console.log(error));
          form.reset();
    }else{
      alert("Falta información en el formulario");
    } 
};

handleInput = event => {
  this.setState({ [event.target.name]: event.target.value });
};

handleInputEdit=event=>{
  this.setState({
    userEdited: {
      ...this.state.userEdited,
      [event.target.name]: event.target.value
    }
  });
}

editUser=(user)=>{
  this.setState({ userEdited:user })
}
 
updateUser = (event) =>{
  //Actualizar cambio
  event.preventDefault();
  let  url = 'https://academlo-api-users.herokuapp.com/user/'+ this.state.userEdited.id;

  fetch(url, {
    method:'PUT',
    body: JSON.stringify(this.state.userEdited),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json())
  .then((results)=>{
    console.log(results)
    alert("Registro actualizado con éxito");
    this.obtenerDatos();
  })
  .catch(error => console.log(error));
}



deleteUser=(id)=>{
   if(window.confirm('Esta seguro?')){
         let  url = ' https://academlo-api-users.herokuapp.com/user/ '
        fetch(`${url}${id}`, {
            method: 'DELETE'
        })
        .catch(err => console.error(err))
        .then(() => {
            let copyUser=[...this.state.users]
            let updatedCopy = copyUser.filter(item=>item.id !== id)
            this.setState({ users:updatedCopy })
            alert("Registro eliminado con éxito");
        })
   }

}

  render(){
    const { users } = this.state;
    if(users.length>=0){
      return (
        <div>
              <Users
                title="Registro de usuarios" 
                input={this.handleInput} 
                newUser={this.addUser}
              />
              <EditUser
                 title="Actualización de usuarios" 
                 editInput={this.handleInputEdit} 
                 updateUser={this.updateUser}
                 user={this.state.userEdited}
              />
        
              <Container className="contenedor">
                <Row>
                      {
                        users.map((user)=>{
                          return(
                            <Card style={{ width: '18rem' }} key={user.id} className="tarjeta">
                            {/*<Card.Img variant="top" src="holder.js/100px180" >*/}
                            <Card.Body>
                              <Card.Title>{user.name}</Card.Title>
                                <Card.Text>
                                {user.lastname}
                                </Card.Text>
                                <Card.Text>
                                {user.email}
                                </Card.Text>
                                <Card.Text>
                                {user.password}
                                </Card.Text>
                                <Button variant="outline-primary" onClick={()=>this.editUser(user)}>Editar</Button>
                                <Button variant="outline-primary" onClick={()=>this.deleteUser(user.id)}>Eliminar</Button>
                        
                            </Card.Body>
                         </Card>
                          );
                        })
                     }
                </Row>
              </Container>  
                <div>{console.log(users)}</div>
        </div>
     );
    }else{
      return <p>Cargando registro de usuarios...</p>
    }
      
  }
}

export default App;
