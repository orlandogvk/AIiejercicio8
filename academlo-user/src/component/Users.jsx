import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

export default function Users(props){
    return(
    <div>
        <h1>{props.title}</h1>
        <Container>
            <Row  xs={2} md={4} lg={6}>
                <Col xs={12} lg={12}>
                    <Form onInput={props.input} onSubmit={props.newUser}>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridName">
                            <Form.Label>Nombre</Form.Label>
                                <Form.Control name="name" type="text" placeholder="Nombre del usuario" />  
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridLastName">
                            <Form.Label>Apellido</Form.Label>
                                <Form.Control name="lastname" type="text" placeholder="Apellido del usuario" />  
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>E-mail</Form.Label>
                                <Form.Control name="email" type="email" placeholder="Correo del usuario" />  
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridLastName">
                            <Form.Label>Contraseña</Form.Label>
                                <Form.Control name="password" type="password" placeholder="Clave del usuario" />  
                            </Form.Group>
                        </Form.Row>
                        <Button variant="primary" type="submit">
                            Agregar
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    </div>
    );
}
