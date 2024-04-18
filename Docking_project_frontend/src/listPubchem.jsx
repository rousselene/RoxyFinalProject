import { useState } from "react";
import React from 'react'
import Table from "react-bootstrap/Table";

import pubchemUrl from './assetes/PUBCHEM.txt'
const Pubchem = (props) => {
    return (
        <div className="py-4 px-5 mx-auto bg-white mt-4 rounded" >
            <div>
            <object style={{scrollbarColor: '#007 #bada55'}} height={400} width={200} data={pubchemUrl}></object> 
            <div className="pt-4">
            <button style={{
                width: 172,
                backgroundColor: "#4682B4",
                color: "white",
              }}><a download style={{color: 'white'}}href={pubchemUrl}>Download Pubchem Ligand List</a></button>
              </div>
            </div>
            
        </div>
    );
};
export default Pubchem;
