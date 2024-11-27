import { Editor } from "../_components/Editor";

export default function EditorIDPage({params}:{params:{id:string}}){
    console.log(params.id);
    return <>
     <Editor/>
         </>
}