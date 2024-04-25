import React, { useState, useEffect } from 'react';
const Help = (props) => {

  return (
    <div className="card main-card text-left p-4 m-4" style={{ 'color': 'black' }}>
      <h1 className="text-center">Help</h1>
      <p>Help section page of myDockDB, here you will find a guide to navigate through the database. If you have any questions that are not covered on this page, please send an email to <a href='mailto:rousselene.larson@usu.edu'>rousselene.larson@usu.edu</a></p>
      <h2 className='pt-4'>Introduction</h2>
      <p>The molecular docking approach may be used to represent the atomic level interaction between a small molecule and a protein, allowing us to define small molecule behavior in target protein binding sites as well as elucidate key biochemical processes. For this database we use the molecular docking approach to assess the impact of plant-based natural compounds on Multiple Myeloma, a cancer of the plasma cells in the bone marrow. Due to their biological activity, small molecules found in natural compounds provide therapeutic benefits that affect human protein expression. Here we present myDockDB is, a database of 337 multiple myeloma proteins, 118, 285 ligands (plant-based natural products) docked to each protein, and approximately 40,000000 protein-ligand docked complex implemented to provide to general audience a way to check the binding affinity of a multiple myeloma protein to a natural compound.
      </p>
      <h2 className='pt-4'>Protein Search Information</h2>
      <p>While surfing the homepage, users can initiate by retrieving information about the Myeloma-related proteins they want to search by clicking on the top right box search. It could be assisted by either providing the PDB ID or the gene name to do so.</p>
    <div className='protein-search'></div>
    <h2 className='pt-4'>The Search Menu</h2>
    <p>Next by clicking on the search box menu, the user can select any proteins whether by their common name or PDB ID (last selection of either is searched. Ex. If you choose a PDB and then choose a common name, the common name will be used to search) associated with a natural compound of their choice. A compound must be entered in the compound search (unless a previous search has been completed with a compound specified) or an alert box will be shown and the search will not go through. The most recent search history is saved until a new search is made or the 'Clear Previous Search' button is clicked. Additionally, you may search by either a pubchem or zinc specific compound. The search result obtained is the protein-ligand complex with the highest affinity. Information of the protein is provided at the top of the page. Further, a visualization of the complex is also obtained where users can choose to visualize the complex, the ligand or the protein separately. Additionally, a count wizard user was developed to visualize the different conformation of the docked ligands to the protein. </p>
    <div className='search-menu'></div>
    <h2 className='pt-4'>
Top-hits Functionality
</h2>
<p>Alternatively, users can also retrieve the top hit compounds associated with the submitted protein. To protect the download capacity of the database, we have initially limited the download to maximum 100 hits; default is 10, but additional support will be provided to users, who wish to obtain more hits. The resulting table will be further followed up in the process. Each protein-ligand complex will have the option to download and visualize the complexes for studying the inter-atomic interactions.</p>
    <div className='top-ten-search'></div>
    <h2 className='pt-4'>The Results Page</h2>
    <p>On the top of the interface information about the protein is returned in table form.
      On the left side there is a visualization of the complex for the search that was submitted of the protein and ligand that binds to it. 
      On the right are the top 10 hits of the best binding affinity of that ligand to its receptor protein. 
      Both, image and the table can be downloaded.</p>
    <div className='results'></div>


    <h2 className='pt-4'>The Count Wizard</h2>
    <p>User can use the count wizard to see all 10 conformations of the docked complex by clicking up or down on the widget next to the box  They can also choose to visualize the ligand only by clicking on the visualize ligand box.</p>
    <div className='count-wizard'></div>
    <h2 className='pt-4'>Table of Results</h2>
    <p>A table results of the searched protein and ligand is returned. The table contains the searched protein-ligand complex on the first row, followed by the top hit compounds of that protein. Users can choose to download the result table in csv format. They can also choose to download only the protein-ligand complex returned by clicking on ‘Download Search Complex’ button on the top right if they have no interest on the table. The 3D visualization of the returned complex is located on the left. Users can return up to 100 top hits compounds.</p>
    <div className='results-table'></div>
    </div>

  );
};

export default Help;
