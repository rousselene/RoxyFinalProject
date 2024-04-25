import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

import AddGene from "./AddGene.tsx";
import Help from "./help/Help.jsx"
import AddModel from "./AddModel.tsx";
import Home from "./Home.tsx";
import Search from "./Search.jsx";
import InteractiveTable from "./interactive/InteractiveTable.jsx";
import TableRender from "./tableRender";
import DataSets from "./datasets/DataSets.jsx";
import Results from "./Results/Results.jsx";
import GeneNames from "./listGenes/listGeneNames.jsx";
import PDBIds from "./listpdbs/listPDBIds.jsx";
import { env } from "./env.js";
import Zincs from "./listZincs/listZinc.jsx";
import Pubchem from "./listPubchem/listPubchem.jsx";
/*
To generate tables from excel data, we must save the excel file as `.csv` format
then use an npm package like `csv-parser` to convert the csv data to json data
then we can loop thru the json data to generate a table

- google `npm csv parser`

import data1.csv 

const jsonData = csvParser(data1.csv)

jsonData.map(x => <td>{x.geneName}</td>)


*/

const initialData = [
  {
    gene_name: "Name A",
    uniprot_id: "",
    pdb_id: "",
    ligand: "",
    complex: "",
    binding: "",

    resolution: "",
    chain: "",
    grid_size: "",
    grid_center: "",
    chiimeric_form: "",
    start: "",
    end: "",
    sequence_end: "",
    methodology: "",
    organism: "",
  },
];

const ligandOptions = ["Ligand", "Ligand", "Ligand", "Ligand"];

const App = () => {
  const [data, setData] = useState(initialData);
  const [ligand, setLigand] = useState(ligandOptions[0]);
  const [protein, setProtein] = useState("Protein");

  const handleSearch = () => {
    console.log("search:", { ligand, protein });
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
        <div className="grid">
          <div className="row">
            <div className="col-sm heading-logo1"></div>
            <div className="col-sm heading-logo2"></div>
            
          </div>
        </div>
        </div>

       


        <nav className="navbar navbar-bg rounded p-1 mx-1" style={{ backgroundColor: '#4682B4' }}>
          <br></br>
          {/*<div className="heading-logo1 col" />*/}
          <div className="grid">

            <div className="navbar-lower" style={{ color: 'white' }}>

              <div className="my-auto">
                <Link className="btn primary rounded-lg outline fs-5" to="/myDockDB/" style={{ width: "150px", height: "40px", color: "white" }}>
                  Home
                </Link>
                <Link
                  className="btn primary rounded-lg outline fs-5"
                  style={{ width: "150px", height: "40px", color: "white" }}
                  to="/myDockDB/interactive"
                >
                  Search
                </Link>
                <Link
                  className="btn primary rounded-lg outline fs-5"
                  to="/myDockDB/datasets"
                  style={{ width: "150px", height: "40px", color: "white" }}
                >
                  Datasets
                </Link>
                <Link className="btn primary rounded-lg outline fs-5" to="/myDockDB/help" style={{ width: "150px", height: "40px", color: "white" }}>
                  Help
                </Link>
              </div>

            </div>
          </div>


          {/*<div className="heading-logo2 col" />*/}
          <div>

          </div>
        </nav>
        <div className="d-flex text-left">
        <h1 className="text-left fs-3 pt-4" style={{ color: 'black' }}><b><i>myDockDB</i></b>: Multiple Myeloma Proteins and Natural Compounds Docking WEB-resource</h1>
        </div>
        <Routes>
          <Route path={`${env.BASE_URL}/`} element={<Home />} />
          <Route path={`${env.BASE_URL}/results`} element={<Results />} />
          <Route path={`${env.BASE_URL}/search`} element={<Search />} />
          <Route
            path={`${env.BASE_URL}/interactive`}
            element={<InteractiveTable />}
          />
          <Route path={`${env.BASE_URL}/table`} element={<TableRender />} />
          <Route path="tools" element={<p>Tools</p>} />
          {/* <Route path='features' element={<GeneList data={}/>} /> */}
          <Route path={`${env.BASE_URL}/datasets`} element={<DataSets />} />
          <Route path={`${env.BASE_URL}/help`} element={<Help />} />
          <Route path={`${env.BASE_URL}/listGenes`} element={<GeneNames />} />
          <Route path={`${env.BASE_URL}/listpdbs`} element={<PDBIds />} />
          <Route path={`${env.BASE_URL}/listZincs`} element={<Zincs />} />
          <Route path={`${env.BASE_URL}/listPubchem`} element={<Pubchem />} />
          <Route path="data/:id" element={<p>data</p>} />

          <Route path="add-gene" element={<AddGene setData={setData} />} />
          <Route path="add-model" element={<AddModel setData={setData} />} />
        </Routes>
      </header>
      <div className="row px-4 mx-2">

      </div>
    </div>
  );
};

export default App;
