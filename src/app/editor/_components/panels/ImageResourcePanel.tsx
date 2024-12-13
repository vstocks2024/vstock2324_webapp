/* eslint-disable @typescript-eslint/no-unused-vars */
import { observer } from "mobx-react";
import { UploadButton } from "../shared/UploadButton";
import {useEffect,useContext } from "react";
import { createClient } from "@/utils/supabase/client";
import { StoreContext } from "@/store";
import { ImageResource } from "../entity/ImageResource";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";


export const ImageResourcePanel=observer(()=>{
  const store = useContext(StoreContext);
  const supabase = createClient();
async function init(){
  try{
    console.log("Hello");
    store.setImages([]);
  const { data:{user} } = await supabase.auth.getUser();
  if(!user) return;
  const { data, error } = await supabase.schema(`storage`).from(`objects`).select("*").eq("owner_id",user?.id);
  if(error)  throw error;
  if(!data) return;
  console.log("Data ka length",data.length);
  data.forEach((file)=>{
    store.addImageResource(file.name);
  })
  } catch (error) {
    console.log(error);
  }
} 

const handleImageUpload=async(event:React.ChangeEvent<HTMLInputElement>)=>{
    const file=event.target.files?.[0];
    if(!file) return;
    const { data:{user} } = await supabase.auth.getUser();
    if(!user) redirect("/auth");
    const { data, error } = await supabase.storage.from(`${process.env.NEXT_PUBLIC_SUPABASE_BUCKET_NAME}`).upload(`user_images/${user.id}/${Date.now()}_${file.name.split(".")[0]}`, file, {
    upsert: false
  })
  if(error){
    console.log(error);
    throw error;
  } 
  init();
} 
useEffect(()=>{
    init();
    console.log(store.images);
},[])

return (<>
     <div className="items-center overflow-x-hidden overflow-y-auto justify-start flex flex-col py-2  px-0.5 w-[250px] h-[510px]">
          <UploadButton
        accept="image/*"
        className="uploadbutton"
        onChange={handleImageUpload}
      />
      <div className="p-0.5  w-full">
   {
    store.images.map((image)=>{
      return <><ImageResource key={nanoid()} filename={image}/></>
    })
   }
      </div>
    </div>
 </>);
});