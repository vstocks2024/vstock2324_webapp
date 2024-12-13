import { makeAutoObservable } from "mobx";
import * as fabric  from "fabric";
import { MenuOption } from "../utils/types";
import { nanoid } from "nanoid";


export class Store{
    canvas: fabric.Canvas | undefined;
    width:number;
    height:number;
    images:string[];
    videos:string[];
    selectedElement: fabric.FabricImage | fabric.FabricObject | fabric.FabricText | undefined;
    backgroundColor:string;
    selectedMenuOption: MenuOption;
    _clipboard:fabric.FabricObject | undefined;
    constructor(){
        this.canvas=undefined;
        this.width=775;
        this.height=436;
        this.images=[];
        this.videos=[];
        this.backgroundColor="#333333";
        this.selectedMenuOption = null;
        this._clipboard=undefined;
        this.selectedElement=undefined;
        makeAutoObservable(this);
    }
    setCanvas(canvas: fabric.Canvas | undefined) {
        this.canvas = canvas;
        if (canvas) {
          canvas.backgroundColor = this.backgroundColor;
        }
      }
      setSelectedMenuOption(selectedMenuOption: MenuOption) {
        this.selectedMenuOption = selectedMenuOption;
      }
      
      setSelectedElement(canvas: fabric.Canvas | undefined){
        this.canvas=canvas;
        if(this.canvas===undefined)  return;
        this.selectedElement=this.canvas.getActiveObject();

      }
      addImageResource(image:string){
        this.images=[...this.images,image];
      }
      setImages(images:string[]){
        this.images=images;
      }
      addVideoResource(video:string){
        this.videos=[...this.videos,video];
      }
      setVideos(videos:string[]){
        this.videos=videos;
      }
      incrementCanvasSize(canvas: fabric.Canvas | undefined){
        this.canvas=canvas;
        if(this.canvas===undefined)  return ;
        const w = Number(this.canvas.width)*1.03 ;
        const h= w * 0.5625; 
        this.canvas.setWidth(w);
        this.canvas.setHeight(h);
        
      }
      decrementCanvasSize(canvas: fabric.Canvas | undefined){
        this.canvas=canvas;
        if(!this.canvas) return;
        const w = Number(this.canvas.width)*0.97 ;
        const h= w * 0.5625; 
        this.canvas.setWidth(w);
        this.canvas.setHeight(h);
      }
      addVideo(canvas: fabric.Canvas | undefined,url:string){
        this.canvas=canvas;
        if(!this.canvas) return;
        const video1El = document.createElement('video');
        const video1source = document.createElement('source');
      video1El.id=nanoid();
      video1El.muted = true;
      video1El.width=200;
      video1El.height=125;
      video1El.appendChild(video1source);
      video1source.src = url;
      video1El.onended = () => video1El.play();
      const video1 = new fabric.FabricImage(video1El,{
        left: 0,
        top: 0,
        angle: 0,
        originX:'left',
        originY:'top',
        objectCaching: false,
        width:video1El.videoWidth,
        height:video1El.videoHeight,
     
      });
      video1._controlsVisibility={
        bl: true,
        br: true,
        mb: false,
        ml: false,
        mr: false,
        mt: false,
        tl: true,
        tr: true,
        mtr: true,
    }

    this.canvas.add(video1);
    video1El.play();
      
    }
      
      setCopy(canvas: fabric.Canvas | undefined){
        this.canvas=canvas;
        if(!this.canvas) return;
        if(!this.canvas.getActiveObject()) return;
        this.canvas.getActiveObject()?.clone().then((cloned) => {
        this._clipboard = cloned;
      });
    }
     async setPaste(canvas: fabric.Canvas | undefined){
        this.canvas=canvas;
        if(!this.canvas) return;
        if(!this._clipboard) return;

        const clonedObj = await this._clipboard.clone();
        this.canvas.discardActiveObject();
        clonedObj.set({
          left: clonedObj.left + 10,
          top: clonedObj.top + 10,
          evented: true,
        });
        if (clonedObj instanceof fabric.ActiveSelection) {
          // active selection needs a reference to the canvas.
          clonedObj.canvas = canvas;
          if(!this.canvas) return;
          clonedObj.forEachObject((obj) => {
            this.canvas?.add(obj);
          });
          // this should solve the unselectability
          clonedObj.setCoords();
        } else {
          this.canvas.add(clonedObj);
        }
        this._clipboard.top += 10;
        this._clipboard.left += 10;
        this.canvas.setActiveObject(clonedObj);
        this.canvas.requestRenderAll();
      }
      addImage(url:string){
        const image1El = document.createElement("img");
        image1El.src=url;
        image1El.id=nanoid();
        image1El.crossOrigin="anonymous";
        image1El.onload=()=>{
          if(!this.canvas) return;
        const image1 = new fabric.FabricImage(image1El, {
          left: 0,
          top: 0,
          angle: 0,
          originX:'left',
          originY:'top',
          objectCaching: false,
          width:image1El.naturalWidth,
          height:image1El.naturalHeight,
          
        });
        image1.scaleToWidth(200);
        image1.scaleToHeight(200*(image1El.naturalHeight/image1El.naturalWidth));
        this.canvas.add(image1);
        }
      }
      addTextbox(canvas:fabric.Canvas | undefined){
        this.canvas=canvas;
        if(!this.canvas) return;
        const fabrictextbox=new fabric.FabricText("Start Typing",{
          left:0,
          top:0,
          angle:0,
          fontSize:70,
          fill:"white",
        })
        this.canvas?.add(fabrictextbox);
      }
      removeObject(canvas:fabric.Canvas | undefined){
        this.canvas=canvas;
        if(!this.canvas) return;
        const objArray=this.canvas.getActiveObjects();
        objArray.forEach((obj)=>{
          this.canvas?.remove(obj)
          console.log(this.canvas?.getObjects());
        })
      }
      sendObjectBackward(canvas:fabric.Canvas | undefined){
        this.canvas=canvas;
        if(!this.canvas) return;
        const selectedObject=this.canvas.getActiveObject();
        if(selectedObject===undefined) return;
        this.canvas.sendObjectToBack(selectedObject)
      }
      sendObjectStepWiseBackward(canvas:fabric.Canvas | undefined){
        this.canvas=canvas;
        if(!this.canvas) return;
        const selectedObject=this.canvas.getActiveObject();
        if(selectedObject===undefined) return;
        this.canvas.sendObjectBackwards(selectedObject);
      }
      bringObjectForward(canvas:fabric.Canvas | undefined){
        this.canvas=canvas;
        if(!this.canvas) return;
        const selectedObject=this.canvas.getActiveObject();
        if(selectedObject===undefined) return;
        this.canvas.bringObjectToFront(selectedObject);
       }

