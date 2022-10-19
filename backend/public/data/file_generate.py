import pandas as pd
import glob
import os

complex_folders = glob.glob("Complex/*/")

for folder in complex_folders:
	
	print(folder)

	files = glob.glob(folder+"/*.pdb")

	data = []

	protein = folder.split(os.path.sep)[1]

	for f in files:
		
		ligand = f.split(os.path.sep)[2].split(".")[0]
		complex = f.split(".")[0].replace(os.path.sep, "_").replace("Complex_","")
		logfile = ligand+"_log.txt"

		
		prot = f.split(os.path.sep)[1]

		min_affinity = 0

		logfile_read = open(folder+ "/" +logfile)
		values = []
		flag = False

		for line in logfile_read.readlines():
						# print(line)

			if flag == True and "Writing output ... done." not in line:

				table = line.split(' ')
				table = list(filter(('').__ne__, table))
				affinity = float(table[1])
				values.append(affinity)
			if "-----+------------+----------+----------" in line:
				flag = True
						# affinity calculation
		min_affinity = min(values)

		data.append([prot, ligand, complex, min_affinity])
		#//print(f"{data}\n")

	df = pd.DataFrame(data, columns=['Protein', 'Ligand', 'Complex', 'Affinity'])
	df.to_csv(protein+"_dbfile.txt", index=False)
