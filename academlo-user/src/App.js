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
  console.log(event.target)
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
    .catch(error => console.log(error));

    alert(this.state.users.message);
};

handleInput = event => {
  this.setState({ [event.target.name]: event.target.value });
};

updateUser = event =>{
  //Actualizar cambio
  let  url = ' https://academlo-api-users.herokuapp.com/users '
  let id=event.target.id

  fetch(`${url}${id}`, {
    method:'PUT',
    body: JSON.stringify(),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(error => console.log(error));
}

deleteUser=event=>{
  //let  url = ' https://academlo-api-users.herokuapp.com/users '
  let el = event.target
  let id = el.dataset.id
  let index = el.dataset.index

  fetch(`https://academlo-api-users.herokuapp.com/users/${index}`, {
      method: 'DELETE'
  })
   .catch(err => console.error(err))
   .then(() => {
      let users = this.state.users
      users.splice(index, 1)
      this.setState({ users })
   })
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
              />
              <table className="table">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Apellido</th>
                      <th>Email</th>
                      <th>Contraseña</th>
                    </tr>
                  </thead>
                  <tbody>
                      {users.map((user,index)=>{
                        return (
                          <tr key={index} >
                            <td>{user.name}</td>
                            <td>{user.lastname}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                            <td>
                              <button onClick={this.updateUser}>Editar</button>
                              <button onClick={this.deleteUser}>Eliminar</button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
              </table>
                <div>{console.log(users)}</div>
        </div>
     );
    }else{
      return <p>Cargando registro de usuarios...</p>
    }
      
  }
}

export default App;
