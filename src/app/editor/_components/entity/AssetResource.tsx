/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React from "react";
import { StoreContext } from "../../../../store";
import { formatTimeToMinSec } from "../../../../utils";
import { observer } from "mobx-react";
import { MdAdd } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoIosPricetag } from "react-icons/io";
import { nanoid } from "nanoid";
import { createClient } from "@/utils/supabase/client";

type VideoResourceProps = {
filename: string;
};
export const AssetResource = observer(
  ({filename}: VideoResourceProps) => {
    const supabase=createClient();
    const { data } = supabase.storage.from(`${process.env.NEXT_PUBLIC_SUPABASE_BUCKET_NAME}`).getPublicUrl(`admin_videos/${filename}`)
    const store = React.useContext(StoreContext);
    const ref = React.useRef<HTMLVideoElement>(null);
    const [formatedVideoLength, setFormatedVideoLength] =React.useState("00:00");

  
    return (
      <div className="rounded-lg  bg-slate-800 my-2 mx-1 flex flex-col items-center justify-start relative">
        <div className="bg-transparent text-white py-1 absolute  text-sm bottom-2 left-2">
          {formatedVideoLength}
          </div>
           <button className="hover:bg-[#00a0f5]  rounded z-10 text-white font-bold py-1 absolute text-lg top-2 right-2  bg-transparent">
            <IoIosPricetag size={20}/>
          </button>
        <button
          className="hover:bg-[#00a0f5] bg-transparent rounded z-10 text-white font-bold py-1 absolute text-lg bottom-2 right-2"
          onClick={() => {store.addVideo(store.canvas,data.publicUrl)}}>
          <MdAdd size={20} />
        </button>
        <video
          onLoadedData={() => {
            const videoLength = ref.current?.duration ?? 0;
            setFormatedVideoLength(formatTimeToMinSec(videoLength));
            
          }}
          crossOrigin='anonymous'
          ref={ref}
          className='aspect-auto rounded-md transition-all w-[225px]'
          src={data.publicUrl}
          id={nanoid()}
          muted
          onMouseOver={()=>
          {
            ref.current?.play();
          }}
          onMouseOut={()=>
          {
            ref.current?.pause();
          }}
          ></video>
      </div>
    );
  }
);



