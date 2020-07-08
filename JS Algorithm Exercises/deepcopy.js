
testObj = {
    a: "test",
    b: 3,
    c: { d: "testing", e: 7 },
    f: { nested: 1 }
}

test2 = {
    arr: [ [2,5], [3,1], [ [ undefined, null ], [ 'string', true ]]],
    c: { d: "testing", e: 7 },
    f: { nested: 1 }
}

test3 = {
    nested: {
        method: () => {
            console.log("this workd");
            
        },

        
    }
}

let count = 0;

const deepCopy = (obj) => {

    let copiedObject;

    if (typeof obj != 'object' && !Array.isArray(obj) || obj === null) { return obj } 

    copiedObject = Array.isArray(obj) ? [] : {} ;
    
    for (const key in obj) { copiedObject[key] = deepCopy(obj[key]); }

    return copiedObject;
    
}

newObject = deepCopy(test3);

// newObject.arr[2][0][1] = newObject.arr[2][0][1] == null;

// console.log(, "\n\n\n", test3.nested);

newObject.nested.method()