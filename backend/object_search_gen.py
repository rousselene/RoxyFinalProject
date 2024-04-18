f = open('all.txt')
l = []
for row in f.readlines():
    a = row.replace('\n','')
    l.append({"value": a, "label": a})

print(l)