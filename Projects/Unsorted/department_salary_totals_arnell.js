var filesys = require("fs");

// 1. load_dept_names.txt

var departmentNames = "";

function deptNames() {
  departmentNames = filesys.readFileSync("load_dept_names.txt", "utf8");
  // filesys.readFile("load_dept_names.txt", "utf8", function(err, data) {
  // if (err) throw err
  departmentNames = departmentNames.replace(/\(|\'|\)/g, "");
  departmentNames = departmentNames.split("\n");

  for (var i = 0; i < departmentNames.length; i++) {
    departmentNames[i] = departmentNames[i].substring(0, departmentNames[i].length - 1);
    departmentNames[i] = departmentNames[i].split(",");
  }
  departmentNames.shift();
  // console.log(departmentNames);
}


// 2. load_dept_emp.txt

var departmentEmployees3D = "";
var newEmp3dData = [];

function departmentEmp() {
    var empData = filesys.readFileSync("load_dept_emp.txt", "utf8");
    
    empData = empData.replace("INSERT INTO `dept_emp` VALUES ", "");
    empData = empData.replace(/\(|\'|\),/g, "").split("\n");

    var newEmpData = [];
    

    for (var i = 0; i < empData.length; i++) {
        if (empData[i] != "" && empData[i].includes("9999")) {
                newEmpData.push(empData[i].split(","));
            }
    }

    for (var i = 0; i < departmentNames.length; i++) {
        newEmp3dData.push([]);
    }

    // for (var i = 0; i < )

    for (var i = 0; i < newEmpData.length; i++) {
      for (var j = 0; j < departmentNames.length; j++) {
        if (newEmpData[i][1] == departmentNames[j][0]) { // if it matches j equals the sub array index we want
          newEmp3dData[j].push(newEmpData[i]);
        }

      }
    }
    departmentEmployees3D = newEmp3dData;
    

    for (var i = 0; i < departmentNames.length; i++) {
     // console.log(departmentNames[i][0], departmentNames[i][1], newEmp3dData[i].length)
    }

    // console.log(newEmpData);
    //console.log(newEmp3dData);
  
    //console.log("--------------");
    
}

//3. load_salaries.txt

var departmentSalaries3D = "";
var newsalary3dData = [];

function departmentSalaries() {
    var salaryData = filesys.readFileSync("new_load_salaries.txt", "utf8");
    
    salaryData = salaryData.replace("INSERT INTO `salaries` VALUES ", "");
    salaryData = salaryData.replace(/\(|\'|\),/g, "").split("\n");

    var newSalaryData = [];
    

    for (var i = 0; i < salaryData.length; i++) {
        if (salaryData[i] != "" && salaryData[i].includes("9999")) {
          newSalaryData.push(salaryData[i].split(","));
            }
    }

    //console.log(departmentEmployees3D);


    for (var i = 0; i < departmentNames.length; i++) {
      newsalary3dData.push([]);
    }

    for (let i = 0; i < newEmp3dData.length; i++) {
      for (let j = 0; j < newEmp3dData[i].length; j++) {
     //  console.log(newEmp3dData[i][j][0]);
        for (let k = 0; k < newSalaryData.length; k++) {
          if (newSalaryData[k][0] == newEmp3dData[i][j][0]) {
            newSalaryData[k][1] = parseInt(newSalaryData[k][1], 10);
            newsalary3dData[i].push(newSalaryData[k]);
          }
        }
        
      }
      
    }

    for (let i = 0; i < newEmp3dData.length; i++) {
      var departSalaryTotal = 0;
      for (let j = 0; j < newEmp3dData[i].length; j++) {
        departSalaryTotal += newsalary3dData[i][j][1];
      }
      console.log(departmentNames[i][0] + "-", departmentNames[i][1] + ":", "$" + departSalaryTotal);
    }


}
//END OF 3.

deptNames();
departmentEmp();
departmentSalaries();


// deptId, deptName, total number of employees in dept
// d001, Marketing, 4

// departmentemployeetotals.js 
