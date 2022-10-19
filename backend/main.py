from unittest import skip
import pymongo
import csv
import glob
import time
client = pymongo.MongoClient("mongodb+srv://root:dQgoXrUcrLa9zdME@cluster0.ibe2h.mongodb.net/?retryWrites=true&w=majority")
mydb = client["docking_metadata"]
proteins = mydb["proteins"]
ligands = mydb["ligands"]
models = mydb["protein models"]
mydb.drop_collection("2W8N_Complex")
mydb.drop_collection("3V83_Complex")
_2W8N_Complex = mydb["2W8N_Complex"]

_3V83_Complex = mydb["3V83_Complex"]
coll = mydb["3V83"]
def populate_csv(csvs):
    for csv_file_name in csvs:
        header = []
        
        with open(csv_file_name, encoding='utf-8-sig') as csvfile:
            csv_reader = csv.reader(csvfile, delimiter=',')
            count = 0
            if csv_file_name == 'natural-products.csv':
                for row in csv_reader:
                    if count == 0:
                    
                        for i in range(0, len(row)):
                            header.append(row[i])
                    else:
                        schema = {header[0]: row[0], header[1]: row[1]}
                        ligands.insert_one(schema)
                        print(f'{schema} inserted')
                    count = count+1
                header = []
            elif csv_file_name == 'Proteins_info.csv':
                for row in csv_reader:
                    if count == 0:
                    
                        for i in range(0, len(row)):
                            header.append(row[i])
                    else:
                        schema = {header[0]: row[0], header[1]: row[1], header[2]: row[2], header[8]: row[8], header[9]: row[9]}
                        proteins.insert_one(schema)
                        print(f'{schema} inserted')
                    count = count+1
                header = []
            elif csv_file_name == 'Proteins_Models_info.csv':
                for row in csv_reader:
                    if count == 0:
                    
                        for i in range(0, len(row)):
                            header.append(row[i])
                    else:
                        schema = {header[0]: row[0], header[1]: row[1], header[9]: row[9], header[10]: row[10]}
                        models.insert_one(schema)
                        print(f'{schema} inserted')
                    count = count+1
                header = []

def populate_txt():
    # add complexes
    # 2W8N
    txts_2W8N = glob.glob("public/data/2W8N_Complex/*.txt")
    print(txts_2W8N)
    _2W8N = "data/proteins/2W8N.pdb"
    # print(txts_2W8N)
    for i in txts_2W8N:
        min_affinity = 0
        print(i)
        with open(i, encoding='utf-8-sig') as file:
            
            
            flag = False
            values = []
            for line in file.readlines():
                    #print(line)
                    
                if flag == True and "Writing output ... done." not in line:

                    table = line.split(' ')
                    table = list(filter(('').__ne__, table))
                    affinity = float(table[1])
                    values.append(affinity)
                if "-----+------------+----------+----------" in line:
                    flag = True
                # affinity calculation
            min_affinity = min(values)

            file_name = i.replace('\\','/').split('/')[3]
            file_name_txt = file_name
            file_name = file_name.replace('.txt', '.pdb')
            print(file_name)
            doc = {"protein": _2W8N, "complex": 'data/ligand/'+file_name.replace("_log", ""), "Affinity": min_affinity}
            print(doc)
            _2W8N_Complex.insert_one(doc)
            
    txts_3V83 = glob.glob("public/data/3V83_Complex/*.txt")
    _3V83 = "data/proteins/3V83.pdb"
    for i in txts_3V83:
        min_affinity = 0
        
        with open(i, encoding='utf-8-sig') as file:

            flag = False
            values = []
            for line in file.readlines():
                    #print(line)
                    
                if flag == True and "Writing output ... done." not in line:

                    table = line.split(' ')
                    table = list(filter(('').__ne__, table))
                    affinity = float(table[1])
                    values.append(affinity)
                if "-----+------------+----------+----------" in line:
                    flag = True
                # affinity calculation
            min_affinity = min(values)
            print(i)
            file_name = i.replace('\\','/').split('/')[3]
            file_name_txt = file_name
            file_name = file_name.replace('.txt', '.pdb')
            print(file_name)
            print(file_name)
            doc = {"protein": _3V83, "complex": 'data/ligand/'+file_name.replace("_log", ""), "Affinity": min_affinity}
            print(doc)
            _3V83_Complex.insert_one(doc)
            
# Add file names to the list to upload all
# populate_csv(['Proteins_Models_info.csv'])
# populate_txt()

def any_csv_importer(csv_name):
    header = []

    with open(csv_name, encoding='utf-8-sig') as csvfile:
            csv_reader = csv.reader(csvfile, delimiter=',')
            header = []
            row_dict = {}
            flag = True
            for row in csv_reader:
                if flag:
                    header = row
                    flag = False
                else:   
                    for n in range(0, len(header)):
                        if n == 3:
                            row_dict[header[n]] = float(row[n])
                        else:
                            row_dict[header[n]] = row[n]
                        
                    coll.insert_one(row_dict)
                    row_dict = {}

any_csv_importer("public/data/3V83_dbfile.txt")