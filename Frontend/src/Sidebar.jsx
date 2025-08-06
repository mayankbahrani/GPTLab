import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyConext } from "./Mycontext.jsx";
import {v1 as uuidv1} from 'uuid';


function Sidebar(){
    const {allThreads , setAllThreads , currThreadId , setprompt , setreply,setcurrThreadId,setPrevChats,setnewChat} = useContext(MyConext);

    const getAllThreads = async ()=>{
        try{
            const response = await fetch("http://localhost:8080/api/thread");
            const res = await response.json();
            const filteredData = res.map(thread => ({threadId: thread.threadId,title:thread.title}));
            setAllThreads(filteredData);
        }catch(err){
            console.log(err);
        }
    };

    useEffect(()=>{
        getAllThreads();
    } , [currThreadId])

    const newChat = ()=>{
        setnewChat(true);
        setprompt("");
        setreply(null);
        setcurrThreadId(uuidv1);
        setPrevChats([]);

    } 

    const changeThread = async(newThreadId)=>{
        setcurrThreadId(newThreadId);

        try{
            const response = await fetch(`http://localhost:8080/api/thread/${newThreadId}`);
            const res = await response.json();
            console.log(res);
            setPrevChats(res);
            setnewChat(false);
            setreply(null);
        }catch(err){
            console.log(err);

        }
    }

    const deleteThread = async(threadId)=>{
        try{
            const response = await fetch(`http://localhost:8080/api/thread/${threadId}` , {method:"DELETE"});
            const res = await response.json();

            //update thrads rerender
            setAllThreads(prev=>prev.filter(thread =>thread.threadId!=threadId));
            if(threadId === currThreadId){
                newChat();
            }
        

        }catch(err){
            console.log(err);
        }
    }


    return (
     <section className="sidebar">
       {/*button*/}
       <button onClick={newChat}>
        <img src="src/assets/blacklogo.png" className="logo"></img>
        <span><i className="fa-solid fa-pen-to-square"></i></span>
       </button>

       {/*history*/}
       <ul className="history">
        {
            allThreads?.map((thread , idx)=>(
                <li key={idx} onClick={(e) => changeThread(thread.threadId)}
                className={thread.threadId === currThreadId ? "highlighted": " "}>
                    {thread.title}
                    <i className="fa-solid fa-trash"
                        onClick={(e) =>{
                            e.stopPropagation();
                            deleteThread(thread.threadId);
                        }}></i>
                </li>
            ))
        }
       </ul>

       {/*sign*/}
       <div className="sign">
        <p>GPTLab by Mayank Bahrani</p>
       </div>
       

    </section>
    )
}

export default Sidebar;