import{useState}from"react";
import AuthForm from "./components/AuthForm";
import ThemeToggle from "./components/ThemeToggle";
import "./App.css";



function theme(){
  const [theme,setTheme]=useState("light");


  const toggleTheme=()=>{
    setTheme(theme==="light"?"dark":"light");
  }


  return (
    <div className={`app ${theme}`}>
      <ThemeToggle theme={theme} toggleTheme={toggleTheme}/>
      <AuthForm/>
       </div>
  )
}

export default theme;