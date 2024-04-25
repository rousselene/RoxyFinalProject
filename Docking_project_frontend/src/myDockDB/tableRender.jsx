import { Context } from "./Context";
import { useContext, useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Tab } from "bootstrap";
import NewWindow from "react-new-window";
import { env } from "./env.js";
import {useCallback} from "react";
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
const TableRender = () => {
  const { naturalProduct, setNaturalProduct } = useContext(Context);
  const { pdbId, setPdbId } = useContext(Context);
  const { interactiveTableData, setInteractiveTableData } = useContext(Context);
  const [checkedList, setCheckedList] = useState(interactiveTableData.map((item, idx) => idx==0?true:false))
  const {imageNotFound, setImageNotFound} = useContext(Context)
  console.log(interactiveTableData)
  function visualizeComplex(e) {
    console.log("display", e.target.value, pdbId, naturalProduct);
    setPdbId(e.target.value.split("_")[0]);
    setNaturalProduct(e.target.value.split("_")[1]);
    if (e.target.id == 'Not Found in DB') {
      setImageNotFound('<h1 style="text-align: center;">Image Not Found</h1>')
    }
    else {
      setImageNotFound(undefined)
    }
    
  }
  function checkBoxUpdate(e) {
    let newCheckedList = checkedList.map((e) => false)
    
    newCheckedList[parseInt(e.target.dataset.index)] = true
    console.log(newCheckedList, 'newCheckedList')
    setCheckedList(newCheckedList)
    console.log('checkedList', checkedList)
  }
  
  return (
    <div>
      <Table className="resultsTable" striped bordered hover>
        <tbody>
          <tr>
            <th>Protein</th>
            <th>Ligand</th>
            <th>Complex</th>
            <th>Affinity</th>
            <th>Download</th>
            <th>Visualization</th>
          </tr>
          {interactiveTableData.map((dataPoint, index) => {console.log('mapped'); return(
            <tr key={index}>
              <td>{dataPoint.Protein}</td>
              <td>{dataPoint.Ligand}</td>
              <td>{dataPoint.Complex}</td>
              <td>{dataPoint.Affinity}</td>
              <td>
                <button>
                  <a
                    target="_blank"
                    href={
                      `${env.BACKEND}download?filePath=` +
                      `/public/data/Complex/${dataPoint.Protein}/` +
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
                  data-index={index}
                  checked={checkedList[index]}
                  type="radio"
                  id={dataPoint.Complex}
                  name="visualize"
                  value={dataPoint.Complex}
                  onChange={(e) => {checkBoxUpdate(e); visualizeComplex(e)}}
                  htmlFor='visual-radio-button-group'
                ></input>
              </td>
            </tr>
          )})}
          
        </tbody>
      </Table>
      {/*<div>
        <BuildVis />
                </div>*/}
    </div>
  );
  
};
export default TableRender;
