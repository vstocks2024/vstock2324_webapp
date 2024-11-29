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
    console.log(store.canvas);
  });

  return (
    <div className=" bg-[#202020] py-1 px-1  dark:bg-[#202020] flex ">
      <div className="justify-between items-center flex-row py-2 flex w-full">
        <div className="inline-flex flex-row px-5  items-center  justify-start w-full">
          <button className="w-10 h-10">
            <MdSave size={24} className="cursor-pointer" />
          </button>
          <button className="w-10 h-10">
            <MdFileDownload size={24} className=" cursor-pointer" />
          </button>
          <button className="w-10 h-10">
            <MdContentCut size={24} className=" cursor-pointer" />
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
            <MdLayers size={24} className="cursor-pointer" />
          </button>
        </div>
      </div>
    </div>
  );
});
