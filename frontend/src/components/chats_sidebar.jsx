import axios from "axios"
import selectchat from "../global/selectchat"
import useToken from "../global/token";
import { useEffect, useState } from "react";

export default function Sidebar({ chathistory }) {
    const [userdata, saveuserdata ] = useState()
    const save_token = useToken((state) => state.token);
  const chatId = selectchat((state) => state.selectedChatId)
  const setSelectedChatId = selectchat((state) => state.setSelectedChatId)

  const handleSelectChat = (chatId) => {
    setSelectedChatId(chatId)
  }

  useEffect(() => {
   axios.defaults.headers.common['Authorization'] = `Bearer ${save_token}`; 
   axios.get('http://localhost:3000/auth/decyptToken').then((result) => {
    saveuserdata(result.data)
   },)
  },[])
if (chathistory !== undefined) {
    console.log(userdata)
    chathistory.map((value ) => (<div>
        {console.log(value)}
    </div>))
}

}