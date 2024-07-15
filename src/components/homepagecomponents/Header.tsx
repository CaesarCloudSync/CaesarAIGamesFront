import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { useState } from 'react';
export default function Header({gamewasadded,setGameWasDownloaded}:any){
    const [url,setURL] = useState("");
    const addgamedownload  = async () =>{
        if (url !== "" && url.includes("https")){
            const response = await axios.post(`http://raspberrypi.local:8080/api/v1/downloadgame`,{"url":url});
            let result = response.data
            let task_id = result.task_id
            let filename = result.filename
            let window_use:any = window
            //window_use.electron.store.delete("pendingdownload")
            let pendingdownload = window_use.electron.store.get("pendingdownload")
            if (pendingdownload){
                let filename_exists = pendingdownload.some((e:any) => e.filename == filename)
                if (filename_exists){
                    const new_pending_download = pendingdownload.filter((obj:any)=> obj.filename !== filename);
                    const old_task_id = pendingdownload.filter((obj:any)=> obj.filename === filename)[0].task_id;
                    //console.log("new_task_id",old_task_id)
                    const response = await axios.get(`http://raspberrypi.local:8080/cancel_task?task_id=${old_task_id}`)
                    let result = response.data
                    //console.log(result)
                    if ("message" in result){
                    new_pending_download.push({"filename":filename,"task_id":task_id})
                    window_use.electron.store.set({"pendingdownload":new_pending_download});
                    }
                    else{
                        alert(JSON.stringify(result))
                    }

                }
                else{
                    pendingdownload.push({"filename":filename,"task_id":task_id})
                    window_use.electron.store.set({"pendingdownload":pendingdownload});
                }

            }
            else{
                window_use.electron.store.set({"pendingdownload":[{"filename":filename,"task_id":task_id}]});
            }



            if (gamewasadded === true){
                setGameWasDownloaded(false);
            }
            else{
                setGameWasDownloaded(true);
            }
        }
        else{
            setURL("");
        }
        

    }
    return(
        <div className="flex flex-row border-0 border-indigo-600 h-12 p-5 gap-5">

        <div style={{backgroundColor:"#41befc",width:"45px",height:"45px",borderRadius:"5px",display:"flex",justifyContent:"center",alignItems:"center"}}>
           <a onClick={() =>{addgamedownload()}} style={{cursor:"pointer"}}><AddIcon style={{color:"white",fontSize:"30px"}} /></a>
        </div>
        <div style={{width:"100%"}}>
           <input onChange={(e) =>{setURL(e.target.value)}} value={url} className='placeholder-black' placeholder=' Enter Game Download url:' style={{position:"relative",top:"7px",height:"30px",borderRadius:"3px",width:"100%"}}></input>
        </div>
        



        </div>
    )
}