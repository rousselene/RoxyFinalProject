import { useState } from "react";
import React from 'react'
import Table from "react-bootstrap/Table";
import zincURL from '../assetes/ZINC.txt'
const Zincs = (props) => {
    return (
        <div className="py-4 px-5 mx-auto bg-white mt-4 rounded" >
            <div>
            <object style={{scrollbarColor: '#007 #bada55'}} height={400} width={200} data={zincURL}></object> 
            <div className="pt-4">
            <button style={{
                width: 172,
                backgroundColor: "#4682B4",
                color: "white",
              }}><a download style={{color: 'white'}}href={zincURL}>Download Zinc Ligand List</a></button>
              </div>
            </div>
            
        </div>
    );
};
export default Zincs;
