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
  //.then(data => console.log(data))
  .then(data => this.setState({ users : data })) //Respuesta de la petición que ya podremos manejar con javascript
  .catch(error => console.log(error));  
}

addUser = event => {
  event.preventDefault();
  //Agregar un post
    let  url = ' https://academlo-api-users.herokuapp.com/users '
  /*let data = {
    username: event.target.username.value,
    lastname: event.target.lastname.value,
    email: event.target.email.value,
    password: event.target.password.value,
  };
  */
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify()
  })
    .then(response => response.json())
    .then(results => console.log(results))
    .catch(error => console.log(error));

    
};

handleInput = event => {
  this.setState({ [event.target.name]: event.target.value });
};

updateUser=event=>{
  //Actualizar cambio
   let   url = 'https://academlo-api-users.herokuapp.com/users'
  var formData = new FormData();
  formData.append('username', event.target.username.value);
  formData.append('lastname', event.target.lastname.value);
  formData.append('email', event.target.email.value);
  formData.append('password', event.target.password.value);
   
  fetch(url, {
  method: 'PUT',
  body: formData
})
.then(response => response.json())
.catch(error => console.error('Error:', error))
.then(response => console.log('Success:', response));
}


  render(){
    const { users } = this.state;
   
      return (
        <div>
              <Users
                title="Registro de usuarios" 
                input={this.handleInput} 
                newUser={this.addUser}
                update={this.updateUser}
              />
              <div>
              {console.log(users.data)}
                {/*{users.map((user)=>{
                    return (
                      <div key={user.index}>
                        <p>{user.name}</p>
                        <p>{user.lastname}</p>
                        <p>{user.email}</p>
                        <p>{user.password}</p>
                      </div>
                    );
                  })}*/}
              </div>
        </div>
     );

  }
}

export default App;
