import { useEffect , useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserauth from "./global/userauth";
import useToken from "./global/token";
import axios from "axios";

export default function Signup() {
    const [formdata , saveformdata] = useState({
        username : "" , password : ""
    })

    const save_token = useToken((state) => state.save_token)
    const auth = useUserauth((state) => state.auth)


    if ( auth === true) {
        useNavigate('/')
    }

    const signup = async() => {
        if (formdata.username === "" || formdata.password === "" ) {
            return "please fill out the form"
        }
        try {
            const result = await axios.post('http://localhost:3000/signup' , formdata)

            if (result.status !== 200) {
                return "Something went wrong"
            }
            save_token(result.data)

        } catch(error) {
            console.error(error)
        }
    }


    return (<></>)
}