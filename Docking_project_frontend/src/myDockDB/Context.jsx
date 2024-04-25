import React, { useState } from "react";

export const Context = React.createContext();
export const ContextProvider = ({ children }) => {
  const [interactiveTableData, setInteractiveTableData] = useState(JSON.parse(localStorage.getItem('resultsTable') || "[]"));
  const [naturalProduct, setNaturalProduct] = useState(localStorage.getItem('naturalProduct'));
  const [databaseType, setDatabaseType] = useState(localStorage.getItem('db_type'));
  const [protein, setProtein] = useState(localStorage.getItem('pdbId'));
  const [proteinDescription, setProteinDescription] = useState(localStorage.getItem('proteinDescription'));
  const [uniProtId, setUniProtId] = useState(localStorage.getItem('uniProtId'));
  const [expMethodology, setExpMethodology] = useState(localStorage.getItem('experimentalMethodology'));
  const [pdbId, setPdbId] = useState(localStorage.getItem('pdbId'));
  const [sequenceLength, setSequenceLength] = useState(localStorage.getItem('sequenceLength'));
  const [gene, setGene] = useState(localStorage.getItem('gene'));
  const [imageNotFound, setImageNotFound] = useState(undefined)
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
        setGene,
        imageNotFound,
        setImageNotFound
      }}
    >
      {children}
    </Context.Provider>
  );
};
