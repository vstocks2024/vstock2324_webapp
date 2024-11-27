export type UploadButtonProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  accept: string;
};
export const UploadButton = (props: UploadButtonProps) => {
  return (
    <label htmlFor="fileInput" className={`${props.className} text-center py-2 px-1 m-1 rounded-md cursor-pointer hover:bg-[#DDDDDD] bg-[#CCCCCC] text-black w-[90%]`}>
      <input
        id="fileInput"
        type="file"
        accept={props.accept}
        className="hidden"
        onChange={props.onChange}/>
      Upload
    </label>
  );
};
