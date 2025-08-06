import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyConext } from "./Mycontext.jsx";
import { useContext, useState , useEffect } from "react";
import {ScaleLoader} from "react-spinners";

function ChatWindow(){ 
    const {prompt , setprompt , reply , setreply , currThreadId ,prevChats , setPrevChats , setnewChat}  = useContext(MyConext);
    const [loading , setloading] = useState(false);
    

    const getReply = async()=>{
        setloading(true);
        setnewChat(false);
        console.log("prompt:", prompt);
        console.log("currThreadId:", currThreadId);
        const options = {
            method : "POST",
            headers: {
                "Content-type":"application/json"
            },
            body: JSON.stringify({
                message:prompt,
                threadId: currThreadId
            })

        };

        try{
            const response = await fetch("http://localhost:8080/api/chat", options);
            const res = await response.json();
            console.log(res);
            setreply(res.reply);
        
        }catch(err){
            console.log(err);
        }
        setloading(false);
    }

//append new chat to prevChats
    useEffect(()=>{
        if(prompt && reply){
            setPrevChats(prevChats =>(
                [...prevChats,{
                    role:"user",
                    content:prompt
                },{
                    role:"assistant",
                    content:reply
                }]
            ));
        }
        setprompt("");
  
    },[reply]);

    return(
    <div className="chatwindow">
        <div className="navbar">
            <span>GPTLab</span>
        </div>

        <Chat></Chat>
        <ScaleLoader color="#fff" loading={loading}></ScaleLoader>

        <div className="chatinput">
            <div className="inputbox">
                <input placeholder="Ask anything" value = {prompt}
                   onChange={(e)=>setprompt(e.target.value)}
                   onKeyDown={(e)=>e.key === 'Enter'? getReply():''} >
                   
                </input>
                <div id="submit" onClick={getReply}><i className="fa-solid fa-arrow-up"></i></div>
            </div>
            
            
            <p className="info">GPTLab can make mistakes. Check important info. See Cookie Preference</p>
            

        </div>
        
    </div>
    )
}

export default ChatWindow;