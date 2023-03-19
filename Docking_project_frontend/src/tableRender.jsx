import { Context } from "./Context";
import { useContext, useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Tab } from "bootstrap";
import NewWindow from "react-new-window";

const BuildVis = (props) => {
  return (
    <div
      style={{ height: "400px", width: "400px" }}
      className="viewer_3Dmoljs"
      data-href="src/test_assets/139585407.pdb"
      data-backgroundcolor="0xffffff"
      data-style="stick"
      data-ui="true"
    ></div>
  );
};
const TableRender = (props) => {
  const { naturalProduct, setNaturalProduct } = useContext(Context);
  const { pdbId, setPdbId } = useContext(Context);

  function visualizeComplex(e) {
    console.log("display", e.target.value, pdbId, naturalProduct);
    setPdbId(e.target.value.split("_")[0]);
    setNaturalProduct(e.target.value.split("_")[1]);
  }

  return (
    <div>
      <Table striped bordered hover>
        <tbody>
          <tr>
            <th>Protein</th>
            <th>Ligand</th>
            <th>Complex</th>
            <th>Affinity</th>
            <th>Download</th>
            <th>Visualization</th>
          </tr>
          {props.interactiveTableData.map((dataPoint, index) => (
            <tr>
              <td>{dataPoint.Protein}</td>
              <td>{dataPoint.Ligand}</td>
              <td>{dataPoint.Complex}</td>
              <td>{dataPoint.Affinity}</td>
              <td>
                <button>
                  <a
                    target="_blank"
                    href={
                      "http://localhost:3001/download?filePath=" +
                      `/public/data/Complex/3V83/` +
                      dataPoint.Complex +
                      ".pdb"
                    }
                  >
                    {dataPoint.Complex}{" "}
                  </a>
                </button>
              </td>
              <td>
                <input
                  type="radio"
                  id={dataPoint.Complex}
                  name="visualize"
                  value={dataPoint.Complex}
                  onChange={(e) => {
                    visualizeComplex(e);
                  }}
                ></input>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div>
        <BuildVis />
      </div>
    </div>
  );
};
export default TableRender;
