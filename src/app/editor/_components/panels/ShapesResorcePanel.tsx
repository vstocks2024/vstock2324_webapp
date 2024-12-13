/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import * as  fabric  from "fabric";
import React, { useEffect, useRef } from 'react';
import { MdOutlineCircle } from "react-icons/md";
import { TbOvalVertical } from "react-icons/tb";
import { LuPencilLine } from "react-icons/lu";
import { FiOctagon } from "react-icons/fi";
import { MdPolyline } from "react-icons/md";
import { MdOutlineRectangle } from "react-icons/md";
import { IoTriangleOutline } from "react-icons/io5";
import { RiStarSLine } from "react-icons/ri";
import { FaRegSquareFull } from "react-icons/fa6";
import { LuHexagon } from "react-icons/lu";
import { MdOutlinePentagon } from "react-icons/md";
import { RiHexagonFill } from "react-icons/ri";
import { observer } from 'mobx-react';
import { StoreContext } from '@/store';
import { Store } from "@/store/Store";
import { nanoid } from "nanoid";

const SHAPES_OPTIONS = [
  {
    name: "Circle",
    icon: MdOutlineCircle,
    action:(store:Store)=>{
       if(!store || !store.canvas) return;
       store.addCircle(store.canvas);
    }
  },
  {
    name: "Ellipse",
    icon: TbOvalVertical,
    action:(store:Store)=>{
        if(!store || !store.canvas) return;
       store.addEllipse(store.canvas);
    }
  },
  {
    name: "Line",
    icon: LuPencilLine,
    action:(store:Store)=>{
        if(!store || !store.canvas) return;
             store.addLine(store.canvas);
            }
  },
  {
    name: "Pentagon",
    icon: MdOutlinePentagon,
    action:(store:Store)=>{
        if(!store || !store.canvas) return;
        store.addPolygon(store.canvas);

    }
  },
  {
    name: "PolyLine",
    icon: MdPolyline,
    action:(store:Store)=>{
        if(!store || !store.canvas) return;
         store.addPolyLine(store.canvas);
    }
  },
  {
    name: "Square",
    icon:  FaRegSquareFull,
    action:(store:Store)=>{
        if(!store || !store.canvas) return;
    store.addSquare(store.canvas);
  }
  },
  {
    name: "Rectangle",
    icon:  MdOutlineRectangle,
    action:(store:Store)=>{
        if(!store || !store.canvas) return;
   store.addRectangle(store.canvas);
  }
  },
  {
    name: "Triangle",
    icon:  IoTriangleOutline ,
    action:(store:Store)=>{
        if(!store || !store.canvas) return;
        store.addTriangle(store.canvas);

    }
  },
  {
    name: "Hexagon",
    icon:  RiHexagonFill,
    action:(store:Store)=>{
        if(!store || !store.canvas) return;
          store.addHexagon(store.canvas);
    }
  },
  {
    name: "Octagon",
    icon:  FiOctagon,
    action:(store:Store)=>{
        if(!store || !store.canvas) return;
        store.addOctagon(store.canvas);
    
    }
  },
  {
    name: "Star",
    icon:  RiStarSLine,
    action:(store:Store)=>{
      if(!store || !store.canvas) return;
  
    }
  }
];

export const ShapesResourcePanel = observer(() => {
  const store = React.useContext(StoreContext);


  return (
    <div className="items-center overflow-x-hidden overflow-y-auto justify-start flex flex-col py-2  px-0.5 w-[150px] h-[510px]">
      <div className='w-[100px] p-0.5'/>
      <div className='grid grid-cols-3 gap-2'>
       {SHAPES_OPTIONS.map((shape)=>{
        return (<><button
          key={nanoid()}
          onClick={() => {shape.action(store);}} className='p-2'><shape.icon size={24}/></button></>)
       })}
      </div>
    </div>
  )
});


