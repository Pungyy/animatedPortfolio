import {
  createContext,
} from "react";

import useTheme from "../hooks/useTheme";


const ThemeContext =
  createContext();



export function ThemeProvider({
  children,
}) {


  const theme =
    useTheme();



  return (

    <ThemeContext.Provider
      value={theme}
    >

      {children}

    </ThemeContext.Provider>

  );

}



export default ThemeContext;