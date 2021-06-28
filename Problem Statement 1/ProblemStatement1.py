def group_by_owners(fileDictionary):
    answer = {}
    for fileName, ownerName in fileDictionary.items(): 
        answer[ownerName] = answer.get(ownerName, []) + [fileName]
    return answer

n = int(input("Enter the number of files: "))
fileDictionary = dict();
for _ in range(n):
	file_name = input("Enter the file name")
	owner = input("Enter the owner of file " + file_name)
	fileDictionary[file_name] = owner

print("The files grouped by owners are : ")
print(group_by_owners(fileDictionary))