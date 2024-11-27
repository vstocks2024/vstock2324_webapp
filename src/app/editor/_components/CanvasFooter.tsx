/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useEffect  } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { StoreContext } from "../../../store";
import { BsPlusCircleFill } from "react-icons/bs";
import { observer } from "mobx-react";

export const CanvasFooter = observer(() => {
  const store = useContext(StoreContext);

  const handleCanvasIncrement=()=>store.incrementCanvasSize(store.canvas);
  const handleCanvasDecrement=()=>store.decrementCanvasSize(store.canvas);
  
  
  useEffect(()=>{
  
  },[])

  return (
    <div className="bg-[#151515] relative w-full">
      <button
        className={`absolute flex min-[960px]:hidden -top-[calc(50%-10px)]  left-[calc(50%-20px)]`}
      >
        <BsPlusCircleFill color="#2E67DD" size={40} />
      </button>
      <div className="flex flex-row items-center justify-end px-1">
        <div className="flex flex-row items-center justify-center m-0.5 gap-x-2">
          <button onClick={handleCanvasDecrement}>
            <FaMinus size={18} />
          </button>
          <div className="inline-flex flex-col gap-y-1 outline-none appearance-none focus:outline-none border-b m-0.5 p-0.5 items-center justify-between">
            <h5 className="text-gray-100 text-[10px] text-start w-full m-0.5 px-1">
              Zoom
            </h5>
            <select
              defaultValue={100}
              className="text-[10px]"
            >
              <option value={25}>25%</option>
              <option value={50}>50%</option>
              <option value={75}>75%</option>
              <option value={100}>100%</option>
              <option value={125}>125%</option>
              <option value={150}>150%</option>
              <option value={175}>175%</option>
              <option value={200}>200%</option>
              <option value={250}>250%</option>
              <option value={300}>300%</option>
            </select>
          </div>
          <button onClick={handleCanvasIncrement}>
            <FaPlus size={18} />
          </button>
        </div>
      </div>
    </div>
  );
});
