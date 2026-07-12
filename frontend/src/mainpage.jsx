import {  useEffect , useState } from "react";
import Signup from "./signup";
import useUserauth from "./global/userauth";
import useToken from "./global/token";
import axios from "axios";
import Sidebar from "./components/chats_sidebar";

export default function App_page() {
    const [chatdata , savechatdata] = useState([])
    const save_token = useToken((state) => state.token);
    const auth = useUserauth((state) => state.auth);

    useEffect(() => {
        getallchathistory().then((res) => {
            savechatdata(res)
        })
    },[])

    const getallchathistory = async() => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${save_token}`;
        const result = axios.get("http://localhost:3000/chat/findallchat")
        return result
    }

    return(<>
    <div>
        <Sidebar chathistory={chatdata}></Sidebar>
    </div>
    </>)


}