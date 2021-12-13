import React, { useState , createContext } from 'react'


// Fetch context
export const TransContext = createContext();

export const TransProvider = (props) =>{
   
 const   [trans , setTrans] =  useState([])
    return(
        <TransContext.Provider value = {[trans , setTrans   ``]}>
            {props.children}
        </TransContext.Provider>
    )
}