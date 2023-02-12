import React from "react";
import { useEffect, useRef, useState, useContext } from "react";
import axios from "axios";

import TableRender from "./tableRender.jsx";
import { createPortal } from "react-dom";
import { Tab } from "bootstrap";
import { Context } from "./Context";
import { useNavigate } from "react-router-dom";
const Interactive = (props) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState();
  const [proteinData, setProteinData] = React.useState([]);
  const [dataLoaded, setDataLoaded] = React.useState(true);

  const { proteinDescription, setProteinDescription } =
    React.useContext(Context);
  const { uniProtId, setUniProtId } = React.useContext(Context);
  const { expMethodology, setExpMethodology } = React.useContext(Context);
  const { pdbId, setPdbId } = React.useContext(Context);
  const { sequenceLength, setSequenceLength } = React.useContext(Context);

  const [tableData, setTableData] = React.useState([]);
  const [affinityMin, setAffinityMin] = React.useState(0);
  const [affinityMax, setaffinityMax] = React.useState(-100);
  const [filter, setFilter] = React.useState(10);
  const { naturalProduct, setNaturalProduct } = React.useContext(Context);
  const { databaseType, setDatabaseType } = React.useContext(Context);
  const { protein, setProtein } = React.useContext(Context);
  const { gene, setGene } = React.useContext(Context);

  const [currentPdbId, setCurrentPdbId] = React.useState("");
  const [currentGene, setCurrentGene] = React.useState("");

  const { interactiveTableData, setInteractiveTableData } =
    React.useContext(Context);

  function pubchemHandler() {
    if (PubChemLigand === "none") {
    }
  }

  function setProteinInformation() {
    console.log('click', currentGene, currentPdbId)

    if (currentPdbId != "" && currentGene == "") {
      
      axios
      .get(
        `http://localhost:3001/specificProtein?pdbId=${pdbId}`
      )
      .then((res) => {
        var responseObj = res.data[0];
        
        setPdbId(responseObj.pdb_id);
        setGene(responseObj["Gene name"] || responseObj["Gene"]);
        setUniProtId(responseObj.uniprot_id);
        setSequenceLength(responseObj["Sequence length"]);
        setExpMethodology(
          responseObj["Experimetal methodoly"] ||
            responseObj["Experimental methodology"]
        );
        setProteinDescription(responseObj.Description);
        axios
          .get(
            `http://localhost:3001/table?protein=${responseObj.pdb_id}&limit=${filter}&min_affinity=${affinityMin}&max_affinity=${affinityMax}`
          )
          .then((res) => {
            console.log(res.data)
            setInteractiveTableData(res.data);
            navigate("/datasets");
          });
      });
  }
  if (currentGene != "" && currentPdbId == "") {
    axios
    .get(
      `http://localhost:3001/specificProtein?gene=${gene}`
    )
    .then((res) => {
      var responseObj = res.data[0];
      console.log(res)
      setPdbId(responseObj.pdb_id);
      setGene(responseObj["Gene name"] || responseObj["Gene"]);
      setUniProtId(responseObj.uniprot_id);
      setSequenceLength(responseObj["Sequence length"]);
      setExpMethodology(
        responseObj["Experimetal methodoly"] ||
          responseObj["Experimental methodology"]
      );
      setProteinDescription(responseObj.Description);
      axios
        .get(
          `http://localhost:3001/table?protein=${responseObj.pdb_id}&limit=${filter}&min_affinity=${affinityMin}&max_affinity=${affinityMax}`
        )
        .then((res) => {
          console.log(res.data)
          setInteractiveTableData(res.data);
          navigate("/datasets");
        });
    });
  }
    }

    
    
    

 /* function zincHandler() {
    axios
      .get(
        `http://localhost:3001/table?protein=${protein}&limit=${filter}&min_affinity=${affinityMin}&max_affinity=${affinityMax}`
      )
      .then((res) => {
        console.log(
          `http://localhost:3001/table?protein=${protein}&limit=${filter}&min_affinity=${affinityMin}&max_affinity=${affinityMax}`
        );
        console.log(res);
        setInteractiveTableData(res.data);
        navigate("/datasets");
      });
  } */
  /*useEffect(() => {
        // When container is ready
        if (true) {
          // Create window
          newWindow.current = window.open(
            "",
            "",
            "width=600,height=400,left=200,top=200"
          );
          // Append container
          newWindow.current.document.body.appendChild(<TableRender tableData = {tableData}/>);
    
          // Save reference to window for cleanup
          const curWindow = newWindow.current;
    
          // Return cleanup function
          return () => curWindow.close();
        }
      }, [tableData]); */
 // useEffect(() => {
 //   axios.get("http://localhost:3001/proteins").then((res) => {
