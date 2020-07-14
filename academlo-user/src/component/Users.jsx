import React from 'react'


export default function Users(props){
    return(
    <div>
        <h1>{props.title}</h1>
        <form onInput={props.input} onSubmit={props.newUser}>
            <input name="username" type="text" placeholder="Nombre del usuario" />
            <input name="lastname" type="text" placeholder="Apellido del usuario" />
            <input name="email" type="email" placeholder="Correo del usuario" />
            <input name="password" type="text" placeholder="Clave del usuario" />
            <button onClick={props.update}>Actualizar</button>
            <input type="submit" />
        </form>
    </div>
    );
}
