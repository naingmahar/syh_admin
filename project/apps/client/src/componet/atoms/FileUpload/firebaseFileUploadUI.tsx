import React, { useEffect } from "react";
import "./file.css"
import { Icon, IconKey } from "../icons";
// import ImgPreview, { IconPreview } from "./ImagePreview";
import { RowContainer } from "../Container/FlexContainer";
import { EFileIcons } from "./FileIcon";
import { IconPreview } from "./ImagePreview";
import { FirebaseUploadFile } from "../../../utils/firebaseFileUpload";

interface FirebaseFileUploadUIProps {
    value?: {url:string}[];
    onChange: (value: string[]) => void;
    onFinshed:(message:string,isError:boolean)=>void;
    fieldName:string;
}   

const FirebaseFileUploadUI = (props:FirebaseFileUploadUIProps) => {

    const inputRef = React.useRef<React.LegacyRef<HTMLInputElement>| any>(null);
    const [dragActive, setDragActive] = React.useState(false);
    const [files,setFile] = React.useState<any[]>([])
    const [isUploading,setLoading] = React.useState(false)
    const [iconName,setIconName] = React.useState<EFileIcons>(EFileIcons.other)

    useEffect(()=>{
       if(props.value && props.value[0]) {
        setFile([props.value[0].url])
       }
    },[props.value])

  
    // handle drag events
    const handleDrag = function(e:any) {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    };


    // triggers when file is dropped
    const handleDrop = function(e:any) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        // handleFiles(e.dataTransfer.files);

        handleFiles(e.dataTransfer.files)
        }
    };


    const handleFiles = async (data:{length:number,0:any}) => {
        for (let index = 0; index < data.length; index++) {
            //@ts-ignore
            const element = data[index];
            const elementArr= String(element.type).split("/")
            const fileNameArr= String(element.name).split(".")

            let icon:EFileIcons = EFileIcons.other

            //@ts-ignore
            if(fileNameArr[fileNameArr.length -1] && EFileIcons[fileNameArr[fileNameArr.length -1]])  icon = fileNameArr[fileNameArr.length -1]
            //@ts-ignore
            else if(elementArr[1] && EFileIcons[elementArr[1]]) icon = elementArr[1]
            //@ts-ignore
            else if(elementArr[0] && EFileIcons[elementArr[0]]) icon = elementArr[0]

            setIconName(icon)


            setLoading(true);
            setFile([])
            FirebaseUploadFile(
                element,
                String(Date.now()),
                element.type.split("/")[0],
                (loadingPercent, downloadUrl, err) => {
                    if (err) {
                        console.error("Upload error:", err);
                        setLoading(false);
                        props.onFinshed("Failed Upload",true)
                    } else if (downloadUrl) {
                        console.log("File uploaded successfully. Download URL:", downloadUrl);
                        props.onChange([downloadUrl])
                        setPreviewImage(element);
                        setLoading(false)
                    } else {
                        console.log(`Upload is ${loadingPercent}% done`);
                    }
                }
            );

        }
    }

    // triggers when file is selected with click
    const handleChange = function(e:any) {
        e.preventDefault();
        console.warn("Hello")
        if (e.target.files && e.target.files[0]) {
        // at least one file has been selected so do something
        handleFiles(e.target.files);
        }
    };

    const setPreviewImage = (file:any) => {
        return new Promise((resolve,reject)=>{
            var reader = new FileReader();
            reader.onload = (e) => {
                // addImage(e.target?.result);
                setFile([e.target?.result])
                resolve(true)
                props.onFinshed("Successfully Uploaded",false)
            }
            reader.onerror = () => {
                props.onFinshed("Failed Upload",true)
                reject(false)
            } 
        reader.readAsDataURL(file);
        })
    }

    // const onRemoveImage = (delIndex:number) => {
    //     let temp:any[] = [];
    //     files.map((img,index)=>{
    //         if(index !== delIndex) temp.push(img)
    //     })
    //     setFile(temp)
    // }
  
    
    return (
        <div className="flex flex-1">
            <form id={"form-file-upload-"+props.fieldName} className={"form-file-upload"} onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
                <input ref={inputRef} type="file" id={"input-file-upload-"+props.fieldName} className="input-file-upload" multiple={true} onChange={(e)=>handleChange(e)} />
                <label 
                    id={"label-file-upload-"+props.fieldName} 
                    htmlFor={"input-file-upload-"+props.fieldName} 
                    className={dragActive ? "label-file-upload drag-active" : "label-file-upload" }>
                    <Icon icon={IconKey.addIcon} active />
                </label>
                { dragActive && <div className="drag-file-element" id={"drag-file-element-"+props.fieldName} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
            </form> 
            {
                files.map((_row,index)=>(
                    <IconPreview name={iconName} key={index} id={"form-file-upload-"+props.fieldName}/>
                    // <FileIcon name={iconName} />
                    //  <ImgPreview key={index}  url={url} onDelete={() => onRemoveImage(index)} />
                ))
            }
            {
                isUploading && (
                    <div id={"form-file-upload-"+props.fieldName} className="form-file-upload absolute bg-white bg-opacity-70">
                        <RowContainer className="justify-center items-center h-full border-2 rounded-xl">
                            <span className="loading loading-spinner loading-lg text-slate-500"></span>
                        </RowContainer>
                    </div>
                )
            }

        </div>
    )
}

export default FirebaseFileUploadUI