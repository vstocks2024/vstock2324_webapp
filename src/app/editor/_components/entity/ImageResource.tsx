/* eslint-disable @typescript-eslint/no-unused-vars */


import { MdAdd } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoIosPricetag } from "react-icons/io";
import { StoreContext } from "@/store";
import { createClient } from "@/utils/supabase/client";
import { observer } from "mobx-react";
import { useContext, useEffect ,useState ,useRef } from "react";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";

type ImageResourceProps = {
    filename: string;
    };
export const ImageResource=observer(({filename}: ImageResourceProps)=>{
    const store=useContext(StoreContext);
    const router=useRouter();
    const supabase=createClient();
    const ref = useRef<HTMLImageElement>(null);
    const [resolution, setResolution] = useState({ w: 0, h: 0 });
    const { data } = supabase.storage
    .from(`${process.env.NEXT_PUBLIC_SUPABASE_BUCKET_NAME}`)
    .getPublicUrl(`${filename}`)
    if(!data) return (<></>);

   const handleAddImage=()=>{
    try{
        if(!store.canvas) return;
        store.addImage(data.publicUrl);
    }
    catch(error){
      console.log(error);
      throw error
    }
   }

   const handleDeleteImage=async()=>{
    try{
      const { data:{user} } = await supabase.auth.getUser();
      if(!user) return;
      console.log(user);
      const { data, error } = await supabase.storage
      .from(`${process.env.NEXT_PUBLIC_SUPABASE_BUCKET_NAME}`)
      .remove([`${filename}`])
      if(error) throw error;
      if(!data) return;
      console.log(data);
      router.refresh();
    }
    catch(error){
      console.log(error);
      throw error;
    }
    }

return (<><div className="rounded-lg  overflow-hidden items-center bg-slate-800 m-3 flex flex-col relative">
    <div className=" bg-transparent text-white py-1 absolute text-sm bottom-2 left-2">
      {resolution.w}x{resolution.h}
    </div>
    <button className="hover:bg-[#00a0f5] bg-transparent rounded z-10 text-white font-bold py-1 absolute text-lg top-2 left-2">
      <IoIosPricetag size={20} />
    </button>
    <button
      className="hover:bg-[#00a0f5] bg-transparent rounded z-10 text-white font-bold py-1 absolute text-lg top-2 right-2"
      onClick={handleDeleteImage}
    >
      <MdDelete size={20} />
    </button>
    <button
      className="hover:bg-[#00a0f5]  bg-transparent rounded z-10 text-white font-bold py-1 absolute text-lg bottom-2 right-2"
      onClick={handleAddImage}
    >
      <MdAdd size={20} />
    </button>

    <img
      onLoad={() => {
        setResolution({
          w: ref.current?.naturalWidth ?? 0,
          h: ref.current?.naturalHeight ?? 0,
        });
      }}
      crossOrigin='anonymous'
      ref={ref}
      className="w-[200px] aspect-auto"
      src={data.publicUrl}
      id={nanoid()}
    ></img>
  </div></>)
});