import {useState} from 'react';
import "../styles/globals.css";
import "../styles/index.css";
import "../styles/navbar.css";
import "../styles/footer.css";
import "../styles/auth.css";
import "../styles/sidebar.css";
import "../styles/statement.css";
import "../styles/chart.css";
import "../styles/preloader.css";
import "../styles/estimate.css";
import "../styles/settings.css";
import "../styles/request.css";
import "../styles/send.css";
import { TransProvider , TransContext } from "../context/transContext";


function MyApp({ Component, pageProps }) {
  const   [trans , setTrans] =  useState([])
  return(
  <TransContext.Provider value = {[trans , setTrans]}>
    <Component {...pageProps} />
  </TransContext.Provider>)
}

export default MyApp;
