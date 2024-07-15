import { useNavigate } from "react-router-dom";
import Header from "./homepagecomponents/Header";
import { useEffect, useState } from "react";
import PendingDownload from "./homepagecomponents/PendingDownload";
export default function Home(){
    const navigate = useNavigate();
    const [gamewasadded,setGameWasDownloaded] = useState(false);
    const [pending_downloads,setPendingDownloads] = useState([])
    const getpendingdownloads =async () => {
        let window_use:any = window

        const pending_downloads = window_use.electron.store.get("pendingdownload");
        console.log(pending_downloads)
     
        if (pending_downloads){
            setPendingDownloads(pending_downloads)
        }
    }
    useEffect(() =>{
        getpendingdownloads();
    },[gamewasadded])

    return (
        <div >
            <Header gamewasadded={gamewasadded} setGameWasDownloaded={setGameWasDownloaded}/>
            <div style={{display:"flex",marginTop:30,padding:20,flexDirection:"column"}}>
                <h1 style={{color:"white",textDecoration:"underline",fontSize:"30px"}}>CaesarAIGame Downloads:</h1>
                {pending_downloads.length > 0&&
                pending_downloads.map((task) =>{
                    return(
                        <PendingDownload filename={task.filename} task_id={task.task_id} gamewasadded={gamewasadded} setGameWasDownloaded={setGameWasDownloaded}/>
                    )
                })
             
                }
            </div>

        

        
        </div>
    )
}