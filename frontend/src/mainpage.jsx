import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import { useNavigate } from "react-router-dom";

import useUserauth from "./global/userauth";
import useToken from "./global/token";

import Sidebar from "./components/sidebar";

export default function App_page() {
    const navigate = useNavigate();
    const [chatdata, savechatdata] = useState()
    const save_token = useToken((state) => state.token);
    const auth = useUserauth((state) => state.auth);

    const auth_false = useUserauth((state) => state.auth_false);

    useEffect(() => {
        const decode = jwtDecode(save_token)
        if (Date.now() > decode.exp * 1000) {
            auth_false()
            navigate("/login");
        }
    }, [])

}