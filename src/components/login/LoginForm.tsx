import React from "react";
import {Button, Form} from 'react-bootstrap';
import { PostLogin } from "../ApiHandler";

interface LoginFormProps {
    setErrorAlert: React.Dispatch<React.SetStateAction<{
        show: boolean;
        content: string;
    }>>;
    setLoginUser: React.Dispatch<React.SetStateAction<{
      username: string;
      token: string;
  }>>;
  }

export const LoginForm : React.FC<LoginFormProps> = ({ setErrorAlert,setLoginUser }) => {

    const [user, setUser] = React.useState({
        username: "",
        password: "",
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response = await PostLogin(user);
        if(response.success){            
            localStorage.setItem('loggedUser', JSON.stringify({username: user.username, token: response.token}));
            setLoginUser({username: user.username, token: response.token});
        }else{
            setErrorAlert({show: true, content: response.error});
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