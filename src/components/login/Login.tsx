import React from "react";
import "../../App.css";
import { Navbar, Container, Alert } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

interface LoginFormProps {
    setAlertShow: React.Dispatch<React.SetStateAction<boolean>>;
    setLogin: React.Dispatch<React.SetStateAction<boolean>>;
  }

const LoginForm : React.FC<LoginFormProps> = ({ setAlertShow,setLogin }) => {

    const [user, setUser] = React.useState({
        username: "",
        password: "",
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(user.username === "admin" && user.password === "admin"){
            setLogin(true);
        }else{
            setAlertShow(true);
        }
            
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value,
        });
    };

    return(
    <Form onSubmit={handleSubmit}>

      <Form.Group className="mb-3">
        <Form.Label>Usuario</Form.Label>
        <Form.Control type="text" name="username" placeholder="Usuario" onChange={handleChange}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control type="password" name="password" placeholder="Constraseña" onChange={handleChange}/>
      </Form.Group>
      
      <Button variant="outline-light" type="submit">
        Enviar
      </Button>
    </Form>

    );
}


interface LoginProps {
    setLogin: React.Dispatch<React.SetStateAction<boolean>>;
  }


export const Login : React.FC<LoginProps> = ({ setLogin }) => {
    const [show, setShow] = React.useState(false);
    return (
        <div className="bdy">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Libros Silvestres</Navbar.Brand>
            </Container>
            </Navbar>
            <div className="sign-in-box">
                <Alert variant="danger" show={show} onClose={() => setShow(false)} dismissible>
                    Usuario o contraseña incorrectos
                </Alert>
                <h1>Login</h1>
                <LoginForm setAlertShow={setShow} setLogin={setLogin}/>
            </div>
        </div>
    );
}
