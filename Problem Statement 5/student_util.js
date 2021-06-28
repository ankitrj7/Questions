let students = []

function searchByName(name) {
    let similarNamedStudents = students.filter(student => {
        //console.log(student.name + " ----- " + name);
        return student.name.includes(name)
    });

    console.log(similarNamedStudents);
    return similarNamedStudents;
}

function insert(name, roll, age, gender) {
    if (name.length == 0) {
        console.error("Invalid name");
        return false;
    }
    if (roll.length == 0) {
        console.error("Invalid roll number");
        return false;
    }
    if (age <= 0) {
        console.error("Invalid Age");
        return false;
    }
    if (gender != 'Male' && gender != 'Female') {
        console.error("Invalid Gender");
        return false;
    }
    
    students.push({
        name: name,
        age: age,
        rollno: roll,
        gender: gender
    });
    return true;
}

function deleteStudent(roll) {
    students = students.filter(student => student.rollno != roll);
}

function searchByRollNo(roll) {
    let sinmilarStudents = students.filter(student => student.rollno == roll);
    console.log(sinmilarStudents);
    return sinmilarStudents;
}

function createDeleteButton(roll) {
    let deleteButton = document.createElement("a");
    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("material-icons", "left");
    deleteIcon.setAttribute('roll', roll);
    deleteIcon.appendChild(document.createTextNode("delete"));
    deleteButton.classList.add("waves-effect", "waves-light", "btn-small", 'delete-btn');
    deleteButton.appendChild(deleteIcon);
    deleteButton.appendChild(document.createTextNode("Delete"));
    deleteButton.setAttribute('roll', roll);

    return deleteButton;
}

function showNoStudentsMessage() {
    let noStudentMessageContainer = document.getElementById("noStudents");
    if (noStudentMessageContainer) {
        noStudentMessageContainer.classList.remove("hide");
    }

    let fab = document.getElementById("fab");
    if (fab) {
        fab.classList.add("pulse");
    }

    let studentsListContainer = document.getElementById("studentsList");
    if (studentsListContainer) {
        studentsListContainer.classList.add("hide");
    }
    setEventListeners();
}

function showStudentsTable() {
    let noStudentMessageContainer = document.getElementById("noStudents");
    if (noStudentMessageContainer) {
        noStudentMessageContainer.classList.add("hide");
    }

    let fab = document.getElementById("fab");
    if (fab) {
        fab.classList.remove("pulse");
    }

    let studentsListContainer = document.getElementById("studentsList");
    if (studentsListContainer) {
        studentsListContainer.classList.remove("hide");
    }

    setEventListeners();
}

function populateTableData(tableRowData) {
    let tableBody = document.getElementById("studentsTableBody");
    if (tableBody) {
        tableBody.querySelectorAll('*').forEach(n => n.remove());

        tableRowData.forEach(row => tableBody.appendChild(row));
    }
}

function deleteEvent(event) {
    let roll = event.target.getAttribute("roll");
    console.log(roll);
    deleteStudent(roll);
    updateTable(students);
}

function getTableRows(students) {
    let studentRowDoms = [];

    students.forEach(student => {
        let tableRow = document.createElement("tr");
        tableRow.setAttribute('roll', student.rollno);

        let nameData = document.createElement("td");
        nameData.appendChild(document.createTextNode(student.name));

        let rollData = document.createElement("td");
        rollData.appendChild(document.createTextNode(student.rollno));

        let ageData = document.createElement("td");
        ageData.appendChild(document.createTextNode(student.age));

        let genderData = document.createElement("td");
        genderData.appendChild(document.createTextNode(student.gender));

        let deleteIcon = document.createElement("td");
        deleteIcon.appendChild(createDeleteButton(student.rollno));
        
        tableRow.appendChild(nameData);
        tableRow.appendChild(rollData);
        tableRow.appendChild(ageData);
        tableRow.appendChild(genderData);
        tableRow.appendChild(deleteIcon);

        studentRowDoms.push(tableRow);
    });

    return studentRowDoms;
}

function addEvent(ev) {
    console.log("Add event triggered");

    let form = document.getElementById("addForm");
    let data = Object.fromEntries(new FormData(form).entries());
    console.log(data);
    form.reset();
    insert(data.student_name, data.student_roll, data.student_age, data.gender);
    updateTable(students);
    var instance = M.Modal.getInstance(document.getElementById('addStudentModal'));
    instance.close();
}

function searchItems(ev) {
    let searchBar = document.getElementById("searchBar");
    let text = searchBar.value;
    
    updateTable(searchByName(text));
}

function setEventListeners() {
    var buttons = document.getElementsByClassName("delete-btn");

    for(let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', deleteEvent);
    }

    document.getElementById('addBtn').addEventListener('click', addEvent);

    document.getElementById('search').addEventListener('click', searchItems);
}

function updateTable(students) {
    if (students.length == 0) {
        showNoStudentsMessage();
    } else {
        populateTableData(getTableRows(students));
        showStudentsTable();
    }
}

document.addEventListener("DOMContentLoaded", function(event) { 
    console.log("Event Triggered");

    var elems = document.querySelectorAll('.modal');
    M.Modal.init(elems);

    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);

    updateTable(students);
});