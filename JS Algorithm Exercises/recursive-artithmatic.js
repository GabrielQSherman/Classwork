console.log('im alive');

const noRecurSumOrFact = (num, isSum) => {

    if (num < 1) return 'number provided is too small';

    let summation = isSum ? 0 : 1;
    
    for (let i = num; i >= 1; i--) { 

        if (isSum) {
            summation += i;
        } else {
            summation *= i;
        }        

    }

    const bInt = BigInt(summation);

    return bInt.toString()
    
}

const recersiveArithmatic = ( num ) => {
        
    if (num > 0) {
        // console.log(num);

        return num * recersiveArithmatic(num-1)
    
    }

    return num

}

// console.log(noRecurSumOrFact(10))
// 10 * 9 * 8 * 7 * 6 * 5 * 4 * 3 * 2 * 1 = 320
console.log(recersiveArithmatic(3))
