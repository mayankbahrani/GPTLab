import "./Chat.css";
import { useContext , useState , useEffect } from "react";
import { MyConext } from "./Mycontext.jsx";
import ReactMarkdown from "react-markdown";
import RehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function Chat(){
    const {newChat , prevChats , reply} = useContext(MyConext);
    const [latestReply , setLatestReply] = useState(null);
    useEffect(()=>{

        if(reply === null){
            setLatestReply(null);
            return;
        }
        if(!prevChats?.length) return;

        const content = reply.split(" ");

        let idx = 0;
        const interval = setInterval(()=>{
            setLatestReply(content.slice(0,idx+1).join(" "));
            idx++;
            if(idx>=content.length) clearInterval(interval);
        },40);

        return ()=>clearInterval(interval);



    } , [prevChats,reply]);

    return(
        <>


        {newChat && <h1>Start new chat now</h1>}
        <div className="chats">
            {
                prevChats?.slice(0,-1).map((chat,idx) =>
                    <div className={chat.role === "user"?"userdiv":"gptdiv"} key={idx}>
                        {
                            chat.role === "user"?
                            <p className="userMessage">{chat.content}</p>:
                            <ReactMarkdown rehypePlugins={[RehypeHighlight]}>{chat.content}</ReactMarkdown>
                        }
                    </div>
                )    
            }
            {
                prevChats.length>0 && latestReply !==null &&
                <div className="gptdiv" key={"typing"}>
                    <ReactMarkdown rehypePlugins={[RehypeHighlight]}>{latestReply}</ReactMarkdown>
                </div>
            }

            {
                prevChats.length>0 && latestReply ===null &&
                <div className="gptdiv" key={"non-typing"}>
                    <ReactMarkdown rehypePlugins={[RehypeHighlight]}>{prevChats[prevChats.length-1].content}</ReactMarkdown>
                </div>
            }

        </div>

        </>
    )
}

export default Chat;