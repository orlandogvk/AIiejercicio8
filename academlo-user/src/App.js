import React,{Component} from 'react';
import './App.css';
import Users from './component/Users.jsx';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      users:[]
    };

  }

//Se ejecuta cuando se renderiza este componente
componentDidMount(){
  //Primer argumento -> url de la petición que queremos realizar
  //Segundo argumento -> opciones para la petición (headers, body, method)
  let  url = 'https://academlo-api-users.herokuapp.com/users'
  fetch(url)
  .then(response => response.json())   //Regresa una promesa para poder transformar/interpretar esos datos en formato json
  .then(data => this.setState({ users : data.data })) //Respuesta de la petición que ya podremos manejar con javascript
  .catch(error => console.log(error));  
}

addUser = event => {
  event.preventDefault();
  //Agregar un post
  let  url = ' https://academlo-api-users.herokuapp.com/users '
  let content = {
    name: event.target.name.value,
    lastname: event.target.lastname.value,
    email: event.target.email.value,
    password: event.target.password.value,

  };
  
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(content)
  })
    .then(response => response.json())
    .then(results => console.log(results))
    .then(results=>alert(results.data.message))
    .catch(error => console.log(error));

    
};

handleInput = event => {
  this.setState({ [event.target.name]: event.target.value });
};

updateUser = event =>{
  //Actualizar cambio
  let  url = ' https://academlo-api-users.herokuapp.com/users '
  let content = {
    name: event.target.name.value,
    lastname: event.target.lastname.value,
    email: event.target.email.value,
    password: event.target.password.value,

  };
  
  fetch(url, {
    method: 'PUT',
    body: JSON.stringify(content),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(error => console.log(error));
}


  render(){
    const { users } = this.state;
    if(users.length>0){
      return (
        <div>
              <Users
                title="Registro de usuarios" 
                input={this.handleInput} 
                newUser={this.addUser}
                update={this.updateUser}
              />
              <div>
                {users.map((user,index)=>{
                    return (
                      <div className="Data" key={index} >
                        <div className="itemName">
                        <p><strong>Nombre: </strong>{user.name}</p>
                        <p><strong>Apellido: </strong>{user.lastname}</p>
                        <p><strong>Email: </strong>{user.email}</p>
                        <p><strong>Contraseña: </strong> {user.password}</p>
                        </div>
                      </div>
                    );
                  })}
              </div>
                <div>{console.log(users)}</div>
        </div>
     );
    }else{
      return <p>Cargando usuario...</p>
    }
      
  }
}

export default App;
