import './App.css'
import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import { MyConext } from './Mycontext.jsx';
import { useState } from 'react';
import {v1 as uuidv1} from 'uuid';


function App() {
  const [prompt,setprompt] = useState("");
  const [reply,setreply] = useState(null);
  const [currThreadId , setcurrThreadId]= useState(uuidv1);
  const [prevChats , setPrevChats] = useState([]);
  const [newChat , setnewChat] = useState(true);
  const [allThreads , setAllThreads] = useState([]);
  const providerValues = {prompt , setprompt , reply, setreply , currThreadId , setcurrThreadId , newChat , setnewChat , prevChats , setPrevChats , allThreads , setAllThreads};
  
  

  return (
    <div className='app'>
      <MyConext.Provider value={providerValues}>
        <Sidebar></Sidebar>
        <ChatWindow></ChatWindow>
      </MyConext.Provider>
      
      
    </div>
  )
}

export default App
