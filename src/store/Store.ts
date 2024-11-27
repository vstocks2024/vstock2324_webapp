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
        if(!this.canvas)  return ;
        const w = Number(this.canvas.width) + 10 ;
        const h= w * 0.5625; 
        this.canvas.setWidth(w);
        this.canvas.setHeight(h);
      }
      decrementCanvasSize(canvas: fabric.Canvas | undefined){
        this.canvas=canvas;
        if(!this.canvas) return;
        const w = Number(this.canvas.width) - 10 ;
        const h= w * 0.5625; 
        this.canvas.setWidth(w);
        this.canvas.setHeight(h)
      }
      addVideo(url:string){
        if(!this.canvas) return;
        const video1El = document.createElement('video');
        const video1source = document.createElement('source');
        
      video1El.id=nanoid()
      video1El.width = 775.11;
      video1El.height = 436;
      video1El.id = 'video1'
      video1El.muted = true;
      video1El.appendChild(video1source);

      video1source.src = url;
      video1El.onended = () => video1El.play();
      const video1 = new fabric.FabricImage(video1El, {
        left: 0,
        top: 0,
        angle: 0,
        originX:'left',
        originY:'top',
        objectCaching: false,
      });
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
        console.log(url);
      }
}