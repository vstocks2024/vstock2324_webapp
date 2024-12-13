/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useEffect } from "react";
import { observer } from "mobx-react";
import { StoreContext } from "../../../store";

import {
  MdSave,
  MdFileDownload,
  MdContentCut,
  MdOutlineContentCopy,
  MdContentPaste,
  MdUndo,
  MdRedo,
  MdPlayArrow,
  //   MdPause,
  // MdFullscreen,
  MdDelete,
  MdLayers,
  MdHistory,
} from "react-icons/md";

export const MainPart = observer(() => {
  const store = useContext(StoreContext);
 
 const data= {
    "version": "6.5.1",
    "objects": [
        {
            "cropX": 0,
            "cropY": 0,
            "type": "Image",
            "version": "6.5.1",
            "originX": "left",
            "originY": "top",
            "left": 264,
            "top": 28,
            "width": 564,
            "height": 653,
            "fill": "rgb(0,0,0)",
            "stroke": null,
            "strokeWidth": 0,
            "strokeDashArray": null,
            "strokeLineCap": "butt",
            "strokeDashOffset": 0,
            "strokeLineJoin": "miter",
            "strokeUniform": false,
            "strokeMiterLimit": 4,
            "scaleX": 0.3546,
            "scaleY": 0.3546,
            "angle": 0,
            "flipX": false,
            "flipY": false,
            "opacity": 1,
            "shadow": null,
            "visible": true,
            "backgroundColor": "",
            "fillRule": "nonzero",
            "paintFirst": "fill",
            "globalCompositeOperation": "source-over",
            "skewX": 0,
            "skewY": 0,
            "src": "https://uqmdwdzmfmvegzpietkc.supabase.co/storage/v1/object/public/vstock.bucket.1/user_images/359691ac-e281-42a3-8e30-7c6bd089c347/2.jpg_1732512605883",
            "crossOrigin": "anonymous",
            "filters": []
        },
        {
            "cropX": 0,
            "cropY": 0,
            "type": "Image",
            "version": "6.5.1",
            "originX": "left",
            "originY": "top",
            "left": 44,
            "top": 33,
            "width": 740,
            "height": 740,
            "fill": "rgb(0,0,0)",
            "stroke": null,
            "strokeWidth": 0,
            "strokeDashArray": null,
            "strokeLineCap": "butt",
            "strokeDashOffset": 0,
            "strokeLineJoin": "miter",
            "strokeUniform": false,
            "strokeMiterLimit": 4,
            "scaleX": 0.2703,
            "scaleY": 0.2703,
            "angle": 0,
            "flipX": false,
            "flipY": false,
            "opacity": 1,
            "shadow": null,
            "visible": true,
            "backgroundColor": "",
            "fillRule": "nonzero",
            "paintFirst": "fill",
            "globalCompositeOperation": "source-over",
            "skewX": 0,
            "skewY": 0,
            "src": "https://uqmdwdzmfmvegzpietkc.supabase.co/storage/v1/object/public/vstock.bucket.1/user_images/359691ac-e281-42a3-8e30-7c6bd089c347/bd-1.jpeg_1732349988394",
            "crossOrigin": "anonymous",
            "filters": []
        },
        {
            "cropX": 0,
            "cropY": 0,
            "type": "Image",
            "version": "6.5.1",
            "originX": "left",
            "originY": "top",
            "left": 164,
            "top": 32,
            "width": 2000,
            "height": 2000,
            "fill": "rgb(0,0,0)",
            "stroke": null,
            "strokeWidth": 0,
            "strokeDashArray": null,
            "strokeLineCap": "butt",
            "strokeDashOffset": 0,
            "strokeLineJoin": "miter",
            "strokeUniform": false,
            "strokeMiterLimit": 4,
            "scaleX": 0.1,
            "scaleY": 0.1,
            "angle": 0,
            "flipX": false,
            "flipY": false,
            "opacity": 1,
            "shadow": null,
            "visible": true,
            "backgroundColor": "",
            "fillRule": "nonzero",
            "paintFirst": "fill",
            "globalCompositeOperation": "source-over",
            "skewX": 0,
            "skewY": 0,
            "src": "https://uqmdwdzmfmvegzpietkc.supabase.co/storage/v1/object/public/vstock.bucket.1/user_images/359691ac-e281-42a3-8e30-7c6bd089c347/8932107.jpg_1732349993769",
            "crossOrigin": "anonymous",
            "filters": []
        }
    ],
    "background": "#333333"
}


  const handleCopyObject=()=>{
    if(!store.canvas) return;
    if(store.canvas===undefined) return;
    store.setCopy(store.canvas);
    }

  const handlePasteObject=()=>{
    if(!store.canvas) return;
    if(store.canvas===undefined) return;
    store.setPaste(store.canvas);
  }

  useEffect(() => {
    
  },[]);

  return (
    <div className=" bg-[#202020] py-1 px-1  dark:bg-[#202020] flex ">
      <div className="justify-between items-center flex-row py-2 flex w-full">
        <div className="inline-flex flex-row px-5  items-center  justify-start w-full">
          <button className="w-10 h-10">
            <MdSave onClick={()=>console.log(store.canvas?.toJSON())} size={24} className="cursor-pointer" />
          </button>
          <button className="w-10 h-10">
            <MdFileDownload onClick={()=>store.canvas?.loadFromJSON(data)}  size={24} className="cursor-pointer" />
          </button>
          <button className="w-10 h-10">
            <MdContentCut size={24} className="cursor-pointer" />
          </button>
          <button
            className="w-10 h-10"
            onClick={handleCopyObject}
          >
            <MdOutlineContentCopy className=" cursor-pointer" size={24} />
          </button>
          <button className="w-10 h-10" onClick={handlePasteObject}>
            <MdContentPaste size={24} className=" cursor-pointer" />
          </button>
          <button onClick={()=>console.log(store.canvas?.toObject())}  className="w-10 h-10">
            <MdUndo size={24} className=" cursor-pointer" />
          </button>
          <button onClick={()=>console.log(store.canvas?.toJSON())} className="w-10 h-10">
            <MdRedo size={24} className=" cursor-pointer" />
          </button>
          <button className="w-10 h-10">
            <MdHistory size={24} className="cursor-pointer" />
          </button>
        </div>
        <div className="inline-flex flex-row items-center  justify-end  w-full">
          <button onClick={()=>store.removeObject(store.canvas)} className="w-10 h-10">
            <MdDelete size={24} className="cursor-pointer" />
          </button>
          <button className="w-10 h-10">
            <MdPlayArrow onClick={()=>store.sendObjectStepWiseBackward(store.canvas)} size={24} className="cursor-pointer"></MdPlayArrow>
          </button>
          <button className="w-10 h-10">
            <MdLayers onClick={()=>store.bringObjectForward(store.canvas)} size={24} className="cursor-pointer" />
          </button>
        </div>
      </div>
    </div>
  );
});
