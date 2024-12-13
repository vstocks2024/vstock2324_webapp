/* eslint-disable @typescript-eslint/no-unused-vars */
import { observer } from "mobx-react";
import { useContext, useEffect } from "react";
import { StoreContext } from "../../../store";
import * as fabric from "fabric";


export const Properties=observer(() => {
    const store = useContext(StoreContext);
    const handleInstanceType=()=>{
      console.log(store.canvas?.getActiveObject() instanceof fabric.FabricImage);
      const obj=store.canvas?.getActiveObject();
      if(obj===undefined) return;
      console.log(obj?.get("video_src"))
    //   if(obj===undefined) return;
    //  const copy_obj= Object.assign({},obj,{src:"https://uqmdwdzmfmvegzpietkc.supabase.co/storage/v1/object/public/vstock.bucket.1/admin_videos/moon.mp4"});
    //   console.log(copy_obj);
      
      
    }
  return (
    <div className="w-[19.8%] min-w-[250px] bg-[#202020]">
     <button onClick={handleInstanceType}>Properties</button>
      </div>
  )
});

