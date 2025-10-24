function ThemeToggle({theme,toggleTheme}){
    return(
        <button className="theme-btn"onClick={toggleTheme}>
            {theme==="light"?"light":"dark"}
        </button>
    )
}

export default ThemeToggle