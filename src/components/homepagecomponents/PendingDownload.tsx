import axios from "axios";
import { useEffect, useState } from "react"
export default function PendingDownload({filename,task_id,gamewasadded,setGameWasDownloaded}:any){
    const [progress,setProgress] = useState("");
    const getprogress =async () => {
        const response = await axios.post("http://192.168.1.11:8080/tasks",{"task_id":task_id,"filename":filename})
        let result = response.data
        let progress = result.progress
        //console.log(progress,"hello")
        setProgress(progress)
    }
    const canceltask =async () => {
        const response = await axios.get(`http://192.168.1.11:8080/cancel_task?task_id=${task_id}`)
        let result = response.data
        if ("message" in result){
            let window_use:any = window
            let pendingdownload = window_use.electron.store.get("pendingdownload")
            if (pendingdownload){
                let filename_exists = pendingdownload.some((e:any) => e.filename == filename)
                if (filename_exists){
                    const new_pending_download = pendingdownload.filter((obj:any)=> obj.filename !== filename);
    
                    window_use.electron.store.set({"pendingdownload":new_pending_download});
                    
                   
    
                }
                if (gamewasadded === true){
                    setGameWasDownloaded(false);
                }
                else{
                    setGameWasDownloaded(true);
                }
    
            }

        }
        else{
            alert(JSON.stringify(result))
        }




    }
    useEffect(() => {
        const intervalID = setInterval(async () =>  {
            getprogress();
        }, 1000);
    
        return () => clearInterval(intervalID);
    }, []);
    return(
        <div style={{color:"white"}}>

        
        
           <p> {filename} : {task_id} - {progress !== "" && progress}%</p>
           <div style={{width:"300px",height:"10px",backgroundColor:"grey",borderRadius:"5px"}}>
                <div style={{width:`${progress}%`,height:"10px",backgroundColor:"#41befc",borderRadius:"5px"}}>

                </div>
            </div>
                <a onClick={() =>{canceltask()}} style={{cursor:"pointer"}}>Cancel</a>
        </div>
    )
}