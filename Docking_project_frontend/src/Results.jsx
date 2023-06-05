import React from "react";
import { Context } from "./Context";
import { useContext, useState, useEffect } from "react";
import TableRender from "./tableRender";
import axios from "axios";
import Protein from "./protein.jsx";
const Results = (props) => {
  const { interactiveTableData, setInteractiveTableData } = useContext(Context);
  const { zincLigand, setZincLigand } = useContext(Context);
  const { naturalProduct, setNaturalProduct } = useContext(Context);
  const { proteinDescription, setProteinDescription } =
    React.useContext(Context);
  const { uniProtId, setUniProtId } = React.useContext(Context);
  const { expMethodology, setExpMethodology } = React.useContext(Context);
  const { pdbId, setPdbId } = React.useContext(Context);
  const { sequenceLength, setSequenceLength } = React.useContext(Context);

  const { gene, setGene } = useContext(Context);
  const [modelMax, setModelMax] = useState(10);
  const [model, setModel] = useState(1);
  const [toggleProtein, setToggle] = useState(0);
  const [toggle2, setToggle2] = useState("none");
  console.log(toggleProtein);
  function download_csv(csv, filename) {
    var csvFile;

    // CSV FILE
    csvFile = new Blob([csv], { type: "text/csv" });

    // We have to create a link to the file
    window.open(window.URL.createObjectURL(csvFile));
  }

  function export_table_to_csv(html, filename) {
    var csv = [];
    var rows = document.querySelectorAll(".resultsTable tr");

    for (var i = 0; i < rows.length; i++) {
      var row = [],
        cols = rows[i].querySelectorAll("td, th");

      for (var j = 0; j < cols.length - 1; j++) row.push(cols[j].innerText);

      csv.push(row.join(","));
    }
    return csv.join("\n");
    // Download CSV
  }
  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/number_of_models?complex=${naturalProduct}&protein=${pdbId}`
      )
      .then((res) => {
        setModelMax(res.data.length_of_file - 1);
        console.log(res.data);
      });
    console.log("component reload", interactiveTableData);
  }, []);
  return (
    <div className="container" style={{ color: "black" }}>
      <div style={{ marginBottom: "60px" }}>
        <Protein
          geneName={gene}
          description={proteinDescription}
          uniprotId={uniProtId}
          methodology={expMethodology}
          pdbId={pdbId}
          sequenceLength={sequenceLength}
        />
        <br />
      </div>
      <div className="grid row">
        <div className="grid col">
          <h3 className="fs-5 text-start">User Submitted</h3>
          <iframe
            height="800"
            width="100%"
            src={`http://localhost:3001/complex_viewer?complex=${naturalProduct}&protein=${pdbId}&model=${model}&hide_protein=${toggleProtein}`}
            title="Ligand Viewer"
          ></iframe>
          <div className="grid row">
            <div className="col">
              <label style={{ color: "black" }} htmlFor="model">
                Select Different Conformation (1 to 10):{" "}
              </label>{" "}
              <br />
              <input
                value={model}
                onChange={(e) => setModel(e.target.value)}
                type="number"
                name="model"
                id="model"
                min={1}
                max={modelMax}
              />
            </div>
            <div className="col">
              <label style={{ color: "black" }} htmlFor="model">
                Visualize Ligand Only:{" "}
              </label>{" "}
              <br />
              <input
                onClick={(e) => {
                  e.target.checked ? setToggle(1) : setToggle(0);
                }}
                type="checkbox"
                name="show"
                id="show"
              />
            </div>
          </div>
        </div>
        <div className="grid col">
          <h3 className="fs-5">Select Another Ligand or Complex</h3>
          <div>
            <button
              id="csvTableDownload"
              onClick={(e) => {
                download_csv(export_table_to_csv(), "table.csv");
              }}
            >
              Download Results
            </button>
            <TableRender interactiveTableData={interactiveTableData} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Results;
