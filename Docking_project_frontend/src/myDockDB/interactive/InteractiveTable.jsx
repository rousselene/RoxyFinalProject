import React from "react";
import { useEffect, useRef, useState, useContext } from "react";
import axios from "axios";
import Popup from 'reactjs-popup';
import { createPortal } from "react-dom";
import { Tab } from "bootstrap";
import { Context } from "../Context.jsx";
import { useNavigate } from "react-router-dom";
import { env } from "../env.js";
import { FaInfoCircle } from "react-icons/fa"

import { Tooltip } from 'react-tooltip'

import Select from 'react-select';


console.log(env.BACKEND);

const Interactive = (props) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState();
  const [proteinData, setProteinData] = React.useState([]);
  const [dataLoaded, setDataLoaded] = React.useState(true);
  const [placeholder, setPlaceholder] = React.useState("eg. 139585407");

  const { proteinDescription, setProteinDescription } =
    React.useContext(Context);
  const { uniProtId, setUniProtId } = React.useContext(Context);
  const { expMethodology, setExpMethodology } = React.useContext(Context);
  const { pdbId, setPdbId } = React.useContext(Context);
  const { sequenceLength, setSequenceLength } = React.useContext(Context);

  const [tableData, setTableData] = React.useState([]);
  const [affinityMin, setAffinityMin] = React.useState(0);
  const [affinityMax, setaffinityMax] = React.useState(-100);
  const [filter, setFilter] = React.useState(10);
  const { naturalProduct, setNaturalProduct } = React.useContext(Context);
  const { databaseType, setDatabaseType } = React.useContext(Context);
  const { protein, setProtein } = React.useContext(Context);
  const { gene, setGene } = React.useContext(Context);

  const [currentPdbId, setCurrentPdbId] = React.useState(null);
  const [currentGene, setCurrentGene] = React.useState(null);


  const { interactiveTableData, setInteractiveTableData } =
    React.useContext(Context);

  function pubchemHandler() {
    if (PubChemLigand === "none") {
    }
  }

  function setProteinInformation() {
    console.log("click", currentGene, currentPdbId);

    if (currentPdbId != null && currentGene == null) {
      axios.get(`${env.BACKEND}specificProtein?pdbId=${pdbId}`).then((res) => {
        var responseObj = res.data[0];

        console.log(res);
        setPdbId(responseObj.pdb_id);
        localStorage.setItem('pdbId', responseObj.pdb_id)
        setGene(responseObj["Gene name"] || responseObj["Gene"]);
        localStorage.setItem('gene', responseObj["Gene name"] || responseObj["Gene"])
        setUniProtId(responseObj.uniprot_id);
        localStorage.setItem('uniProtId', responseObj.uniprot_id)
        setSequenceLength(responseObj["Sequence length"]);
        localStorage.setItem('sequenceLength', responseObj["Sequence length"])
        setExpMethodology(
          responseObj["Experimetal methodoly"] ||
          responseObj["Experimental methodology"]
        );
        localStorage.setItem('experimentalMethodology', responseObj["Experimetal methodoly"] ||
          responseObj["Experimental methodology"])
        setProteinDescription(responseObj.Description);
        localStorage.setItem('proteinDescription', responseObj.Description)
        localStorage.setItem('db_type', databaseType)
        localStorage.setItem('naturalProduct', naturalProduct)
        axios
          .get(
            `${env.BACKEND}table?protein=${responseObj.pdb_id}&limit=${filter}&min_affinity=${affinityMin}&max_affinity=${affinityMax}&compound=${naturalProduct}&db_type=${databaseType}`
          )
          .then((res) => {
            console.log(res.data, res.data[0].Ligand, naturalProduct);
            if (naturalProduct == null) {
              alert('Please enter a zinc or Pubchem compound please!')
            }

            else {
              var itd = res.data.map((item, index) => {index==0?item.checked = true:item.checked=false; return item})
              setInteractiveTableData(itd);
              localStorage.setItem('resultsTable', JSON.stringify(itd))
              navigate("/myDockDB/Results");
            }
          });
      });
    }
    if (currentGene != null && currentPdbId == null) {
      axios.get(`${env.BACKEND}specificProtein?gene=${gene}`).then((res) => {
        var responseObj = res.data[0];
        console.log(res);
        setPdbId(responseObj.pdb_id);
        localStorage.setItem('pdbId', responseObj.pdb_id)
        setGene(responseObj["Gene name"] || responseObj["Gene"]);
        localStorage.setItem('gene', responseObj["Gene name"] || responseObj["Gene"])
        setUniProtId(responseObj.uniprot_id);
        localStorage.setItem('uniProtId', responseObj.uniprot_id)
        setSequenceLength(responseObj["Sequence length"]);
        localStorage.setItem('sequenceLength', responseObj["Sequence length"])
        setExpMethodology(
          responseObj["Experimetal methodoly"] ||
          responseObj["Experimental methodology"]
        );
        localStorage.setItem('experimentalMethodology', responseObj["Experimetal methodoly"] ||
          responseObj["Experimental methodology"])
        setProteinDescription(responseObj.Description);
        localStorage.setItem('proteinDescription', responseObj.Description)
        localStorage.setItem('db_type', databaseType)
        localStorage.setItem('naturalProduct', naturalProduct)
        axios
          .get(
            `${env.BACKEND}table?protein=${responseObj.pdb_id}&limit=${filter}&min_affinity=${affinityMin}&max_affinity=${affinityMax}&compound=${naturalProduct}&db_type=${databaseType}`
          )
          .then((res) => {
            let dataToSend = res.data
            console.log('break point');
            console.log(dataToSend, naturalProduct, 'data here');
            if (naturalProduct == null) {
              alert('Please enter a zinc or Pubchem compound please!')
            }
            else {
              var itd = res.data.map((item, index) => {index==0?item.checked = true:item.checked=false; return item})
              setInteractiveTableData(itd);
              localStorage.setItem('resultsTable', JSON.stringify(itd))
              navigate("/myDockDB/Results");
            }

          });
      });
    }
  }

  /* function zincHandler() {
    axios
      .get(
        `http://localhost:3001/table?protein=${protein}&limit=${filter}&min_affinity=${affinityMin}&max_affinity=${affinityMax}`
      )
      .then((res) => {
        console.log(
          `http://localhost:3001/table?protein=${protein}&limit=${filter}&min_affinity=${affinityMin}&max_affinity=${affinityMax}`
        );
        console.log(res);
        setInteractiveTableData(res.data);
        navigate("/datasets");
      });
  } */
  /*useEffect(() => {
        // When container is ready
        if (true) {
          // Create window
          newWindow.current = window.open(
            "",
            "",
            "width=600,height=400,left=200,top=200"
          );
          // Append container
          newWindow.current.document.body.appendChild(<TableRender tableData = {tableData}/>);
    
          // Save reference to window for cleanup
          const curWindow = newWindow.current;
    
          // Return cleanup function
          return () => curWindow.close();
        }
      }, [tableData]); */
  // useEffect(() => {
  //   axios.get("http://localhost:3001/proteins").then((res) => {
  //    setProteinData(res.data);
  //      setProtein(res.data[0].pdb_id);
  //      setDataLoaded(true);
  //    });
  //    console.log("component reload");
  // }, []);

  function setCurrentGenes(e) {
    console.log(currentGene, gene, e.value);
    setCurrentGene(e.value);
    setGene(e.value);
    setPdbId(null);
    setCurrentPdbId(null)
  }
  function setCurrentPdbIds(e) {
    console.log(currentPdbId, pdbId, e.value);
    setCurrentPdbId(e.value);
    setPdbId(e.value);
    setGene(null)
    setCurrentGene(null)
  }

  return (
    <>
      <div className="grid row card main-card text-center mt-3">
        <div className="grid col">
          <div className="m-2" id="proteinSelection">
            <form>
              <h1 className="fs-5 ">
                Select a <u>RECEPTOR</u> Protein
              </h1>
              <br></br>
              <div
                className="m-2 row justify-content-center"
                id="nameSelection"
              >
                <div className="mt-n4 col d-flex justify-content-end">
                  <div>
                    <span style={{ display: "inline-block" }}>
                      <label htmlFor="min" style={{ display: "block" }}>
                        Gene Name&nbsp;
                          <sup>
                          <FaInfoCircle data-tooltip-id="pop-up-tooltip"
                          data-tooltip-content="Review Gene Names"
                          data-tooltip-place="top-start"
                          data-tooltip-position-strategy="fixed"
                          onClick={(e) => navigate('/myDockDB/listGenes')}/>
                        <Tooltip id="pop-up-tooltip" />
                        </sup>

                      
                        
                      </label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        defaultValue={'TP53'}
                        isSearchable={true}
                        name="commonName"
                        id="commonName"
                        onChange={(e) => setCurrentGenes(e)}
                        placeholder="eg. TP53"
                        options={[{ 'value': 'APOE', 'label': 'APOE' }, { 'value': 'CDH1', 'label': 'CDH1' }, { 'value': 'SERPINA1', 'label': 'SERPINA1' }, { 'value': 'IL12B', 'label': 'IL12B' },
                        { 'value': 'GC', 'label': 'GC' }, { 'value': 'TF', 'label': 'TF' }, { 'value': 'SERPINC1', 'label': 'SERPINC1' }, { 'value': 'SAA!', 'label': 'SAA!' }, { 'value': 'VTN', 'label': 'VTN' }, { 'value': 'SERPINA3', 'label': 'SERPINA3' }, { 'value': 'PI3', 'label': 'PI3' }, { 'value': 'FETUB', 'label': 'FETUB' }, { 'value': 'IL6', 'label': 'IL6' }, { 'value': 'AQP1', 'label': 'AQP1' }, { 'value': 'TGFB1', 'label': 'TGFB1' }, { 'value': 'TP53', 'label': 'TP53' }, { 'value': 'DNASE1', 'label': 'DNASE1' }, { 'value': 'MMP9', 'label': 'MMP9' }, { 'value': 'EGFR', 'label': 'EGFR' }, { 'value': 'CDKN2A', 'label': 'CDKN2A' }, { 'value': 'CXCL8', 'label': 'CXCL8' }, { 'value': 'TERT', 'label': 'TERT' }, { 'value': 'VEGFA', 'label': 'VEGFA' }, { 'value': 'CRP', 'label': 'CRP' }, { 'value': 'KRAS', 'label': 'KRAS' }, { 'value': 'CCL22', 'label': 'CCL22' }, { 'value': 'C9orf72', 'label': 'C9orf72' }, { 'value': 'KLK3', 'label': 'KLK3' }, { 'value': 'BCL2', 'label': 'BCL2' }, { 'value': 'BRAF', 'label': 'BRAF' }, { 'value': 'IL1B', 'label': 'IL1B' }, { 'value': 'ADIPOQ', 'label': 'ADIPOQ' }, { 'value': 'ICAM1', 'label': 'ICAM1' }, { 'value': 'DRD2', 'label': 'DRD2' }, { 'value': 'LRRK2', 'label': 'LRRK2' }, { 'value': 'SPP1', 'label': 'SPP1' }, { 'value': 'BCKDHB', 'label': 'BCKDHB' }, { 'value': 'MMP2', 'label': 'MMP2' }, { 'value': 'GSTP1', 'label': 'GSTP1' }, { 'value': 'PIK3CA', 'label': 'PIK3CA' }, { 'value': 'BDN', 'label': 'BDN' }, { 'value': 'LCN2', 'label': 'LCN2' }, { 'value': 'F2', 'label': 'F2' }, { 'value': 'MLH1', 'label': 'MLH1' }, { 'value': 'TIMP1', 'label': 'TIMP1' }, { 'value': 'CD44', 'label': 'CD44' },
                        { 'value': 'HMGB1', 'label': 'HMGB1' }, { 'value': 'BIRC5', 'label': 'BIRC5' }, { 'value': 'NOS3', 'label': 'NOS3' }, { 'value': 'EDN1', 'label': 'EDN1' }, { 'value': 'APOA1', 'label': 'APOA1' }, { 'value': 'MTHFR', 'label': 'MTHFR' }, { 'value': 'CST3', 'label': 'CST3' }, { 'value': 'RB1', 'label': 'RB1' }, { 'value': 'ALK', 'label': 'ALK' }, { 'value': 'S100B', 'label': 'S100B' }, { 'value': 'C3', 'label': 'C3' }, { 'value': 'LEP', 'label': 'LEP' }, { 'value': 'RAC1', 'label': 'RAC1' }, { 'value': 'DMD', 'label': 'DMD' }, { 'value': 'HSPB1', 'label': 'HSPB1' }, { 'value': 'IL18', 'label': 'IL18' }, { 'value': 'NPPB', 'label': 'NPPB' }, { 'value': 'VDR', 'label': 'VDR' }, { 'value': 'HFE', 'label': 'HFE' }, { 'value': 'HP', 'label': 'HP' }, { 'value': 'EGF', 'label': 'EGF' }, { 'value': 'FLT1', 'label': 'FLT1' }, { 'value': 'PLG', 'label': 'PLG' }, { 'value': 'HMOX1', 'label': 'HMOX1' }, { 'value': 'APC', 'label': 'APC' }, { 'value': 'TOP2A', 'label': 'TOP2A' }, { 'value': 'PLAU', 'label': 'PLAU' }, { 'value': 'IL17A', 'label': 'IL17A' }, { 'value': 'ALB', 'label': 'ALB' }, { 'value': 'FGFR3', 'label': 'FGFR3' }, { 'value': 'MPO', 'label': 'MPO' }, { 'value': 'VIM', 'label': 'VIM' }, { 'value': 'ERG', 'label': 'ERG' }, { 'value': 'TWIST1', 'label': 'TWIST1' }, { 'value': 'S100A4', 'label': 'S100A4' }, { 'value': 'PLAUR', 'label': 'PLAUR' }, { 'value': 'TTN', 'label': 'TTN' }, { 'value': 'CXCL10', 'label': 'CXCL10' }, {
                          'value': 'SLC4A1', 'label':
                            'SLC4A1'
                        }, { 'value': 'PKD1', 'label': 'PKD1' }, { 'value': 'VCAM1', 'label': 'VCAM1' }, { 'value': 'TIMP2', 'label': 'TIMP2' }, { 'value': 'CYP2D6', 'label': 'CYP2D6' }, { 'value': 'COL1A1', 'label': 'COL1A1' }, { 'value': 'CYP3A4', 'label': 'CYP3A4' }, { 'value': 'MIF', 'label': 'MIF' }, { 'value': 'BSG', 'label': 'BSG' }, { 'value': 'CHI3L1', 'label': 'CHI3L1' }, { 'value': 'TNFRSF11B', 'label': 'TNFRSF11B' }, { 'value': 'GRN', 'label': 'GRN' }, { 'value': 'FOXP3', 'label': 'FOXP3' }, { 'value': 'HAMP', 'label': 'HAMP' }, { 'value': 'FGFR2', 'label': 'FGFR2' }, { 'value': 'PLK1', 'label': 'PLK1' }, { 'value': 'RASSF1', 'label': 'RASSF1' }, { 'value': 'AGT', 'label': 'AGT' }, { 'value': 'PRDX1', 'label': 'PRDX1' }, { 'value': 'DAPK1', 'label': 'DAPK1' }, { 'value': 'HMGA1', 'label': 'HMGA1' }, { 'value': 'POSTN', 'label': 'POSTN' }, { 'value': 'LEPR', 'label': 'LEPR' }, { 'value': 'ADM', 'label': 'ADM' }, { 'value': 'FGF23', 'label': 'FGF23' }, { 'value': 'CASR', 'label': 'CASR' }, { 'value': 'ENG', 'label': 'ENG' }, { 'value': 'SHC1', 'label': 'SHC1' }, { 'value': 'CA9', 'label': 'CA9' }, { 'value': 'MCM2', 'label': 'MCM2' }, { 'value': 'GNAI2', 'label': 'GNAI2' }, { 'value': 'HAVCR2', 'label': 'HAVCR2' }, { 'value': 'ZEB1', 'label': 'ZEB1' }, { 'value': 'AFP', 'label': 'AFP' }, { 'value': 'B2M', 'label': 'B2M' }, { 'value': 'CD59', 'label': 'CD59' }, { 'value': 'KLRK1', 'label': 'KLRK1' }, { 'value': 'PKD2', 'label': 'PKD2' }, { 'value': 'YWHAQ', 'label': 'YWHAQ' }, { 'value': 'DMBT1', 'label': 'DMBT1' }, { 'value': 'INHBA', 'label': 'INHBA' }, { 'value': 'HAVCR1', 'label': 'HAVCR1' }, { 'value': 'CD40LG', 'label': 'CD40LG' }, { 'value': 'CYP1A2', 'label': 'CYP1A2' }, { 'value': 'NGF', 'label': 'NGF' }, { 'value': 'IDO1', 'label': 'IDO1' }, { 'value': 'CAMP', 'label': 'CAMP' }, { 'value': 'LRP2', 'label': 'LRP2' }, { 'value': 'TGFBI', 'label': 'TGFBI' }, { 'value': 'MEFV', 'label': 'MEFV' }, { 'value': 'FTL', 'label': 'FTL' }, { 'value': 'PDGFB', 'label': 'PDGFB' }, { 'value': 'KLK2', 'label': 'KLK2' }, { 'value': 'KNG1', 'label': 'KNG1' }, { 'value': 'COL2A1', 'label': 'COL2A1' },
                        { 'value': 'HPSE', 'label': 'HPSE' }, { 'value': 'COL4A1', 'label': 'COL4A1' }, { 'value': 'ANGPTL4', 'label': 'ANGPTL4' }, { 'value': 'ACHE', 'label': 'ACHE' }, { 'value': 'F2R', 'label': 'F2R' }, { 'value': 'ANGPT2', 'label': 'ANGPT2' }, { 'value': 'AMBP', 'label': 'AMBP' }, { 'value': 'MME', 'label': 'MME' }, { 'value': 'EDNRB', 'label': 'EDNRB' }, { 'value': 'KL', 'label': 'KL' }, { 'value': 'YWHAB', 'label': 'YWHAB' }, { 'value': 'ADRB1', 'label': 'ADRB1' }, { 'value': 'CTNND1', 'label': 'CTNND1' }, { 'value': 'PGF', 'label': 'PGF' }, { 'value': 'AQP5', 'label': 'AQP5' }, { 'value': 'NPHS1', 'label': 'NPHS1' }, { 'value': 'AQP2', 'label': 'AQP2' }, { 'value': 'PDIA3', 'label': 'PDIA3' }, { 'value': 'POLG', 'label': 'POLG' }, { 'value': 'S100A1', 'label': 'S100A1' }, { 'value': 'FGF21', 'label': 'FGF21' }, { 'value': 'COL18A1', 'label': 'COL18A1' }, { 'value': 'AKR1B1', 'label': 'AKR1B1' }, { 'value': 'MMP8', 'label': 'MMP8' }, { 'value': 'ADRB3', 'label': 'ADRB3' }, { 'value': 'IL23A', 'label': 'IL23A' }, { 'value': 'SLC7A9', 'label': 'SLC7A9' }, { 'value': 'NTN1', 'label': 'NTN1' }, { 'value': 'CP', 'label': 'CP' }, { 'value': 'CUBN', 'label': 'CUBN' }, { 'value': 'AGR2', 'label': 'AGR2' }, { 'value': 'CXCL1', 'label': 'CXCL1' }, { 'value': 'AVPR2', 'label': 'AVPR2' }, {
                          'value':
                            'CYP2A6', 'label': 'CYP2A6'
                        }, { 'value': 'TNC', 'label': 'TNC' }, { 'value': 'IDH2', 'label': 'IDH2' }, { 'value': 'RNLS', 'label': 'RNLS' }, {
                          'value': 'TREM1',
                          'label': 'TREM1'
                        }, { 'value': 'CX3CL1', 'label': 'CX3CL1' }, { 'value': 'GLA', 'label': 'GLA' }, { 'value': 'MTRR', 'label': 'MTRR' }, {
                          'value': 'POR', 'label':
                            'POR'
                        }, { 'value': 'PPOX', 'label': 'PPOX' }, { 'value': 'UBQLN2', 'label': 'UBQLN2' }, { 'value': 'DEK', 'label': 'DEK' }, { 'value': 'PAX8', 'label': 'PAX8' }, { 'value': 'TFF3', 'label': 'TFF3' }, { 'value': 'TFF1', 'label': 'TFF1' }, { 'value': 'AZGP1', 'label': 'AZGP1' }, { 'value': 'ENO1', 'label': 'ENO1' }, {
                          'value':
                            'HMBS', 'label': 'HMBS'
                        }, { 'value': 'MSTN', 'label': 'MSTN' }, { 'value': 'IGF2R', 'label': 'IGF2R' }, { 'value': 'PSAP', 'label': 'PSAP' }, { 'value': 'AQP7', 'label': 'AQP7' }, { 'value': 'NUMA1', 'label': 'NUMA1' }, { 'value': 'CGA', 'label': 'CGA' }, { 'value': 'GSTO2', 'label': 'GSTO2' }, {
                          'value': 'FABP1', 'label':
                            'FABP1'
                        }, { 'value': 'TNFSF12', 'label': 'TNFSF12' }, { 'value': 'IFNGR1', 'label': 'IFNGR1' }, { 'value': 'SDHA', 'label': 'SDHA' }, { 'value': 'XDH', 'label': 'XDH' }, { 'value': 'CD80', 'label': 'CD80' }, { 'value': 'ALCAM', 'label': 'ALCAM' }, { 'value': 'CXCL5', 'label': 'CXCL5' }, { 'value': 'HGD', 'label': 'HGD' }, { 'value': 'TRPV5', 'label': 'TRPV5' }, { 'value': 'ROBO2', 'label': 'ROBO2' }, { 'value': 'HCFC1', 'label': 'HCFC1' }, { 'value': 'APOM', 'label': 'APOM' }, { 'value': 'REG1A', 'label': 'REG1A' }, { 'value': 'CAD', 'label': 'CAD' }, { 'value': 'ORM1', 'label': 'ORM1' }, { 'value': 'SCNN1G', 'label': 'SCNN1G' }, { 'value': 'FBP1', 'label': 'FBP1' }, { 'value': 'ETS2', 'label': 'ETS2' }, { 'value': 'SNAP23', 'label': 'SNAP23' }, { 'value': 'CIB1', 'label': 'CIB1' }, { 'value': 'UROD', 'label': 'UROD' }, { 'value': 'RGN', 'label': 'RGN' }, { 'value': 'ANXA3', 'label': 'ANXA3' }, { 'value': 'RNASE2', 'label': 'RNASE2' }, {
                          'value': 'ACADS', 'label':
                            'ACADS'
                        }, { 'value': 'BTC', 'label': 'BTC' }, { 'value': 'MMACHC', 'label': 'MMACHC' }, { 'value': 'ALDH5A1', 'label': 'ALDH5A1' }, { 'value': 'ACY1', 'label': 'ACY1' }, { 'value': 'TAGLN2', 'label': 'TAGLN2' }, { 'value': 'CLASP2', 'label': 'CLASP2' }, { 'value': 'ASL', 'label': 'ASL' }, { 'value': 'DPYS', 'label': 'DPYS' }, { 'value': 'ABCD4', 'label': 'ABCD4' }, { 'value': 'HOGA1', 'label': 'HOGA1' }, { 'value': 'UCN3', 'label': 'UCN3' }, { 'value': 'CPA3', 'label': 'CPA3' }, { 'value': 'RHCG', 'label': 'RHCG' }, { 'value': 'MMADHC', 'label': 'MMADHC' }, { 'value': 'N6AMT1', 'label': 'N6AMT1' }, { 'value': 'CDKN1A', 'label': 'CDKN1A' }, { 'value': 'MKI67', 'label': 'MKI67' }, { 'value': 'CDKN1B', 'label': 'CDKN1B' }, { 'value': 'LCP1', 'label': 'LCP1' }, { 'value': 'HIF1A', 'label': 'HIF1A' }, { 'value': 'PPARG', 'label': 'PPARG' }, { 'value': 'CXCL12', 'label': 'CXCL12' }, { 'value': 'FN1', 'label': 'FN1' }, { 'value': 'RUNX1', 'label': 'RUNX1' }, { 'value': 'HRAS', 'label': 'HRAS' }, { 'value': 'EZR', 'label': 'EZR' }, { 'value': 'NRAS', 'label': 'NRAS' }, { 'value': 'ATG16L1', 'label': 'ATG16L1' }, { 'value': 'PRKACA', 'label': 'PRKACA' }, { 'value': 'ITGB2', 'label': 'ITGB2' }, { 'value': 'MSN', 'label': 'MSN' }, { 'value': 'U2AF2', 'label': 'U2AF2' }, { 'value': 'ATXN2', 'label': 'ATXN2' }, { 'value': 'SIRT7', 'label': 'SIRT7' }, { 'value': 'HERC2', 'label': 'HERC2' }, { 'value': 'SLPI', 'label': 'SLPI' }, { 'value': 'PLS3', 'label': 'PLS3' }, { 'value': 'RAD23B', 'label': 'RAD23B' }, { 'value': 'NR2C2', 'label': 'NR2C2' }, { 'value': 'RNF41', 'label': 'RNF41' }, { 'value': 'AIF1', 'label': 'AIF1' }, { 'value': 'HEXIM1', 'label': 'HEXIM1' }, { 'value': 'DPF2', 'label': 'DPF2' }, { 'value': 'GLYR1', 'label': 'GLYR1' }, { 'value': 'MED23', 'label': 'MED23' }, { 'value': 'DDX19B', 'label': 'DDX19B' }, { 'value': 'BICD2', 'label': 'BICD2' }, { 'value': 'PPME1', 'label': 'PPME1' }, { 'value': 'PLEKHA4', 'label': 'PLEKHA4' }, { 'value': 'SERPINC', 'label': 'SERPINC' }]}
                      />
                    </span>
                  </div>
                </div>
                or
                <div className="mt-n4 col d-flex justify-content-start">
                  <div>
                    <span style={{ display: "inline-block" }}>
                      <label htmlFor="pdbId" style={{ display: "block" }}>
                        PDB ID&nbsp;<sup>
                        <FaInfoCircle data-tooltip-id="pop-up-tooltip-1"
                          data-tooltip-content="Review PDB IDs"
                          data-tooltip-place="top-start"
                          data-tooltip-position-strategy="fixed"
                          onClick={(e) => navigate('/myDockDB/listpdbs')}/>
                        <Tooltip id="pop-up-tooltip-1" />
                        </sup>
                      </label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        defaultValue={'TP53'}
                        isSearchable={true}
                        name="commonName"
                        id="pdbId"
                        onChange={(e) => setCurrentPdbIds(e)}
                        placeholder="eg. 2BIP"
                        options={[{ 'value': '1NFN', 'label': '1NFN' }, { 'value': '4ZT1', 'label': '4ZT1' }, { 'value': '6I7U', 'label': '6I7U' }, { 'value': '5MXA', 'label': '5MXA' }, {
                          'value':
                            '1KXP', 'label': '1KXP'
                        }, { 'value': '3V83', 'label': '3V83' }, { 'value': '2GD4', 'label': '2GD4' }, { 'value': '4IP8', 'label': '4IP8' }, { 'value': '6O5E', 'label': '6O5E' }, { 'value': '1QMN', 'label': '1QMN' }, { 'value': '1FLE', 'label': '1FLE' }, { 'value': '6SAZ', 'label': '6SAZ' }, { 'value': '1ALU', 'label': '1ALU' }, { 'value': '4CSK', 'label': '4CSK' }, { 'value': '3KFD', 'label': '3KFD' }, { 'value': '2BIP', 'label': '2BIP' }, { 'value': '4AWN', 'label': '4AWN' }, { 'value': '1L6J', 'label': '1L6J' }, { 'value': '5XWD', 'label': '5XWD' }, { 'value': '1BI7', 'label': '1BI7' }, { 'value': '6N2U', 'label': '6N2U' }, {
                          'value': '5UGW',
                          'label': '5UGW'
                        }, { 'value': '4GLN', 'label': '4GLN' }, { 'value': '3PVN', 'label': '3PVN' }, { 'value': '6GOD', 'label': '6GOD' }, { 'value': '1DOK', 'label': '1DOK' }, { 'value': '6V4U', 'label': '6V4U' }, { 'value': '2ZCH', 'label': '2ZCH' }, { 'value': '5VAU', 'label': '5VAU' }, { 'value': '5C9C', 'label': '5C9C' }, { 'value': '5R8Q', 'label': '5R8Q' }, { 'value': '6U66', 'label': '6U66' }, { 'value': '1MQ8', 'label': '1MQ8' }, { 'value': '6CM4', 'label': '6CM4' }, { 'value': '6DLO', 'label': '6DLO' }, { 'value': '3CXD', 'label': '3CXD' }, { 'value': '1U5B', 'label': '1U5B' }, { 'value': '1CK7', 'label': '1CK7' }, { 'value': '2A2R', 'label': '2A2R' }, { 'value': '4JPS', 'label': '4JPS' }, { 'value': '1BND', 'label': '1BND' }, { 'value': '3CBC', 'label': '3CBC' }, { 'value': '5EDM', 'label': '5EDM' }, { 'value': '4P7A', 'label': '4P7A' }, { 'value': '3V96', 'label': '3V96' }, { 'value': '1UUH', 'label': '1UUH' }, { 'value': '6CIK', 'label': '6CIK' }, { 'value': '2QFA', 'label': '2QFA' }, { 'value': '4D1P', 'label': '4D1P' }, { 'value': '6DK5', 'label': '6DK5' }, { 'value': '3K2S', 'label': '3K2S' }, { 'value': '6FCX', 'label': '6FCX' }, { 'value': '3GAX', 'label': '3GAX' }, { 'value': '4ELJ', 'label': '4ELJ' }, { 'value': '4FOC', 'label': '4FOC' }, { 'value': '5D7F', 'label': '5D7F' }, { 'value': '5FO8', 'label': '5FO8' }, { 'value': '1AX8', 'label': '1AX8' }, { 'value': '1I4D', 'label': '1I4D' }, { 'value': '1EG4', 'label': '1EG4' }, { 'value': '6DV5', 'label': '6DV5' }, { 'value': '2VXT', 'label': '2VXT' }, { 'value': '3N56', 'label': '3N56' }, { 'value': '1IE9', 'label': '1IE9' }, { 'value': '1A6Z', 'label': '1A6Z' }, { 'value': '4WJG', 'label': '4WJG' }, { 'value': '1NQL', 'label': '1NQL' }, { 'value': '3HNG', 'label': '3HNG' }, { 'value': '4DUR', 'label': '4DUR' }, { 'value': '6EHA', 'label': '6EHA' }, { 'value': '3T7U', 'label': '3T7U' }, { 'value': '4FM9', 'label': '4FM9' }, { 'value': '2VNT', 'label': '2VNT' }, { 'value': '6WIO', 'label': '6WIO' }, { 'value': '6YG9', 'label': '6YG9' }, { 'value': '1RY7', 'label': '1RY7' }, { 'value': '6BMT', 'label': '6BMT' }, { 'value': '3UF1', 'label': '3UF1' }, { 'value': '6VGE', 'label': '6VGE' }, { 'value': '2MJV', 'label': '2MJV' }, { 'value': '4CFR', 'label': '4CFR' }, { 'value': '1YWH', 'label': '1YWH' }, { 'value': '4JNW', 'label': '4JNW' }, { 'value': '1O7Z', 'label': '1O7Z' }, { 'value': '4YZF', 'label': '4YZF' }, { 'value': '6A70', 'label': '6A70' }, { 'value': '1VCA', 'label': '1VCA' }, { 'value': '1BR9', 'label': '1BR9' }, { 'value': '3TBG', 'label': '3TBG' }, { 'value': '5K31', 'label': '5K31' }, { 'value': '5VCC', 'label': '5VCC' }, { 'value': '1GIF', 'label': '1GIF' }, { 'value': '4U0Q', 'label': '4U0Q' }, { 'value': '1HJX', 'label': '1HJX' }, { 'value': '3URF', 'label': '3URF' }, { 'value': '2JYE', 'label': '2JYE' }, { 'value': '3QRF', 'label': '3QRF' }, { 'value': '3H0T', 'label': '3H0T' }, { 'value': '6V6Q', 'label': '6V6Q' },
                        { 'value': '2OWB', 'label': '2OWB' }, { 'value': '2KZU', 'label': '2KZU' }, { 'value': '5M3Y', 'label': '5M3Y' }, { 'value': '3HY2', 'label': '3HY2' }, { 'value': '4B4L', 'label': '4B4L' }, { 'value': '2EZE', 'label': '2EZE' }, { 'value': '5YJG', 'label': '5YJG' }, { 'value': '3V6O', 'label': '3V6O' }, { 'value': '6UUS', 'label': '6UUS' }, { 'value': '5W21', 'label': '5W21' }, { 'value': '5K5S', 'label': '5K5S' }, { 'value': '5I04', 'label': '5I04' }, { 'value': '4XWX', 'label': '4XWX' }, { 'value': '5DVX', 'label': '5DVX' }, { 'value': '6XTX', 'label': '6XTX' }, { 'value': '6D9H', 'label': '6D9H' }, { 'value': '5F71', 'label': '5F71' }, { 'value': '2.00E+19', 'label': '2.00E+19' }, { 'value': '3MRK', 'label': '3MRK' }, { 'value': '5J1A', 'label': '5J1A' }, { 'value': '2J8B', 'label': '2J8B' }, { 'value': '1MPU', 'label': '1MPU' }, { 'value': '3HRN', 'label': '3HRN' }, { 'value': '6BCR', 'label': '6BCR' }, { 'value': '6SA5', 'label': '6SA5' }, { 'value': '5HLY', 'label': '5HLY' }, { 'value': '5DZO', 'label': '5DZO' }, { 'value': '6W9G', 'label': '6W9G' }, { 'value': '2HI4', 'label': '2HI4' }, { 'value': '1WWW', 'label': '1WWW' }, { 'value': '4U72', 'label': '4U72' }, { 'value': '4EYC', 'label': '4EYC' }, { 'value': '2M0P', 'label': '2M0P' }, { 'value': '5NV6', 'label': '5NV6' }, { 'value': '4CG4', 'label': '4CG4' }, { 'value': '5LG8', 'label': '5LG8' }, { 'value': '3MJG', 'label': '3MJG' }, { 'value': '4NFF', 'label': '4NFF' }, { 'value': '4ASQ', 'label': '4ASQ' }, { 'value': '5NIR', 'label': '5NIR' }, { 'value': '5LA4', 'label': '5LA4' }, { 'value': '5NAY', 'label': '5NAY' }, { 'value': '6U1U', 'label': '6U1U' }, { 'value': '1F8U', 'label': '1F8U' }, { 'value': '3VW7', 'label': '3VW7' }, { 'value': '4ZFG', 'label': '4ZFG' }, { 'value': '3QKG', 'label': '3QKG' }, { 'value': '6SUK', 'label': '6SUK' }, { 'value': '6IGK', 'label': '6IGK' }, { 'value': '5W21', 'label': '5W21' }, { 'value': '6GNN', 'label': '6GNN' }, { 'value': '2LSQ', 'label': '2LSQ' }, { 'value': '3L6X', 'label': '3L6X' }, { 'value': '1RV6', 'label': '1RV6' }, { 'value': '5DYE', 'label': '5DYE' }, {
                          'value': '4ZRT', 'label':
                            '4ZRT'
                        }, { 'value': '4OJ2', 'label': '4OJ2' }, { 'value': '3F8U', 'label': '3F8U' }, { 'value': '5C51', 'label': '5C51' }, { 'value': '5K89', 'label': '5K89' }, { 'value': '5VAQ', 'label': '5VAQ' }, { 'value': '1BNL', 'label': '1BNL' }, { 'value': '1US0', 'label': '1US0' }, { 'value': '1BZS', 'label': '1BZS' }, { 'value': '2CDW', 'label': '2CDW' }, { 'value': '4GRW', 'label': '4GRW' }, { 'value': '6YUP', 'label': '6YUP' }, { 'value': '6FKQ', 'label': '6FKQ' }, { 'value': '4ENZ', 'label': '4ENZ' }, { 'value': '3KQ4', 'label': '3KQ4' }, { 'value': '2LNT', 'label': '2LNT' }, { 'value': '1MGS', 'label': '1MGS' }, { 'value': '6NI2', 'label': '6NI2' }, { 'value': '2FDV', 'label': '2FDV' }, { 'value': '5R61', 'label': '5R61' }, { 'value': '5I96', 'label': '5I96' }, { 'value': '3QJ4', 'label': '3QJ4' }, {
                          'value':
                            '1SMO', 'label': '1SMO'
                        }, { 'value': '3ONA', 'label': '3ONA' }, { 'value': '3HG3', 'label': '3HG3' }, { 'value': '2QTL', 'label': '2QTL' }, { 'value': '3QFC', 'label': '3QFC' }, { 'value': '3NKS', 'label': '3NKS' }, { 'value': '1J8C', 'label': '1J8C' }, { 'value': '2JX3', 'label': '2JX3' }, { 'value': '2K27', 'label': '2K27' }, { 'value': '6V1C', 'label': '6V1C' }, { 'value': '6V1D', 'label': '6V1D' }, { 'value': '1T80', 'label': '1T80' }, { 'value': '2PSN', 'label': '2PSN' }, { 'value': '7AAK', 'label': '7AAK' }, { 'value': '6UMX', 'label': '6UMX' }, { 'value': '2V5O', 'label': '2V5O' }, { 'value': '2DOB', 'label': '2DOB' }, {
                          'value': '6KXW',
                          'label': '6KXW'
                        }, { 'value': '6QJA', 'label': '6QJA' }, { 'value': '4AY9', 'label': '4AY9' }, { 'value': '3Q18', 'label': '3Q18' }, { 'value': '6MP4', 'label': '6MP4' }, { 'value': '4HT1', 'label': '4HT1' }, { 'value': '1FG9', 'label': '1FG9' }, { 'value': '6VAX', 'label': '6VAX' }, { 'value': '2E1Q', 'label': '2E1Q' }, { 'value': '1I8L', 'label': '1I8L' }, { 'value': '5A2F', 'label': '5A2F' }, { 'value': '2MGS', 'label': '2MGS' }, { 'value': '1EYB', 'label': '1EYB' }, { 'value': '5OEO', 'label': '5OEO' }, { 'value': '6IAA', 'label': '6IAA' }, { 'value': '4N3A', 'label': '4N3A' }, { 'value': '2YG2', 'label': '2YG2' }, { 'value': '1QDD', 'label': '1QDD' }, { 'value': '1IBX', 'label': '1IBX' }, { 'value': '3KQ0', 'label': '3KQ0' }, { 'value': '6WTH', 'label': '6WTH' }, { 'value': '5PZR', 'label': '5PZR' }, { 'value': '4BQA', 'label': '4BQA' }, { 'value': '1NHL', 'label': '1NHL' }, { 'value': '1XO5', 'label': '1XO5' }, { 'value': '1R3S', 'label': '1R3S' }, { 'value': '4GNB', 'label': '4GNB' }, { 'value': '1AII', 'label': '1AII' }, { 'value': '1GQV', 'label': '1GQV' }, { 'value': '2VIG', 'label': '2VIG' }, { 'value': '1IOX', 'label': '1IOX' }, { 'value': '3SOM', 'label': '3SOM' }, { 'value': '2W8N', 'label': '2W8N' }, { 'value': '1Q7L', 'label': '1Q7L' }, { 'value': '1WYM', 'label': '1WYM' }, { 'value': '3WOY', 'label': '3WOY' }, { 'value': '1K62', 'label': '1K62' }, { 'value': '2VR2', 'label': '2VR2' }, { 'value': '6JBJ', 'label': '6JBJ' }, { 'value': '3S5O', 'label': '3S5O' }, { 'value': '3N93', 'label': '3N93' }, { 'value': '2BOA', 'label': '2BOA' }, { 'value': '3HD6', 'label': '3HD6' }, { 'value': '5CV0', 'label': '5CV0' }, { 'value': '6KHS', 'label': '6KHS' }, { 'value': '1AXC', 'label': '1AXC' }, { 'value': '5J28', 'label': '5J28' }, { 'value': '5UQ3', 'label': '5UQ3' }, { 'value': '2D85', 'label': '2D85' }, { 'value': '4H6J', 'label': '4H6J' }, { 'value': '3DZY', 'label': '3DZY' }, { 'value': '4UAI', 'label': '4UAI' }, { 'value': '6MFA', 'label': '6MFA' }, { 'value': '1H9D', 'label': '1H9D' }, { 'value': '6Q21', 'label': '6Q21' }, { 'value': '4RM8', 'label': '4RM8' }, { 'value': '6ZIO', 'label': '6ZIO' }, { 'value': '5NPV', 'label': '5NPV' }, { 'value': '4RA4', 'label': '4RA4' }, { 'value': '3K6S', 'label': '3K6S' }, { 'value': '6TXQ', 'label': '6TXQ' }, { 'value': '2G4B', 'label': '2G4B' }, { 'value': '3KTR', 'label': '3KTR' }, { 'value': '5IQZ', 'label': '5IQZ' }, { 'value': '4L1M', 'label': '4L1M' }, { 'value': '2Z7F', 'label': '2Z7F' }, { 'value': '1AOA', 'label': '1AOA' }, { 'value': '1UEL', 'label': '1UEL' }, { 'value': '3P0U', 'label': '3P0U' }, { 'value': '2FZP', 'label': '2FZP' }, { 'value': '2D58', 'label': '2D58' }, { 'value': '3S9G', 'label': '3S9G' }, { 'value': '5VDC', 'label': '5VDC' }, { 'value': '2UYY', 'label': '2UYY' }, { 'value': '6H02', 'label': '6H02' }, { 'value': '3FMP', 'label': '3FMP' }, { 'value': '6PSE', 'label': '6PSE' }, { 'value': '3C5V', 'label': '3C5V' },
                        { 'value': '1UPQ', 'label': '1UPQ' }, { 'value': '3KCG', 'label': '3KCG' }]}
                      />
                    </span>
                  </div>
                </div>
              </div>
              <br></br>
              <h3 className="fs-5">
                Select a <u>LIGAND</u> Database
              </h3>
              <br></br>
              <label className="radio-inline mx-2">
                <input
                  onClick={(e) =>
                    setDatabaseType(e.target.id) &
                    setPlaceholder("eg. 139585407")
                  }
                  type="radio"
                  id="Pubchem"
                  name="database"
                  className="mx-2"
                />
                Pubchem&nbsp;<sup>
                        <FaInfoCircle data-tooltip-id="pop-up-tooltip-2"
                          data-tooltip-content="Download Pubchem IDs"
                          data-tooltip-place="top-start"
                          data-tooltip-position-strategy="fixed"
                          onClick={(e) => navigate('/myDockDB/listPubchem')}/>
                        <Tooltip id="pop-up-tooltip-2" />
                        </sup>
              </label>
              <label className="radio-inline mx-2">
                <input
                  onClick={(e) =>
                    setDatabaseType(e.target.id) &
                    setPlaceholder("eg. ZINC000000122602")
                  }
                  type="radio"
                  id="Zinc"
                  name="database"
                  className="mx-2"
                />
                ZINC&nbsp;<sup>
                        <FaInfoCircle data-tooltip-id="pop-up-tooltip-3"
                          data-tooltip-content="Download ZINC IDs"
                          data-tooltip-place="top-start"
                          data-tooltip-position-strategy="fixed"
                          onClick={(e) => navigate('/myDockDB/listZincs')}/>
                        <Tooltip id="pop-up-tooltip-3" /></sup>
              </label>
            </form>
            <br></br>
            <label htmlFor="radio"></label>
            <br></br>
            <label htmlFor="input">Enter Compound:</label>{" "}
            <input
              onChange={(e) => setNaturalProduct(e.target.value)}
              type="search"
              name="zincligand"
              id="ligand"
              placeholder={placeholder}
              size="22"
            />
          </div>
          <br></br>
          <p className="text-black">or</p>
          <div className="m-2" id="filter">
            <label>Show Top Complexes (up to 100): </label>{" "}
            <span style={{ display: "inline-block" }}>
              <input
                onChange={(e) => setFilter(e.target.value)}
                type="number"
                min="0"
                max="100"
                step="1"
                placeholder="10"
                defaultValue="10"
                id="top"
                size="4"
              ></input>
            </span>
          </div>
          <br></br>
          <div
            className="m-2 row justify-content-center"
            id="affinitySelection"
          >
            <p style={{ color: "black" }}>Binding Affinity:</p>
            <div className="mt-n4 col d-flex justify-content-end">
              <div>
                <span style={{ display: "inline-block" }}>
                  <label htmlFor="min" style={{ display: "block" }}>
                    Min
                  </label>
                  <input
                    size="4"
                    id="min"
                    onChange={(e) => setAffinityMin(-e.target.value)}
                    type="number"
                    min="1"
                    max="100"
                    placeholder="1"
                  ></input>
                </span>
              </div>
            </div>

            <div className="mt-n4 col d-flex justify-content-start">
              <div>
                <span style={{ display: "inline-block" }}>
                  <label htmlFor="max" style={{ display: "block" }}>
                    Max
                  </label>

                  <input
                    size="4"
                    id="max"
                    onChange={(e) => setaffinityMax(-e.target.value)}
                    type="number"
                    min="1"
                    max="15"
                    placeholder="15"
                  ></input>
                </span>
              </div>
            </div>
          </div>

          <div className="p-3">
            <div>
              <button
                style={{
                  width: 128,
                  backgroundColor: "#4682B4",
                  color: "white",
                }}
                onClick={(e) =>
                  setOpen(true) &
                  e.preventDefault() &
                  //zincHandler(e) &
                  setProteinInformation() &
                  console.log(tableData)
                }
              >
                Search
              </button>

            </div>
            {/*<div className="pt-2"><button
              style={{
                width: 172,
                backgroundColor: "#4682B4",
                color: "white",
              }}
              onClick={(e) =>

                e.preventDefault() &
                //zincHandler(e) &
                localStorage.clear() &
                console.log(tableData) &
                navigate('/myDockDB/Results')
              }
            >
              Clear Previous Search
            </button></div>*/}
          </div>
        </div>
      </div>
    </>
  );
};
export default Interactive;
