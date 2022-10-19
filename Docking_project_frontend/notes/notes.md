# Notes

Gene structure:
```js
const struct = {
    gene_name: '',
    uniprot_id: '',
    pdb_id: '',
    ligand: '',
    complex: '',
    binding: '',

    affinity: '',
    resolution: '',
    chain: '',
    grid_size: '',
    grid_center: '',
    chimeric_form: '',
    start: '',
    end: '',
    sequence_length: '',
    methodology: '',
    organism: '',
    description: '',
}
```



Model struct:
```js
const struct = {
    Gene	
    uniprot_id	
    Template	
    oligomeric state	
    resolution:
    grid_size: '',
    grid_center: '',
    GMQE	
    seq_identity	
    disall	(validation)
    chain	
    experimental 
    methodoly	
    description
}
```

- form to add new structure to database
- list of all added structures
- search input to filter structures
- download button to download files?

- Home page
    - protein search + ligand search (ligand can be blank)
    - on search - show page that matches (or 'no match found')