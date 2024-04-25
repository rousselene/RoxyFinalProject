import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { env } from "../env.js";
import { Link } from 'react-router-dom';
const Datasets = (props) => {
  const [pdbTable, setPdbTable] = useState([]);
  const [pmTable, setPmTable] = useState([]);

  useEffect(() => {
    axios.get(`${env.BACKEND}pdbProteins`).then((res) => { setPdbTable(res.data) })
    axios.get(`${env.BACKEND}proteinModels`).then((res) => { setPmTable(res.data) })
  }, []);
  return (
    <div className="card main-card text-left p-4 m-4" style={{ 'color': 'black' }}>
      <h1 className="text-center">Datasets</h1>
      <p>Here you will find a brief description of all the datasets that are used in myDockDB database. myDockDB is a database implemented to provide to the general audience a way to check the binding affinity of a multiple myeloma protein to a natural compound.</p>
      <h2 className='pt-2'>Proteins</h2>
      <p>The proteins involved in myeloma were selected from different biological samples (Serum, Urine, and Bone marrow) used for detecting multiple myeloma using techniques such as  serum protein electrophoresis (SPE) and urine protein electrophoresis (UPEP) and bone marrow biopsy. The screening for the MM proteins were made through various literatures and chosen based on the best experimental methods available, whether from X-ray, NMR, or electron microscopy. The selection steps are as follows: (i) any structures with X-ray were preferred over other experimental methods. (II) the structure with less resolution was preferred. (III) the structure with the longest sequence was picked. Then, the 3D crystal structures of the selected structures have been obtained from RCSB Protein Data Bank (PDB) (<a href='https://www.rcsb.org/'>https://www.rcsb.org/</a>). Then, The 3-dimensional crystal structures of the selected structures have been obtained using the RCSB Protein Data Bank (PDB) (<a href='https://www.rcsb.org/'>https://www.rcsb.org/</a>) (Burley et al., 2023). More information regarding these proteins can be found at the <a href='https://gtexportal.org/home/gene'>https://gtexportal.org/home/gene</a>.
      </p>
      <table className="table table-bordered table-striped mb-0" style={{ overflow: 'auto', height: '400px', display: 'block', width: '100%' }}>
        <thead>
          <tr>
            <th scope="col">Gene Name</th>
            <th scope="col">Uniprot ID</th>
            <th scope="col">PDB ID</th>
            <th scope="col">Resolution</th>
            <th scope="col">Chain(s)</th>
            <th scope="col">Chimeric Form</th>
            <th scope="col">Start</th>
            <th scope="col">End</th>
            <th scope="col">Sequence Length</th>
            <th scope="col">Experimental Methodology</th>
            <th scope="col">Organism</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          {pdbTable.map((x, i) => <tr key={i}><td>{x['Gene name']}</td><td>{x['uniprot_id']}</td><td>{x['pdb_id']}</td><td>{x['resolution']}</td><td>{x['chain(s)']}</td><td>{x['chimeric form']}</td><td>{x['start']}</td><td>{x['end']}</td><td>{x['Sequence length']}</td><td>{x['Experimental methodology']}</td><td>{x['organism from PDB']}</td><td>{x['Description']}</td></tr>)}
        </tbody>

      </table>
      <h2 className='pt-2'>Protein Models</h2>
      <p>However, SWISS MODEL (<a href='https://swissmodel.expasy.org/'>https://swissmodel.expasy.org/</a>) was used to do homology modeling for the proteins that did not have any available 3D structures.  </p>
      <table className="table table-bordered table-striped mb-0" style={{ overflow: 'auto', height: '400px', display: 'block', width: '100%' }}>
        <thead>
          <tr>
            <th scope="col">Gene Name</th>
            <th scope="col">Uniprot ID</th>
            <th scope="col">Template</th>
            <th scope="col">Oligomeric State</th>
            <th scope="col">Resolution</th>
            <th scope="col">GMQE</th>
            <th scope="col">Sequence Identity</th>
            <th scope="col">Structure Validation</th>
            <th scope="col">Chain</th>
            <th scope="col">Experimental Methodology</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          {pmTable.map((x, i) => <tr key={i}><td>{x['Gene']}</td><td>{x['uniprot_id']}</td><td>{x['Template']}</td><td>{x['Oligomeric state']}</td><td>{x['resolution']}</td><td>{x['GMQE']}</td><td>{x['Seq_identity']}</td><td>{x['disall']}</td><td>{x['chain']}</td><td>{x['Experimetal methodoly']}</td><td>{x['Description']}</td></tr>)}
        </tbody>

      </table>
      <h2 className='pt-2'>Ligands</h2>
      <p>Further, to select the ligands, we initially screened various natural compounds present in plants from the <a href='https://pubchem.ncbi.nlm.nih.gov/#query=natural%20products'>PubChem</a> (Kim et al., 2021) and <a href='https://zinc.docking.org/substances/subsets/natural-products/'>ZINC</a> databases (Sterling & Irwin, 2015). While selecting the ligands, the LIPINSKY’S RULE OF 5 is applied to obtain only for compounds with drug-like capabilities. Two different filters were applied: (i) REOS (Rapid Elimination of Swills): A hybrid method that combines some simple counting schemes like rule-of-5 with a set of functional group filters to identify reactive, toxic and other problematic structures. The REOS filters flag compounds containing functional groups that may lead to false positives due to reactivity, assay interference or poor ADMET properties (T et al., 2013). (ii) PAINS (Pan-assay interference compounds): To identify frequent hitters (promiscuous compounds) in many HTS assays. Pan-assay interference compounds (PAINS) are chemical compounds that often give false positive results in high-throughput screens. PAINS tend to react nonspecifically with numerous biological targets rather than specifically affecting one desired target (Baell & Holloway, 2010). The list of ligands screened in the study can be found at these two links: <Link to="/myDockDB/listPubchem">Pubchem</Link> and <Link to="/myDockDB/listZincs">ZINC</Link>.</p>
      
      <div className='dataset-img'></div>
      <p style={{color: '#4682B4'}}>**duplicates 3,715 compounds between the two databases were removed.</p>
    </div>
  );
};

export default Datasets;
