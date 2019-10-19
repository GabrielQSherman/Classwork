var fileSys = require('fs');

//file system method call back funciton

//GlobalVars
var globalDepartmentNames = [],
    DepartmentEmployees3D = [];



//1.
function deptnames() {
  
var data = fileSys.readFileSync('load_dept_names.txt', 'utf8');


    var departmentNames = data.replace(/\(|\'|\)/g, "");

    departmentNames = departmentNames.split('\n');
    
    for(var i=0 ; i < departmentNames.length; i++){
        departmentNames[i] = (departmentNames[i].substring(0, departmentNames[i].length-1));
        departmentNames[i] = departmentNames[i].split(',');
    }
    departmentNames.shift();
    globalDepartmentNames = departmentNames;
}

//2.
function deptemp() {
  deptnames();
 
  
  var data = fileSys.readFileSync('load_dept_emp.txt','utf8');
 
        var departmentEmployees = [];
        
        for (let i = 0; i < globalDepartmentNames.length; i++) {
          departmentEmployees.push([]);
          
        }

        var departmentEMPData = data.replace("INSERT INTO `dept_emp` VALUES ","").replace(/\(|\'\)|'/g, "");
        var tempDepartmentEmployee = departmentEMPData.split('\n');    
      
     for(i = 0; i < tempDepartmentEmployee.length ; i++) {
    
       if(tempDepartmentEmployee[i] == ""){
        tempDepartmentEmployee.splice(i, 1);
         --i;
       }else{
        
        tempDepartmentEmployee[i] = tempDepartmentEmployee[i].substring(0, tempDepartmentEmployee[i].length -1 ).split(',');
        if(tempDepartmentEmployee[i][3] != "9999-01-01") {
          tempDepartmentEmployee.splice(i, 1);
           --i;
        }
        let employeeIndex = tempDepartmentEmployee[i][1].substring(3, 4);      
        departmentEmployees[employeeIndex - 1].push(tempDepartmentEmployee[i]);
        
        DepartmentEmployees3D = departmentEmployees;
      
       }
      }
      
      //terminal check for correct Employee three dimensional array
      console.log(DepartmentEmployees3D);
      
      //First Report
     // firstDepartmentReport();

     //Second Report
     //secondDepartmentReport();
}
3.
// function departmentSalaries() {

//   var salaryData = fileSys.readFileSync('load_salaries.txt','utf8');
//   salaryData = salaryData.replace("INSERT INTO `salaries` VALUES ", "");
//   salaryData = salaryData.replace(/\(|'|\)\,/g, "").split("\n");

//   var employeeData = fileSys.readFileSync('load_employee.txt', 'utf8');
//   employeeData = employeeData.replace("INSERT INTO `employees` VALUES ", "");
//   employeeData = employeeData.replace(/\(|\'|\)\,/g, "").split("\n");
  
//   var salaryArray = [],
//    salaryGroup = [],
//    employeeArray = [],

  
//   for (let i = 0; i < salaryData.length; i++) {
    
//     salaryArray.push(salaryData[i].split(","));
//     salaryGroup.push([]);
//     salaryGroup[i].push(parseInt(salaryArray[i][0].replace(/1000|100/, "")));
//     salaryGroup[i].push(parseInt(salaryArray[i][1]));
//     //salaryGroup[i].push(parseInt())
//     salaryGroup[i].push(salaryArray[i][2]);
//   }

    
//   for (let i = 0; i < employeeData.length; i++) {
//     employeeArray.push(employeeData[i].split(","));
   
//       for (let i = 0; i < salaryArray.length; i++) {
//         if (salaryArray[i][1] == 0) {
      
//       }
    
//   };
//   };

//   console.log(employeeArray, salaryGroup);
//     //salaryData, salaryArray, salaryGroup, groupTotals , employeeArray);
// }


//disired display
function firstDepartmentReport() {
  for(var i = 0; i < globalDepartmentNames.length; i++){
    
    console.log("For the Department of", globalDepartmentNames[i][1] + ", the history of employee numbers are...");
    
    for(var j = 0; j < DepartmentEmployees3D[i].length; j++){
      
      console.log("Employee #:", DepartmentEmployees3D[i][j][0],);
  }
    console.log("The total number of employees the Departement of", globalDepartmentNames[i][1], "is " + DepartmentEmployees3D[i].length );
}}

function secondDepartmentReport() { 
//DepartentID, DepartmentName - Total employees:

  for (let i = 0; i < globalDepartmentNames.length; i++) {
      
   //console.log("The Department of", globalDepartmentNames[i][1], "has an ID of", globalDepartmentNames[i][0], ", the total number of employees in this department is "+ DepartmentEmployees3D[i].length );
   console.log(globalDepartmentNames[i][1], globalDepartmentNames[i][0], DepartmentEmployees3D[i].length );

  }
}

deptemp();
secondDepartmentReport()
//departmentSalaries()


