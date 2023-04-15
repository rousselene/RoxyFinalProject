import * as React from "react";

const Home = (props) => {
  const [pdb, setPdb] = React.useState("");
  const [geneName, setGeneName] = React.useState("");
  return (
    <>
      <div>
        <div className="card-container">
          <div className="card-row">
            <div className="card main-card">
              <div className="image-row">
                <div className="title">
                  myDockDB: Molecular Docking of Multiple Myeloma Proteins
                </div>
              </div>
              <div className="heading">
                <h2>Overview</h2>
              </div>
              <div className="text">
                <p className="card-text">
                  <b>Molecular Docking</b>: the molecular docking approach may
                  be used to represent the atomic level interaction between a
                  small molecule and a protein, allowing us to define small
                  molecule behavior in target protein binding sites as well as
                  elucidate key biochemical processes. The docking procedure
                  consists of two main steps: predicting the ligand structure as
                  well as its position and orientation within these sites (known
                  as pose) and determining the binding affinity.
                </p>

                <p className="card-text">
                  Multiple Myeloma (also known as cancer of the plasma cells) is
                  a disease where malignant plasma cells, also known as myeloma
                  cells, create clones of themselves and accumulate in the bone
                  marrow. The <b>M-protein</b>, or M- spike, or paraprotein, or
                  myeloma protein, is an antibody or immunoglobulin secreted by
                  malignant plasma cells. Most myeloma patients have it found in
                  their blood and/or urine. Many research groups have been
                  working into find a solution to this devasting condition.
                  However, toxicity and resistance are correlated with existing
                  therapies for MM, emphasizing the need for novel, effective
                  therapeutics.
                </p>

                <p className="card-text">
                  {" "}
                  Due to their biological activity, small molecules found in
                  natural compounds provide therapeutic benefits that affect
                  human protein expression. Here we present M3BioDock, a
                  database implemented to provide to general audience a way to
                  check the binding affinity of a multiple myeloma protein to a
                  natural compound as well performing dynamic simulation on the
                  complex through high performance computing.
                </p>
              </div>
              <div className="image-box">
                <div className="image image-1 " />
              </div>
            </div>

            <div className="card-column">
              <div className="card side-card">
                <h2 className="fs-5" style={{ color: "blue" }}>
                  Get Protein Record
                </h2>
                <br />
                <h3 className="fs-6" style={{ color: "blue" }}>
                  PDB ID
                </h3>

                <input
                  placeholder="3V83"
                  type="text"
                  onChange={(e) => {
                    setPdb(e.target.value);
                  }}
                />
                <br />
                <button
                  className="primary rounded-lg outline"
                  onClick={(e) =>
                    window.open("https://rcsb.org/structure/" + pdb)
                  }
                >
                  View Information
                </button>
              </div>
              <div className="card side-card">
                <h2 className="fs-5" style={{ color: "blue" }}>
                  Get Protein Record
                </h2>
                <br />
                <h3 className="fs-6" style={{ color: "blue" }}>
                  Gene Name
                </h3>

                <input
                  placeholder="TF"
                  type="text"
                  onChange={(e) => {
                    setGeneName(e.target.value);
                  }}
                />
                <br />
                <button
                  onClick={(e) =>
                    window.open(
                      "https://www.uniprot.org/uniprotkb?query=" + geneName
                    )
                  }
                >
                  View Information
                </button>
              </div>
              <div className="card side-card">
                <h2 className="fs-5" style={{ color: "black" }}>
                  Please cite below if you use the database:
                </h2>
                <p style={{ width: "15em" }}>
                  Rousselene, R., myDockDB: Molecular Docking of Multiple
                  Myeloma Proteins, (2023). DOI: 10.1186/s13007-022-00897-9
                </p>
                <div></div>
              </div>
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
  );
};

export default Home;

/*


            M3BioDOCK: Molecular Docking of Multiple Myeloma 
            

<p>Molecular Docking: the molecular docking approach may be used to represent the atomic level interaction between a small molecule and a protein. This technic allows us to define small molecule behavior in target protein binding sites as well as explain key biochemical processes. The docking procedure consists of two main steps: predicting the ligand structure as well as its position and orientation within these sites (known as pose) and determining the binding affinity.

Multiple Myeloma (also known as cancer of the plasma cells) is a disease where malignant plasma cells create clones of themselves and accumulate in the bone marrow. The M-protein, or M- spike, or paraprotein, or myeloma protein, is an antibody or immunoglobulin secreted by malignant plasma cells. Most myeloma patients have it found in their blood and/or urine. Many research groups have been working into finding a solution to this devasting condition. However, toxicity and resistance are correlated with existing therapies for MM, emphasizing the need for novel, effective therapeutics.

Due to their biological activity, small molecules found in natural compounds provide therapeutic benefits that affect human protein expression. Here we present M3BioDock, a database implemented to provide to general audience a way to check the binding affinity of a multiple myeloma protein to a natural compound as well as all the specific information about that protein.</p>

*/
