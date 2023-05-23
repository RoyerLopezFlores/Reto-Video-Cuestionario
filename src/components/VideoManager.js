
import React, { useEffect,useRef, useState } from 'react'
import {getSupportedMimeTypes,iniciarConfig} from '../res/VideoFunctions';
const mimeType = getSupportedMimeTypes()[1];
const options = {mimeType};
let mediaRecorder;
let recordedBlobs = [];
export default function VideoManager() {
    const video = useRef(null);
    const videoRepro = useRef(null);
    const [isMostrar,setIsMostrar] = useState(false);
    
    const [iniciar,setIniciado] = useState(false);
    
    useEffect( ()=>{
        console.log(video,videoRepro);
        console.log(mimeType);
    },[]);
    
    const startVideo = async () =>{
        
        const curr = video.current;
        
        if(!iniciar){
            const correct = await iniciarConfig(curr);
            setIniciado(correct);
            
        }
        
        try{
            mediaRecorder = new MediaRecorder(window.stream, options);
            recordedBlobs = [];
        }catch (e){
            console.log(e);
            return;
        }
        mediaRecorder.onstop = (evt) =>{
            console.log('Recorder stopped: ', evt);
            console.log('Recorded Blobs: ', recordedBlobs);
        }
        mediaRecorder.ondataavailable = (evt) =>{
            console.log('handleDataAvailable', evt);
            if(evt.data && evt.data.size>0){
                recordedBlobs.push(evt.data);
            }
        }
        mediaRecorder.start();
        videoRepro.current.pause();

        setIsMostrar(false);
        console.log('MediaRecorder started', mediaRecorder);
        
    }
    const stopVideo = () =>{
        mediaRecorder.stop();
        console.log("QUeee");
    }
    const reproducirVideo = () =>{
        setIsMostrar(true);
        const superBuffer = new Blob(recordedBlobs,{type: mimeType});
        const curr = videoRepro.current;
        curr.srcObject = null;
        curr.src = null;
        curr.src = URL.createObjectURL(superBuffer);
        video.current.pause();
        //curr.src = window.URL.createObjectURL(superBuffer);
        //curr.play();
    }
    return (
    <div id="container">
    
    <video id="gum" ref={video} 
    playsInline={true} autoPlay={true}  muted
    style={{width:'100%', aspectRatio:'16/9',
    display:(isMostrar?"none":"block")}}
    ></video>
    <video ref={videoRepro} 
    playsInline={true} autoPlay={true} loop
    style={{width:'100%', aspectRatio:'16/9',
    display:(!isMostrar?"none":"block")}}
    ></video>
    
    
    

    <div>
        <button id="start" onClick={startVideo}>Start camera</button>
        <button onClick={stopVideo}>Detener</button>
        <button onClick={reproducirVideo}>Reproducir</button>
        <button id="record" disabled>Start Recording</button>
        <button id="play" disabled>Play</button>
        <button id="download" disabled>Download</button>
    </div>

    

    <div>
        <span id="errorMsg"></span>
    </div>
    </div>
  )
}
