import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import GeneList from "./ModelList";

import AddGene from "./AddGene.tsx";
import AddModel from "./AddModel.tsx";
import Home from "./Home.tsx";
import Search from "./Search.jsx";
import InteractiveTable from "./InteractiveTable";
import TableRender from "./tableRender";
import DataSets from "./DataSets";
import Results from "./Results";
import { env } from "./env.js";
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
        <div className="row space-between">
          <div className="heading-logo1 col" />
          <div className="heading-logo2 col" />
        </div>

        <nav className="navbar">
          <br></br>
          <div className="navbar-lower">
            <Link
              className="btn primary rounded-lg outline"
              to="/myDockDB/"
            >
              Home
            </Link>
            <Link
              className="btn primary rounded-lg outline"
              to="/myDockDB/datasets"
            >
              Datasets
            </Link>
            <Link className="btn primary rounded-lg outline" to="help">
              Help
            </Link>
          </div>
          <div>
            <Link
              className="btn primary rounded-lg outline"
              style={{ width: "150px" }}
              to="/myDockDB/interactive"
            >
              Search Menu
            </Link>
          </div>
        </nav>

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
          <Route path={`${env.BASE_URL}/help`} element={<p>Help</p>} />
          <Route path="data/:id" element={<p>data</p>} />

          <Route path="add-gene" element={<AddGene setData={setData} />} />
          <Route path="add-model" element={<AddModel setData={setData} />} />
        </Routes>
      </header>
    </div>
  );
};

export default App;
