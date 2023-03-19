import { useState } from "react";
import Table from "react-bootstrap/Table";
const Protein = (props) => {
  return (
    <div style={{ paddingTop: "40px" }}>
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
            <td>
              <a
                href={`https://www.uniprot.org/uniprotkb?query=${props.geneName}`}
              >
                {props.geneName}
              </a>
            </td>
            <td>
              <a
                href={`https://www.uniprot.org/uniprotkb/${props.uniprotId}/entry`}
              >
                {props.uniprotId}
              </a>
            </td>
            <td>
              <a href={`https://www.rcsb.org/structure/${props.pdbId}`}>
                {props.pdbId}
              </a>
            </td>
            <td>{props.methodology}</td>
            <td>{props.sequenceLength}</td>
            <td>{props.description}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};
export default Protein;
