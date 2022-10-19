import * as React from 'react'

const Home = (props) => {


    return (
        <>
<div >
 

     

      <div className="card-container">
        <div className="card-row">
          <div className="card main-card">
            <div className="image-row">
              <div className="title">M3BioDOCK: Molecular Docking of Multiple Myeloma Proteins</div>
              <div className="heading">Overview</div>
            </div>
            <div className="text">
              <p className="card-text" ><b>Molecular Docking</b>: the molecular docking approach may be used to represent the atomic level interaction between a small molecule and a protein, allowing us to define small molecule behavior in target protein binding sites as well as elucidate key biochemical processes. The docking procedure consists of two main steps: predicting the ligand structure as well as its position and orientation within these sites (known as pose) and determining the binding affinity.</p>

                                <p className="card-text">Multiple Myeloma (also known as cancer of the plasma cells) is a disease where malignant plasma cells, also known as myeloma cells, create clones of themselves and accumulate in the bone marrow. The <b>M-protein</b>, or M- spike, or paraprotein, or myeloma protein, is an antibody or immunoglobulin secreted by malignant plasma cells. Most myeloma patients have it found in their blood and/or urine. Many research groups have been working into find a solution to this devasting condition. However, toxicity and resistance are correlated with existing therapies for MM, emphasizing the need for novel, effective therapeutics.
                                </p>

                                <p className="card-text"> Due to their biological activity, small molecules found in natural compounds provide therapeutic benefits that affect human protein expression. Here we present M3BioDock, a database implemented to provide to general audience a way to check the binding affinity of a multiple myeloma protein to a natural compound as well performing dynamic simulation on the complex through high performance computing.
                                </p>
            </div>
            <div className="image-box">
              <div className="image image-1 " />
              
            </div>
          </div>

          <div className="card-column">
            <div className="card side-card">
            <h2>Get Protein Record</h2>
            <h3>Protein</h3>
            <select>
              <option>Protein 1</option>
              <option>Protein 2</option>
            </select>
            </div>
            <div className="card side-card">
            <h2>Launch Search App</h2>
            <div><button className='btn'>Launch</button></div>
            </div>
            <div className="card side-card font-white">Card</div>
          </div>
        </div>
        <div className="card-row"></div>
        <div className="card-row">
          <div className="card stat-card mr-2">
            <div className="card-title">PROTEINS</div>
            <div className="card-stats">342</div>
            <div className="card-link blue">Search</div>
          </div>
          <div className="card stat-card mr-2">
            <div className="card-title">LIGANDS</div>
            <div className="card-stats">118,285</div>
            <div className="card-link green">Search</div>
          </div>
          <div className="card stat-card mr-2">
            <div className="card-title">PROTEIN-LIGAND COMPLEX</div>
            <div className="card-stats">40,000,000</div>
            <div className="card-link purple">Search</div>
          </div>
          <div className="card stat-card">
            <div className="card-title">MOLECULAR DOCKING</div>
            <div className="card-stats">Tools</div>
            <div className="card-link orange">search</div>
          </div>
        </div>
      </div>
    </div>
        </>
    )
}


export default Home



/*


            M3BioDOCK: Molecular Docking of Multiple Myeloma 
            

<p>Molecular Docking: the molecular docking approach may be used to represent the atomic level interaction between a small molecule and a protein. This technic allows us to define small molecule behavior in target protein binding sites as well as explain key biochemical processes. The docking procedure consists of two main steps: predicting the ligand structure as well as its position and orientation within these sites (known as pose) and determining the binding affinity.

Multiple Myeloma (also known as cancer of the plasma cells) is a disease where malignant plasma cells create clones of themselves and accumulate in the bone marrow. The M-protein, or M- spike, or paraprotein, or myeloma protein, is an antibody or immunoglobulin secreted by malignant plasma cells. Most myeloma patients have it found in their blood and/or urine. Many research groups have been working into finding a solution to this devasting condition. However, toxicity and resistance are correlated with existing therapies for MM, emphasizing the need for novel, effective therapeutics.

Due to their biological activity, small molecules found in natural compounds provide therapeutic benefits that affect human protein expression. Here we present M3BioDock, a database implemented to provide to general audience a way to check the binding affinity of a multiple myeloma protein to a natural compound as well as all the specific information about that protein.</p>

*/