import React from 'react'
import { Context } from "./Context";
import { useContext, useState, useEffect } from "react";
import TableRender from './tableRender';
import axios from "axios";
import Protein from "./protein.jsx";
const DataSets = props => {
    const { interactiveTableData, setInteractiveTableData } = useContext(Context);
    const { zincLigand, setZincLigand } = useContext(Context)
    const {naturalProduct, setNaturalProduct} = useContext(Context)
    const {proteinDescription, setProteinDescription} = React.useContext(Context);
    const {uniProtId, setUniProtId} = React.useContext(Context);
    const {expMethodology, setExpMethodology} = React.useContext(Context);
    const {pdbId, setPdbId} = React.useContext(Context);
    const {sequenceLength, setSequenceLength} = React.useContext(Context);
    const {protein, setProtein} = useContext(Context)
    const [modelMax, setModelMax] = useState(10)
    const [model, setModel] = useState(1)
    const [toggleProtein, setToggle] = useState(0)
    console.log(toggleProtein)
    useEffect(() => {
        axios.get(`http://localhost:3001/number_of_models?complex=${naturalProduct}&protein=${protein}`).then((res) => {
          setModelMax(res.data.length_of_file - 1)
          console.log(res.data)
        });
        console.log("component reload");
      }, []);
    return(
        
        <div className='container' style={{color: "black"}}>
            <Protein
          geneName={protein}
          description={proteinDescription}
          uniprotId={uniProtId}
          methodology={expMethodology}
          pdbId={pdbId}
          sequenceLength={sequenceLength}
        />
            <iframe height="700" width="100%" src={`http://localhost:3001/complex_viewer?complex=${naturalProduct}&protein=${protein}&model=${model}&hide_protein=${toggleProtein}`} title="Ligand Viewer"></iframe>
            <label style={{color: "black"}} htmlFor="model">Select Model: </label> <br />
            <input value={model} onChange={(e) => setModel(e.target.value)} type="number" name="model" id="model" min={1} max={modelMax}/>
            <br />
            <label style={{color: "black"}} htmlFor="model">Hide protein: </label> <br />
            <input onClick={(e) => {e.target.checked ? setToggle(1): setToggle(0)}} type="checkbox" name="show" id="show" />
            
            <TableRender interactiveTableData={interactiveTableData}/>
            
            ]
        </div>
        
    )
}
export default DataSets