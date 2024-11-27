/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React from "react";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import { AudioResource } from "../entity/AudioResource";
import { UploadButton } from "../shared/UploadButton";


export const AudioResourcesPanel = observer(() => {
  const store = React.useContext(StoreContext);
  

  return (
    <>
    <div className="items-center overflow-x-hidden overflow-y-auto justify-start flex flex-col py-2  px-0.5 w-[250px] h-[510px]">
    <UploadButton
        accept="audio/mp3,audio/*"
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold text-center mx-2 py-2 px-4 rounded"
        onChange={()=>{}}/>
    <div className="p-0.5  w-full">
     
    </div>
    </div>
    </>
  );
});
