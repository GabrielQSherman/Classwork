var fs = require('fs');


//1.
var departmentNames2D = [];
function departmentNames() {
    //this one line does all the minipulation to the raw data that we need to then put it into a single dimensional array
    let data = fs.readFileSync('load_dept_names.txt', 'utf8').replace("INSERT INTO `departments` VALUES \n", "").replace(/\(|\'|\),|\);/g, '').split("\n");
    for (let i = 0; i < data.length; i++) {
        //i push the number of arrays i need for the three dimensional array here becuase this is the first and only loop that is ran only nine times
         employees3D.push([])
         salaries2D.push([]);
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
    //we declare what will become a 3D array of each employees yearly pay info 
    salariesArray3D = [];
    //first the data is read from load_salaries.txt and the unnecessary text characters are replaces with '' or nothing, then the data is split by '\n' into a 2D array
    var data = fs.readFileSync('load_salaries.txt', 'utf8').replace('INSERT INTO `salaries` VALUES ', '').replace(/\(|\'|\),/g, '').split('\n');
   
    //then a for loop iterates through every line of the 2D 'data' array and is split once again by ','
    for (let i = 0; i < data.length; i++) {
        data[i] = data[i].split(',');
        
        //this if statments checks if the first sub-element of each element in our subarray is greater than the 'employeeNumber' for loop iterator
        // if this is true a new subarray will be added to the salariesArray3D, this will become our 3D array with info from 'data' contained
        if (empNum < parseInt(data[i][0].substring(2,5))) {
            salariesArray3D.push([]);
        }
            //loop to count employee number
            for (var empNum = 0; empNum < parseInt(data[i][0].substring(2,5)); empNum++) {     
            }
    }
        //there will be one more subarray needed, the first one is not counted and i have not found a way to code around this problem yet
        salariesArray3D.unshift([]);
         //pushes all the employees yearly salaries into their indivdual subarray
        for (let i = 0; i < data.length; i++) {
            //this finds the subarray of 'salariesArray3D' that each employees data should be put in
            for (let j = 0; j < salariesArray3D.length; j++) {
                // +1 is needed so employee '10001' is put into the 0 index
                if (j + 1 == parseInt(data[i][0].substring(3,5)) ) {
                    //then data[i] is pushed to that sub-array
                    salariesArray3D[j].push(data[i])
                }
                
            }
           
        }
        //first two for loops give access to the dates within each employee who is currently working at the company
        for (let i = 0; i < employees3D.length; i++) {
            for (let j = 0; j < employees3D[i].length; j++) {
                //the two for loops below give access to all the employees in the 3D array of salaries
                for (let k = 0; k < salariesArray3D.length; k++) { 
                    
                    for (let g = 0; g < salariesArray3D[k].length; g++) {
                        //the if statment checks if the starting date matches the employee3D data
                        if(salariesArray3D[k][g][2] == employees3D[i][j][2]){
                            //although the start date is matched, you can still access the last salary entry of each employee
                            //using the length 
                           salaries2D[i].push(parseInt(salariesArray3D[k][salariesArray3D[k].length - 1][1]));
                        }    
                    }
                } 
            }  
            
        }
        //adds all the salaries into one total which will become the 0 index on each department subarray(this is a subarray for each department even if no values were entered)
        for (let i = 0; i < salaries2D.length; i++) {
        
            for (let j = 0; j < salaries2D[i].length; j++) {
                if (salaries2D[i][0] != salaries2D[i][j]){
                    salaries2D[i][0] += salaries2D[i][j];
                } else {
                    salaries2D[i].unshift(0);
                } 
            }
            //adds a total value of 0 to empty arrays
            if(salaries2D[i].length == 0) {
                salaries2D[i].push(0);
            }  
        }
}


departmentNames();
//console.log(departmentNames2D);
departmentEmployees();
//console.log(employees3D);   
employeeSalaries();
console.log(salaries2D) 
    


