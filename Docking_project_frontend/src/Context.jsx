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
  const [naturalProduct, setNaturalProduct] = useState("139585407.pdb");
  const [databaseType, setDatabaseType] = useState("Pubchem");
  const [protein, setProtein] = useState("3V83");
  const [proteinDescription, setProteinDescription] = useState("--");
  const [uniProtId, setUniProtId] = useState("--");
  const [expMethodology, setExpMethodology] = useState("--");
  const [pdbId, setPdbId] = useState("--");
  const [sequenceLength, setSequenceLength] = useState("--");
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
      }}
    >
      {children}
    </Context.Provider>
  );
};
