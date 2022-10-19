import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import GeneList from './ModelList'

import AddGene from './AddGene.tsx'
import AddModel from './AddModel.tsx'
import Home from './Home.tsx'
import Search from './Search.jsx'
import InteractiveTable from './InteractiveTable'
import TableRender from './tableRender'
import DataSets from './DataSets'
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
    gene_name: 'Name A',
    uniprot_id: '',
    pdb_id: '',
    ligand: '',
    complex: '',
    binding: '',

    resolution: '',
    chain: '',
    grid_size: '',
    grid_center: '',
    chiimeric_form: '',
    start: '',
    end: '',
    sequence_end: '',
    methodology: '',
    organism: '',
  },
]

const ligandOptions = [
  'Ligand',
  'Ligand',
  'Ligand',
  'Ligand',
]

const App = () => {
  const [data, setData] = useState(initialData)
  const [ligand, setLigand] = useState(ligandOptions[0])
  const [protein, setProtein] = useState('Protein')

  const handleSearch = () => {

    console.log('search:', {ligand, protein})

  }



  return (
    <div className="App">
      <header className="App-header">

           <div className="row space-between">
        <div className="heading-logo1 col" />
        <div className="heading-logo2 col" />
      </div>

        <nav className='navbar'>
          
          <div className='navbar-lower'>
            <Link to='/'><button>Home</button></Link>
            <Link to='tools'><button>Tools</button></Link>
            <Link to='features'><button>Features</button></Link>
            <Link to='datasets'><button>Datasets</button></Link>
            <Link to='help'><button>Help</button></Link>
          </div>
          <div>
          <Link to='interactive'><button>Search Menu</button></Link>
            </div>
            
        </nav>







        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path='/interactive' element={<InteractiveTable />} />
          <Route path='/table' element={<TableRender />} />
          <Route path='tools' element={<p>Tools</p>} />
          {/* <Route path='features' element={<GeneList data={}/>} /> */}
          <Route path='/datasets' element={<DataSets />} />
          <Route path='help' element={<p>Help</p>} />
          <Route path='data/:id' element={<p>data</p>} />

          <Route path='add-gene' element={
            <AddGene 
              setData={setData}
            />
          } />
          <Route path='add-model' element={
            <AddModel
              setData={setData}
            />
          } />
        </Routes>
      </header>
    </div>
  )
}

export default App
