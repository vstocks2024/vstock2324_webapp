import { StoreContext } from "../../../store";
import { observer } from "mobx-react";
import { VideoResourcesPanel } from "../_components/panels/VideoResourcePanel";
import { IoMdArrowBack } from "react-icons/io";
import React from "react";
import { ImageResourcePanel } from "../_components/panels/ImageResourcePanel";
import { AudioResourcesPanel } from "./panels/AudioResourcePanel";
import { ShapesResourcePanel} from "./panels/ShapesResorcePanel";
import { AssetsResourcesPanel } from "./panels/AssetsResourcePanel";

export const Resources = observer(() => {
  const store = React.useContext(StoreContext);
  const selectedMenuOption = store.selectedMenuOption;
  return (<div className=" hidden min-[977px]:flex min-[977px]:flex-col min-[977px]:justify-start w-auto max-w-[250px] h-full  bg-[#303030]" >
      <div className=" inline-flex items-center flex-row h-10 bg-black  justify-between">
        <h3 className="m-1 p-1 font-bold text-[14px]">{store.selectedMenuOption}</h3>
        <button onClick={()=>{store.selectedMenuOption=null}} className=" m-0.5 p-0.5">
          <IoMdArrowBack size={24}/>
        </button>
        </div>
      {selectedMenuOption === "Video" ? <VideoResourcesPanel /> : null}
      {selectedMenuOption === "Images" ? <ImageResourcePanel /> : null }
      {selectedMenuOption === "Audio" ? <AudioResourcesPanel/> : null }
      {selectedMenuOption === "Shapes" ? <ShapesResourcePanel/> :null}
      {selectedMenuOption === "Assets" ? <AssetsResourcesPanel/> :null}
    </div>
  );
});
