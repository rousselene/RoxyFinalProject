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
  const [filter, setFilter] = React.useState(20);
  const { naturalProduct, setNaturalProduct } = React.useContext(Context);
  const { databaseType, setDatabaseType } = React.useContext(Context);
  const { protein, setProtein } = React.useContext(Context);
  const { interactiveTableData, setInteractiveTableData } =
    React.useContext(Context);
  console.log(protein);
  function pubchemHandler() {
    if (PubChemLigand === "none") {
    }
  }
  function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      /* next line works with strings and numbers,
       * and you may want to customize it to your needs
       */
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  }
  console.log(databaseType);
  function zincHandler() {
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
  }
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
  useEffect(() => {
    axios.get("http://localhost:3001/proteins").then((res) => {
      setProteinData(res.data);
      setProtein(res.data[0].pdb_id);
      setDataLoaded(true);
    });
    console.log("component reload");
  }, []);

  return (
    <>
      <div class="grid row">
        <div class="grid col">
          <div class="m-2" id="proteinSelection">
            <form>
              <h2>Select a Database</h2>
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
            <label htmlFor="select">Select Protein: </label>
            <select
              class="my-4"
              onChange={(e) =>
                setProtein(e.target.value) &
                setSequenceLength(
                  e.target.options[e.target.selectedIndex].getAttribute(
                    "data-sequenceLength"
                  )
                ) &
                setProteinDescription(
                  e.target.options[e.target.selectedIndex].getAttribute(
                    "data-description"
                  )
                ) &
                setUniProtId(
                  e.target.options[e.target.selectedIndex].getAttribute(
                    "data-uniprot_id"
                  )
                ) &
                setExpMethodology(
                  e.target.options[e.target.selectedIndex].getAttribute(
                    "data-expmeth"
                  )
                ) &
                setPdbId(
                  e.target.options[e.target.selectedIndex].getAttribute(
                    "data-pdbid"
                  )
                )
              }
            >
              {proteinData
                .sort(dynamicSort("pdb_id" || "Gene"))
                .map((option, index) => (
                  <option
                    key={index}
                    data-description={option.Description || "--"}
                    data-sequenceLength={option["Sequence length"] || "--"}
                    data-uniprot_id={option.uniprot_id || "--"}
                    data-expmeth={
                      option["Experimental methodology"] ||
                      option["Experimetal methodoly"] ||
                      "--"
                    }
                    data-pdbid={option.pdb_id || "--"}
                    value={option.pdb_id || option.Gene}
                  >
                    {option.pdb_id || option.Gene}
                  </option>
                ))}
            </select>
            <br></br>
            <label htmlFor="radio"></label>
            <label htmlFor="input">Enter Compound:</label>{" "}
            <input
              onChange={(e) => setNaturalProduct(e.target.value)}
              type="search"
              name="zincligand"
              id="ligand"
            />
          </div>
          
          <div
            className="m-2 row justify-content-center"
            id="affinitySelection"
          >
           <p style={{color: "black"}}>Binding Affinity:</p>
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
          <div class="m-2" id="filter">
            <label>Show Docking Results:</label>{" "}
            <span style={{ display: "inline-block" }}>
            <label for="top" style={{ display: "block" }}>Top</label>
            <input
              onChange={(e) => setFilter(e.target.value)}
              type="number"
              min="0"
              max="100"
              step="1"
              placeholder="0"
              id="top"
              size="4"
            ></input>
            </span>
          </div>
          <div className="p-3">
            <div>
            <button style={{width: 128}}
              onClick={() =>
                setOpen(true) & zincHandler() & console.log(tableData)
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
