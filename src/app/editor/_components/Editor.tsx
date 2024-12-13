"use client"
import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { StoreContext } from '@/store';
import  * as fabric  from 'fabric';
import { MainCanvas } from './MainCanvas';
import { MainPart } from './MainPart';
import { Menu } from './Menu';
import { Properties } from './Properties';
import { CanvasFooter } from './CanvasFooter';
import { Resources } from './Resources';
import { BackCustomize } from './BackCustomize';

export const Editor = observer(() => {
    const store = React.useContext(StoreContext);
    const handleMouseDown=(e:fabric.TPointerEventInfo<fabric.TPointerEvent>)=>{
      if (!e.target) {
        store.setSelectedElement(undefined);
      }
   }
    
    useEffect(() => {
      const canvas = new fabric.Canvas("lower-canvas", {
          height: store.height,
          width: store.width,
          backgroundColor: "#242832",
          preserveObjectStacking:true,
        });
        fabric.FabricObject.prototype.transparentCorners = true;
    
        fabric.FabricObject.prototype.cornerStyle = "rect";
    
        fabric.FabricObject.prototype.cornerSize = 14;
        canvas.on("mouse:down",handleMouseDown);
    
        store.setCanvas(canvas);
    
        fabric.util.requestAnimFrame(function render() {
          canvas.renderAll();
          fabric.util.requestAnimFrame(render);
        });
      
        return ()=>{
          canvas.off("mouse:down",handleMouseDown);
          // canvas.dispose();

        }
      }, []);

        
    
  return (<>
    <div className='flex flex-col w-full h-screen'>
    <BackCustomize/>
    <MainPart/>
    <div className='flex flex-row w-full h-[510px] relative'>
      <Menu/>
      {store.selectedMenuOption===null ? null :<Resources/>}
    <MainCanvas/>
    <Properties/>
    </div>
    <CanvasFooter/>
    </div>
    </>
  )
});

