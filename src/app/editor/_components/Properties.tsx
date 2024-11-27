/* eslint-disable @typescript-eslint/no-unused-vars */
import { observer } from "mobx-react";
import { useContext, useEffect } from "react";
import { StoreContext } from "../../../store";


export const Properties=observer(() => {
    const store = useContext(StoreContext);
    useEffect(()=>{
        console.log(store.backgroundColor);
    })
  return (
    <div className="w-[19.8%] min-w-[250px] bg-[#202020]">Properties</div>
  )
});

