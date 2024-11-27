/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { StoreContext } from '@/store';
import { observer } from 'mobx-react'
import { useContext, useEffect } from 'react';
import * as fabric from 'fabric';


export const MainCanvas = observer(() => {
  const store=useContext(StoreContext);
  const data = {
    "objects": [
        {
            "src": "https://uqmdwdzmfmvegzpietkc.supabase.co/storage/v1/object/public/vstock.bucket.1/admin_videos/asset-01.webm",
            "top": "0",
            "fill": "rgb(0,0,0)",
            "left": "0",
            "name": "a5fac216-e95b-4838-a1dd-6cbf7e5723cd.67opi9dylvs",
            "type": "image",
            "angle": "0",
            "cropX": "0",
            "cropY": "0",
            "flipX": "false",
            "flipY": "false",
            "skewX": "0",
            "skewY": "0",
            "width": "775.11",
            "height": "436.00",
            "scaleX": "1",
            "scaleY": "1",
            "opacity": "1",
            "originX": "left",
            "originY": "top",
            "version": "5.3.0",
            "visible": "true",
            "fillRule": "nonzero",
            "cropWidth": "0",
            "video_src": "https://uqmdwdzmfmvegzpietkc.supabase.co/storage/v1/object/public/vstock.bucket.1/admin_videos/asset-01.webm",
            "cropHeight": "0",
            "paintFirst": "fill",
            "crossOrigin": "anonymous",
            "disableCrop": "false",
            "strokeWidth": "0",
            "strokeLineCap": "butt",
            "strokeUniform": "false",
            "strokeLineJoin": "miter",
            "backgroundColor": "",
            "strokeDashOffset": "0",
            "strokeMiterLimit": "4",
            "globalCompositeOperation": "source-over"
        },
        {
            "src": "https://uqmdwdzmfmvegzpietkc.supabase.co/storage/v1/object/public/vstock.bucket.1/admin_videos/asset-02.webm",
            "top": "0",
            "fill": "rgb(0,0,0)",
            "left": "0",
            "name": "7fc2fe3e-f970-4188-a3e8-f724dc8a7b2b.5mtqafyx7yn",
            "type": "image",
            "angle": "0",
            "cropX": "0",
            "cropY": "0",
            "flipX": "false",
            "flipY": "false",
            "skewX": "0",
            "skewY": "0",
            "width": "775.11",
            "height": "436.00",
            "scaleX": "1",
            "scaleY": "1",
            "opacity": "1",
            "originX": "left",
            "originY": "top",
            "version": "5.3.0",
            "visible": "true",
            "fillRule": "nonzero",
            "cropWidth": "0",
            "video_src": "https://uqmdwdzmfmvegzpietkc.supabase.co/storage/v1/object/public/vstock.bucket.1/admin_videos/asset-02.webm",
            "cropHeight": "0",
            "paintFirst": "fill",
            "crossOrigin": "anonymous",
            "disableCrop": "false",
            "strokeWidth": "0",
            "strokeLineCap": "butt",
            "strokeUniform": "false",
            "strokeLineJoin": "miter",
            "backgroundColor": "",
            "strokeDashOffset": "0",
            "strokeMiterLimit": "4",
            "globalCompositeOperation": "source-over"
        }
    ],
    "version": "5.3.0",
    "background": "#242728"
};

const handleFetchData=async()=>{
  if(!store.canvas) return;
  const video1El = document.createElement('video');
  const video1source = document.createElement('source');
video1El.width = 480;
video1El.height = 360;
video1El.id = 'video1'
video1El.muted = true;
video1El.appendChild(video1source);
video1source.src = 'https://uqmdwdzmfmvegzpietkc.supabase.co/storage/v1/object/public/vstock.bucket.1/admin_videos/asset-01.webm';
video1El.onended = () => video1El.play();
const video1 = new fabric.FabricImage(video1El, {
  left: 200,
  top: 300,
  angle: -15,
  originX: 'center',
  originY: 'center',
  objectCaching: false,
});
store.canvas.add(video1);
video1El.play();
}


useEffect(()=>{
  handleFetchData();
  // return ()=>{}
})
  return (<>
    <div className='relative flex flex-col items-center justify-center bg-black w-full border border-white'>
    <canvas id='lower-canvas' className="absolute border border-green-400"></canvas>
    </div>
    </>)
});

