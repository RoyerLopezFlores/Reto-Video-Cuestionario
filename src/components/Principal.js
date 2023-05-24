import React, { useEffect, useState } from 'react'
import CardVideo from './CardVideo';
import ButtonPrincipal from './ButtonPrincipal';

export default function Principal({videos,changePage,completo}) {
    const [check,setCheck] = useState(false);
    useEffect(()=>{
        const verificar = videos.reduce((prev,curr)=>{
            return prev || (curr.status===1);
        },false);
        setCheck(verificar);
    },[videos])
  return (
    <>
        <h1>Video Cuestionario</h1>
        <div className='container-cards'>
            {videos.map( (v,i) => {
                return <CardVideo key={"cv_"+i} 
                    changePage={changePage} 
                    index={i} pregunta={v.pregunta} 
                    estado = {v.status} video={v}/>    
            })
            }
        
        </div>
        <div className='ctn-aling-right'>
            {completo?
            <ButtonPrincipal text={"Enviar"} onClick={()=>{alert("Enviado")}}/>:
            <ButtonPrincipal text={check?"Continuar":"Iniciar"} onClick={changePage}/>
            }
        </div>
    </>
    
  )
}
