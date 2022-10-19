import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from "react";
import Table from "react-bootstrap/Table";
import { Tab } from 'bootstrap';
import NewWindow from 'react-new-window'
const BuildVis = (props) => {
return(
<div style={{height:"400px", width:"400px"}} className='viewer_3Dmoljs' data-href='src/test_assets/139585407.pdb' data-backgroundcolor='0xffffff' data-style='stick' data-ui='true'></div>
)
}
const TableRender = (props) => {

return(
  <div>
    <Table striped bordered hover>
    <tbody>
          <tr>
            <th>
              Protein
              </th>
              <th>
              Ligand
              </th>
              <th>
              Complex
              </th>
              <th>
              Affinity
              </th>
              <th>
              Download
              </th>
          </tr>
          {
          props.interactiveTableData.map((dataPoint, index) => (
          <tr>
            <td>{dataPoint.Protein}</td>
            <td>{dataPoint.Ligand}</td>
            <td>{dataPoint.Complex}</td>
            <td>{dataPoint.Affinity}</td>
            <td>
<button><a target="_blank" href={'http://localhost:3001/download?filePath=' + `/public/data/Complex/3V83/` + dataPoint.Complex}>{dataPoint.Complex} </a></button></td>
          </tr>))
        }
          </tbody>     
    </Table>
    <div>
    <BuildVis/>
    </div>
    </div>
    )
}
export default TableRender