var fs = require('fs');


//1.
var departmentNames2D = [];
function departmentNames() {
    //this one line does all the minipulation to the raw data that we need to then put it into a single dimensional array
    let data = fs.readFileSync('load_dept_names.txt', 'utf8').replace("INSERT INTO `departments` VALUES \n", "").replace(/\(|\'|\),|\);/g, '').split("\n");
    for (let i = 0; i < data.length; i++) {
        //i push the number of arrays i need for the three dimensional array here becuase this is the first and only loop that is ran only nine times
         employees3D.push([])
         //this puts our single dimension array into a 2D one
         data[i] = data[i].split(',');
        
    }
    //sends the 2D array to our global variable
    departmentNames2D = data;
}

//2.
var employees3D = [];
function departmentEmployees() {
    let data = fs.readFileSync('load_dept_emp.txt', 'utf8').replace('INSERT INTO `dept_emp` VALUES ', '').replace(/\(|\'|\),/g, '').split('\n');
    for (let i = 0; i < data.length; i++) {
        //this first if statment's condtion rules out any blank lines as well as employees that are not currently working
        if (data[i] != '' && data[i].includes('9999')) {

            data[i] = data[i].split(',')

            for (let j = 0; j < departmentNames2D.length; j++) {
                //^this for loop itterates through all possible departments to match the department id to the employee's department id, 
                //when a match is found it pushes that employees subarray to the 3D employee array
                if (data[i][1] == departmentNames2D[j][0]) {
                     employees3D[j].push(data[i]);
                }
            };
        }
    };
}

//3.
var salaries2D = []
function employeeSalaries() {
    salariesArray = [];
        var data = fs.readFileSync('load_salaries.txt', 'utf8').replace('INSERT INTO `salaries` VALUES ', '').replace(/\(|\'|\),/g, '').split('\n');
        for (let i = 0; i < data.length; i++) {
            data[i] = data[i].split(',');
            if (empNum + 1 < parseInt(data[i][3].substring(0,1))) {
                salariesArray.push([empNum, data[i][0].substring(0,1) ]);
            }
                for (var empNum = 0; empNum < parseInt(data[i][3].substring(0,1)); empNum++) {     
           }
        }
   
    console.log(salariesArray) 
}


departmentNames();
//console.log(departmentNames2D);
departmentEmployees();
//console.log(employees3D);   
employeeSalaries();



