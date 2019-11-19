var fs = require('fs'),

    companyDATA = {

        deptNames: fs.readFileSync('load_dept_names.txt', 'utf8').split('\,\n'),
        
        salaryArrayData: fs.readFileSync('load_salaries.txt', 'utf8').split('\,\n'),

        employeeArrayData: fs.readFileSync('load_employee.txt', 'utf8').split('\,\n'),

        deptEmpArrayData: fs.readFileSync('load_dept_emp.txt', 'utf8').split('\,\n'),

    };

    
    

    console.log(companyDATA.deptEmpArrayData);
    
    

