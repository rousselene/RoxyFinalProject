import { useState } from "react";
import Table from "react-bootstrap/Table";
const Ligand = (props) => {
  return (
    <div>
      <h2>Protein Selected</h2>
      <Table striped bordered hover>
        <tbody>
          <tr>
            <th>Gene</th>
            <th>UniProt ID</th>
            <th>PDB ID</th>
            <th>Experimental Methodology</th>
            <th>Sequence Length</th>
            <th>Description</th>
          </tr>
          <tr>
            <td>{props.geneName}</td>
            <td>{props.uniprotId}</td>
            <td>{props.pdbId}</td>
            <td>{props.methodology}</td>
            <td>{props.sequenceLength}</td>
            <td>{props.description}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};
export default Ligand;
