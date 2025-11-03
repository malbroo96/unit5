import React from "react";


const InputField=({type="text",placeholder="",value,onChange,name,style={}})=>{
    return(
        <input
         type={type}
         name={name}
         placeholder={placeholder} 
         value={value}
         onChange={onChange}
         style={{
            width:"100%",
            padding:"10px",
            marginBottom:"15px",
            borderRadius:"4px",
            border:"1px solid #ccc",
            fontSize:"16px",
            ...style,
         }}/>
    )
}

export default InputField;