//    setProteinData(res.data);
//      setProtein(res.data[0].pdb_id);
//      setDataLoaded(true);
//    });
//    console.log("component reload");
 // }, []);

 function setCurrentGenes(e) {
    console.log(currentGene, gene, e.target.value)
    setCurrentGene(e.target.value)
    setGene(e.target.value)
 }
 function setCurrentPdbIds(e) {
  console.log(currentPdbId, pdbId, e.target.value)
  setCurrentPdbId(e.target.value)
  setPdbId(e.target.value)
}


  return (
    <>
      <div class="grid row">
        <div class="grid col">
          <div class="m-2" id="proteinSelection">
            <form>
              <h1 className="fs-5">
                Select a <u>RECEPTOR</u> Protein
              </h1>
              <br></br>
              <div
                className="m-2 row justify-content-center"
                id="nameSelection"
              >
                <div className="mt-n4 col d-flex justify-content-end">
                  <div>
                    <span style={{ display: "inline-block" }}>
                      <label for="min" style={{ display: "block" }}>
                        Gene Name
                      </label>
                      <input
                        size="15"
                        id="commonName"
                        onChange={(e) => setCurrentGenes(e)}
                        type="text"
                      ></input>
                    </span>
                  </div>
                </div>
                or
                <div class="mt-n4 col d-flex justify-content-start">
                  <div>
                    <span style={{ display: "inline-block" }}>
                      <label for="pdbId" style={{ display: "block" }}>
                        PDB ID
                      </label>

                      <input
                        size="15"
                        id="pdbId"
                        onChange={(e) => setCurrentPdbIds(e)}
                        type="text"
                      ></input>
                    </span>
                  </div>
                </div>
              </div>
              <br></br>
              <h3 className="fs-5">Select a <u>LIGAND</u> Database</h3>
              <br></br>
              <label class="radio-inline mx-2">
                <input
                  checked
                  onClick={(e) => setDatabaseType(e.target.id)}
                  type="radio"
                  id="Pubchem"
                  name="database"
                  className="mx-2"
                />
                Pubchem
              </label>
              <label class="radio-inline mx-2">
                <input
                  onClick={(e) => setDatabaseType(e.target.id)}
                  type="radio"
                  id="Zinc"
                  name="database"
                  className="mx-2"
                />
                Zinc
              </label>
            </form>
            <br></br>
            <label htmlFor="radio"></label>
            <br></br>
            <label htmlFor="input">Enter Compound:</label>{" "}
            <input
              onChange={(e) => setNaturalProduct(e.target.value)}
              type="search"
              name="zincligand"
              id="ligand"
            />
          </div>
          <br></br>
          <p className="text-black">or</p>
          <div class="m-2" id="filter">
            <label>Show Top: </label>{" "}
            <span style={{ display: "inline-block" }}>
              
              <input
                onChange={(e) => setFilter(e.target.value)}
                type="number"
                min="0"
                max="100"
                step="1"
                placeholder="10"
                defaultValue="10"
                id="top"
                size="4"
              ></input>
            </span>
          </div>
          <br></br>
          <div
            className="m-2 row justify-content-center"
            id="affinitySelection"
          >
            <p style={{ color: "black" }}>Binding Affinity:</p>
            <div className="mt-n4 col d-flex justify-content-end">
              <div>
                <span style={{ display: "inline-block" }}>
                  <label for="min" style={{ display: "block" }}>
                    Min
                  </label>
                  <input
                    size="4"
                    id="min"
                    onChange={(e) => setAffinityMin(-e.target.value)}
                    type="number"
                    min="1"
                    max="100"
                    placeholder="1"
                  ></input>
                </span>
              </div>
            </div>

            <div class="mt-n4 col d-flex justify-content-start">
              <div>
                <span style={{ display: "inline-block" }}>
                  <label for="max" style={{ display: "block" }}>
                    Max
                  </label>

                  <input
                    size="4"
                    id="max"
                    onChange={(e) => setaffinityMax(-e.target.value)}
                    type="number"
                    min="1"
                    max="13"
                    placeholder="13"
                  ></input>
                </span>
              </div>
            </div>
          </div>
          
          <div className="p-3">
            <div>
              <button
                style={{ width: 128 }}
                onClick={(e) =>
                  setOpen(true) &
                  e.preventDefault() &
                  //zincHandler(e) &
                  setProteinInformation() &
                  console.log(tableData)
                }
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Interactive;
