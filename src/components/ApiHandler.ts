import {User} from '../types'

const HOST = "localhost";//process.env.REACT_APP_HOST
const API_PORT = 3001;//process.env.REACT_APP_API_PORT

let TOKEN = "";

export const setToken = (token:string) => {
    TOKEN = token;
}

export const GetPeople = async (type:string) => {
    // type =  'autor' || 'ilustrador' ?tipo=${type}
    
    const URL = `http://${HOST}:${API_PORT}/persona?tipo=${type}`;
    try{
        const response = await fetch(URL,{
            method: "GET",
            headers: {"Authorization": TOKEN,
        }});
        const data = await response.json();
        return data;
    }catch(error){
        console.log(error);
    }
}
/*
export const GetLibro = async (isbn) => {

    
    const URL = `http://${HOST}:${API_PORT}/libro/${isbn}`;
    try{
        const response = await fetch(URL);
        const data = await response.json();
        return data;
    }catch(error){
        console.log(error);
    }
}
*/

export const PostLogin = async (user:User)  => {
    const URL = `http://${HOST}:${API_PORT}/user/login`;
    try{
        const response = await fetch(URL, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {"Content-type": "application/json; charset=UTF-8"}
            });

        const data = await response.json();
        return data;
    }catch(error){
        console.log(error);
    }
}

export const DeletePerson = async (id:number) => { 
    const URL = `http://${HOST}:${API_PORT}/persona/${id}`;
    try{
        const response = await fetch(URL, {
            method: "DELETE",
            headers: {"Content-type": "application/json; charset=UTF-8",
                      "Authorization": TOKEN}
            });
        const data = await response.json();
        return data;
    }catch(error){
        console.log(error);
    }
} 