       addCircle(canvas:fabric.Canvas | undefined){
        this.canvas=canvas;
        if(!this.canvas) return;
        const circle=new fabric.Circle({
          left:100,
          top:100,
          originX:"left",
          originY:"top",
          radius:100,
          fill:'green', 

        })
        this.canvas.add(circle);
       }

       addEllipse(canvas:fabric.Canvas | undefined){
        this.canvas=canvas;
        if(!this.canvas) return;
        const ellipse=new fabric.Ellipse({ 
          rx:60,
          ry:30,
          fill:"red",
          left: 100, top: 100,
          includeDefaultValues: true,
         })
         this.canvas.add(ellipse);
       }

       addLine(canvas:fabric.Canvas | undefined){
        this.canvas=canvas;
        if(!this.canvas) return;
        const line= new fabric.Line([100,50,200,250],{
          stroke:"blue",
          strokeWidth:3,
          includeDefaultValues: true,
        })
        this.canvas.add(line);
       }
        
       addPolygon(canvas:fabric.Canvas | undefined){
        this.canvas=canvas;
        if(!this.canvas) return;
        const pentagon = new fabric.Polygon([ 
          { x: 200, y: 10 }, 
          { x: 250, y: 50 }, 
          { x: 250, y: 180}, 
          { x: 150, y: 180}, 
          { x: 150, y: 50 }], { 
              fill: 'red' ,
              includeDefaultValues: true,
          });
          this.canvas.add(pentagon); 
       }

       addPolyLine(canvas:fabric.Canvas | undefined){
        this.canvas=canvas;
        if(!this.canvas) return;
        const polyline = new fabric.Polyline([ 
          { x: 200, 
              y: 10 }, 
          {x: 250, 
              y: 50 
          }, { 
              x: 250, 
              y: 180 
          }, { 
              x: 150, 
              y: 180 
          }, { 
              x: 150, 
              y: 50 
          }, { 
              x: 200, 
              y: 10 }], { 
              stroke: 'green',  
              strokeWidth: 2,  
              
              includeDefaultValues: true,
   
          }); 
          this.canvas.add(polyline);
      }

      addSquare(canvas:fabric.Canvas | undefined){
        this.canvas=canvas;
        if(!this.canvas) return;
        const square = new fabric.Rect({
          top: 100, left: 100, width: 125, height: 125, fill: 'blue', 
          includeDefaultValues: true,
        });
        square._controlsVisibility = {
            bl: true,
            br: true,
            mb: false,
            ml: false,
            mr: false,
            mt: false,
            tl: true,
            tr: true,
            mtr: true,
          };
        this.canvas.add(square);
      }
      addRectangle(canvas:fabric.Canvas | undefined){
        this.canvas=canvas;
        if(!this.canvas) return;
        const rect = new fabric.Rect({
          top: 100, left: 100, width: 120, height: 60, fill: 'green',
          includeDefaultValues: true, });
        this.canvas.add(rect);
    
      }

      addTriangle(canvas:fabric.Canvas | undefined){
        this.canvas=canvas;
        if(!this.canvas) return;
        const triangle = new fabric.Triangle({
          width: 60, height: 90, fill: 'blue', left: 50, top: 50,
          includeDefaultValues: true,
        });
        this.canvas.add(triangle);
      }

     addHexagon(canvas:fabric.Canvas | undefined){
      this.canvas=canvas;
      if(!this.canvas) return;
      const hexagon = new fabric.Polygon(
        [
           { x: 50, y: 0 },
           { x: 25, y: 43.30},
           { x: -25, y: 43.301 },
           { x: -50, y: 0},
           { x: -25, y: -43.301},
           { x: 25, y: -43.301 },
        ],
        {
           fill: "blue",
           left: 140,
           top: 10,
        }
     );
      this.canvas.add(hexagon);
    
     }
     addOctagon(canvas:fabric.Canvas | undefined){
      this.canvas=canvas;
      if(!this.canvas) return;
      const octagon = new fabric.Polygon(
        [
           { x: -37.282, y: 90 },
           { x: 37.282, y: 90 },
           { x: 90, y: 37.282 },
           { x: 90, y: -37.282 },
           { x: 37.282, y: -90 },
           { x: -37.282, y: -90 },
           { x: -90, y: -37.282 },
           { x: -90, y: 37.282 },
        ],
        {
           stroke: "white",
           left: 110,
           top: 10,
           strokeWidth: 1,
           strokeLineJoin:"bevel"
        } 
     );
     this.canvas.add(octagon);
     }

}