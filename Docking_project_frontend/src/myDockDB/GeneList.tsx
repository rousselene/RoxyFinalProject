import React from 'react'

const GeneList = props => {
    return(
        <>
            <div className='table-container'>
                <table>
                    <tr>
                        <th>Gene Name</th>
                        <th>Uniprot ID</th>
                        <th>PDB ID</th>
                        <th>Ligand</th>
                        <th>Complex</th>
                        <th>Binding</th>
                        <th>Resolution</th>
                        <th>Chain</th>
                        <th>Grid Size</th>
                        <th>Grid Center</th>
                        <th>Chimeric Form</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Sequence End</th>
                        <th>Methodology</th>
                        <th>Organism</th>
                    </tr>
                    {props.data.map((x,i)=> (
                        <tr>
                            <td>{x.gene_name}</td>
                        </tr>
                    ))}
                </table>
            </div>
        </>
    )
}
export default GeneList