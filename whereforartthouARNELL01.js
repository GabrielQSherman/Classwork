//1.
//intital variable decleration
var readline = require('readline'),
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    }),

    allObjects = [],
//creating the blueprint for users object entries
    prototypeObject = function() { };
    prototypeObject.prototype = { };

//2.
//opening menu functions 
//allows the user to search in objects or create a new object0
// search_or_create();
function search_or_create() {
    rl.question("\nwould you like to create and object or search within your objects for particular key/value pairs?\n____________\n(create/search)\nInput: ", (answer) => {
        answer = answer.trim().toLowerCase();
        switch (answer) {
            case 'create': 
                console.log("Okay, creating a new object...");
                createObject()

            break;

            case 'search':
                console.log("Okay, going to the search menu...");
                searchObject()
                
         
            break;
            default: console.log('please try again...');
            
            search_or_create()
            
        }
        
    } )
}

//3.
//taking user input to create a new object
var entries = 0;
createObject()
function createObject() {
    rl.question('What do you want your object to be called?\nInput: ', (objectName) => {
        entries++;
        prototypeObject.constructor = entries;

        var yourObject = new prototypeObject;
        yourObject.name = objectName;

        rl.question("Would you like to add a property to your object(y/n)\nInput: ", (yon) => {
            yon = yon.trim().toLowerCase().substring(0,1);
            if (yon === 'y') {

                add_property()
                function add_property() {

                    rl.question("What name would you like to give your property?\nInput: ", (propName) => {

                        propName = propName.trim();
                        let PVT;

                        rl.question("What type of primitive variable type would you like your property to have?('string', 'number', or 'boolean')\nInput: ", (propValueType) => {
                            propValueType = propValueType.trim().toLowerCase();

                            if (propValueType === 'string' || propValueType === 'number' || propValueType === 'boolean') {
                                
                            } else {
                                console.log('Not a valid variable type, try adding the property again...');
                                add_property();
                            }
                

                            rl.question("Now enter the value of this property\nInput: ", (propValue) => {
                                propValue = propValue.trim();
                                switch (propValueType) {
                                    case "string": 

                                    yourObject[propName] = propValue;

                                break;
                                case "number":

                                    propValue = parseInt(propValue);

                                    yourObject[propName] = propValue;

                                break;
                                case "boolean":

                                    if (propValue === "true") {
                                        yourObject[propName] = true;
                                    } else {
                                        yourObject[propName] = false;
                                    }

                                break;

                                }// end of switch adding prop

                                allObjects.push(yourObject);

                                console.log(allObjects);

                                rl.question("Would you like to create another object or go back to the main menu?\nInput: ", (answer) => {
                                    answer = answer.trim().toLowerCase().substring(0,1);
                                    switch (answer) {
                                        case "m": 
                                           search_or_create()
                                        break;
                       
                                        case "c":
                                           createObject()
                                        break;
                                        default: console.log('please try again...');
                                           search_or_create()
                                    }
                                }) // create an object or menu question

                            })//property value

                        }) //property type

                    })//property name 
                }
                
            } else {

                allObjects.push(yourObject);

            console.log(allObjects);

            rl.question("Would you like to create another object or go back to the main menu?(create/menu)\nInput: ", (answer) => {
             answer = answer.trim().toLowerCase().substring(0,1);
             switch (answer) {
                 case "m": 
                    search_or_create()
                 break;

                 case "c":
                    createObject()
                 break;
                 default: console.log('please try again...');
                    search_or_create()
             }
         }) //question 3
            
        }

        }) //question 2
  
    }) //question 1

} //END OF OBJECT CREATION

function searchObject() {
    rl.close()
}