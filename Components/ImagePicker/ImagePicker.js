'use client'
import { useRef, useState } from "react";
import classes from "./ImagePicker.module.css";
import Image from "next/image";

export default function ImagePicker({ label, name }) {


    const [imagePicker , setImagePicker] = useState()
    const imageref = useRef()

    function handlepicClick(){
        imageref.current.click()
    }

    function handlechangeimage(event){
      const file = event.target.files[0];

      if(!file){
          setImagePicker(null)
      }

      const fileReader =  new FileReader()

      fileReader.onload = () => {
        setImagePicker(fileReader.result)
        return;
      }

      fileReader.readAsDataURL(file)

    }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>

      <div className={classes.controls}>

      <div className={classes.preview}> 
          {!imagePicker && <p>No Image is Selected</p>}
          {imagePicker && <Image src={imagePicker} alt="Food Image" fill/>}
      </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png  image/jpeg"
          name={name}
          ref={imageref}
          onChange={handlechangeimage}
          required
        />
      </div>
      <button className={classes.button} type="button" onClick={handlepicClick} >
        Pick An Image
      </button>
    </div>
  );
}
