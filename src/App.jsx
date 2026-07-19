import {
  useEffect,
  useState,
} from "react";


import Router from "./router";

import Loader from "./components/ui/Loader";



export default function App() {


  const [loading, setLoading] = useState(true);



  useEffect(() => {


    const timer = setTimeout(() => {

      setLoading(false);

    }, 1500);



    return () => clearTimeout(timer);


  }, []);




  if (loading) {

    return <Loader />;

  }




  return <Router />;

}