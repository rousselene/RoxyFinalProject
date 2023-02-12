import React, { useState } from "react";

export const Context = React.createContext();
export const ContextProvider = ({ children }) => {
  const [interactiveTableData, setInteractiveTableData] = useState([
    {
      _id: "631026215067a17e2ddda9c6",
      protein: "data/proteins/2W8N.pdb",
      complex: "data/ligand/139585574.pdbqt",
      Affinity: -8.3,
    },
  ]);
  const [naturalProduct, setNaturalProduct] = useState(null);
  const [databaseType, setDatabaseType] = useState(null);
  const [protein, setProtein] = useState(null);
  const [proteinDescription, setProteinDescription] = useState(null);
  const [uniProtId, setUniProtId] = useState(null);
  const [expMethodology, setExpMethodology] = useState(null);
  const [pdbId, setPdbId] = useState(null);
  const [sequenceLength, setSequenceLength] = useState(null);
  const [gene, setGene] = useState(null);
  return (
    <Context.Provider
      value={{
        interactiveTableData,
        setInteractiveTableData,
        naturalProduct,
        setNaturalProduct,
        databaseType,
        setDatabaseType,
        protein,
        setProtein,
        proteinDescription,
        setProteinDescription,
        uniProtId,
        setUniProtId,
        expMethodology,
        setExpMethodology,
        pdbId,
        setPdbId,
        sequenceLength,
        setSequenceLength,
        gene,
        setGene
      }}
    >
      {children}
    </Context.Provider>
  );
};
