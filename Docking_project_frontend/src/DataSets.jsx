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

    const {gene, setGene} = useContext(Context)
    const [modelMax, setModelMax] = useState(10)
    const [model, setModel] = useState(1)
    const [toggleProtein, setToggle] = useState(0)
    const [toggle2, setToggle2] = useState("none")
    console.log(toggleProtein)
    useEffect(() => {
        axios.get(`http://localhost:3001/number_of_models?complex=${naturalProduct}&protein=${pdbId}`).then((res) => {
          setModelMax(res.data.length_of_file - 1)
          console.log(res.data)
        });
        console.log("component reload",interactiveTableData);
      }, []);
    return(
        
        <div className='container' style={{color: "black"}}>
            <Protein
          geneName={gene}
          description={proteinDescription}
          uniprotId={uniProtId}
          methodology={expMethodology}
          pdbId={pdbId}
          sequenceLength={sequenceLength}
        />
        <h3 className='fs-5 text-start'>User Submitted</h3>
            <iframe height="700" width="100%" src={`http://localhost:3001/complex_viewer?complex=${naturalProduct}&protein=${pdbId}&model=${model}&hide_protein=${toggleProtein}`} title="Ligand Viewer"></iframe>
            <label style={{color: "black"}} htmlFor="model">Select Model: </label> <br />
            <input value={model} onChange={(e) => setModel(e.target.value)} type="number" name="model" id="model" min={1} max={modelMax}/>
            <br />
            <label style={{color: "black"}} htmlFor="model">Hide protein: </label> <br />
            <input onClick={(e) => {e.target.checked ? setToggle(1): setToggle(0)}} type="checkbox" name="show" id="show" />
            <br></br>
            <label className="fs-5 text-start mt-4" style={{color: "blue"}} htmlFor="protein">Top Compounds that Docked to your Protein</label> <br />
            <input className="fs-5 text-start" onClick={(e) => {e.target.checked ? setToggle2("block"): setToggle2("none")}} type="checkbox" name="protein" id="protein" /> 
            <div style={{display: toggle2}}><TableRender interactiveTableData={interactiveTableData}/></div>
            
            
            
        </div>
        
    )
}
export default DataSets