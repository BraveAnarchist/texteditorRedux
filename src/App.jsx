import { useReducer, useState } from "react"
  let output="";
export default function App(){

  function inputReducer(state,action){
    if(action.type== "text"){
      return {...state, value: action.payload }
    }
    if(action.type== "upper"){
      return {value: state.value.toUpperCase()}
    }
    else if(action.type== "lower"){
      return {value: state.value.toLowerCase()}
    }
    else if(action.type== "clear"){
      return {value: ""}
    }
    else if(action.type== "copy"){
      return {value: ""};
    }
    else if(action.type== "remove"){
      let temp = state.value.split(" ");
      let result = "";
      temp.forEach((item) => {
        if (item.length > 0) {
          result += item;
          result += " ";
        }
      });
      return {value: result.trim()};
    }
  }


  const [input,dispatch]=useReducer(inputReducer,{value:""});
  const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode state

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark"); // Add/remove the 'dark' class to the body
   
  };

  output=input.value;
  return (<>
    <div>
      <h1 style={{textAlign:"center",marginTop:"4vh"}}>TextUtis - Word Counter, Charecter Counter, Remove Extra Space</h1>

      <button style={{ padding: "1vh" }} onClick={toggleDarkMode}>
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
      
      <label htmlFor="here" style={{display:"block",marginTop:"7vh" , marginBottom:"3vh",marginLeft:"16vw"}}><b>Enter Your Text Here:</b></label>
      <textarea name="" value={input.value} onChange={(e)=>{dispatch({type:"text", payload:e.target.value})}} id="here" style={{width:"70%",margin:"0 auto",display:"block",height:"30vh"}}></textarea>
      <div style={{display:"flex",gap:"1vw",marginLeft:"15vw",marginTop:"4vh"}}><button style={{padding:"1vh",background:"#5c9bf8",border:"none",borderRadius:"5px"}} onClick={(e)=>{dispatch({type:"upper"})}}>Convert Uppercase</button>
      <button style={{padding:"1vh",background:"#5c9bf8",border:"none",borderRadius:"5px"}} onClick={(e)=>{dispatch({type:"lower"})}}>Convert Lowercase</button>
      <button style={{padding:"1vh",background:"#e37680",border:"none",borderRadius:"5px"}} onClick={()=>dispatch({type:"clear"})}>Clear Text</button>
      <button style={{padding:"1vh",background:"#64ab8a",border:"none",borderRadius:"5px"}} onClick={()=>{navigator.clipboard.writeText(output); dispatch({type:"copy"})}}>Copy To Clipboard</button>
      <button style={{padding:"1vh",background:"#5c9bf8",border:"none",borderRadius:"5px"}} onClick={()=>dispatch({type:"remove"})}>Remove Extra </button></div>

      <h2 style={{marginTop:"4vh",marginBottom:"2vh",marginLeft:"15vw"}}>Summery Of Your Text</h2>
      <p style={{marginLeft:"15vw",marginBottom:"2vh"}}>Number of words : {input.value.split(" ").length}</p>
      <p style={{marginLeft:"15vw",marginBottom:"2vh"}}>Number of charecters : {input.value.length}</p>
      <p style={{marginLeft:"15vw",marginBottom:"3vh"}}>Reading Time : {(input.value.split(" ").length * 0.4*1000)/1000}</p>

      <h2 style={{textAlign:"center"}}>Preview Document</h2>
      <textarea name="" disabled value={output} id="here" style={{width:"70%",margin:"0 auto",display:"block",height:"10vh"}}></textarea>
    </div>
    <div className="here" style={{background:isDarkMode?"#1b1b1b":"#9ee8ff"}}></div>
    <div className="here2" style={{background:isDarkMode?"#5c5c5c":"#f1f1f1"}}></div>
    </>
  )
}