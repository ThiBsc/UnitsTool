export const convert = (category, unitNameSrc, unitNameDest, value, roundToTwo = true) => {
    const categoryObj = category;
    const reference = categoryObj.reference;

    const unitSrc = categoryObj.units.find(u => u.name === unitNameSrc);
    const unitDest = categoryObj.units.find(u => u.name === unitNameDest);

    const srcIsReference = (unitSrc.name === reference);
    //console.log('DEBUG', srcIsReference, unitSrc, unitDest);

    let newValue = value;
    if (unitSrc.compositeUnits === true) {
        // /!\ Can't manage more than 2 composite units for now
        const firstPart = Math.floor(value);
        const secondPart = Number.parseInt(value.toString().split(/,|\./)[1]);
        let sumValue = convert(category, unitSrc.units[0], unitNameDest, firstPart, false);
        sumValue += convert(category, unitSrc.units[1], unitNameDest, secondPart, false);
        newValue = sumValue;
    } else if (unitDest.compositeUnits === true) {
        // Can't manage more than 2 composite units for now
        const firstPart = convert(category, unitNameSrc, unitDest.units[0], value, false);
        let secondPart = convert(category, unitDest.units[0], unitDest.units[1], firstPart % 1, false);
        // Clean
        secondPart = secondPart.toString().replace('.', '');
        newValue = Number.parseFloat(`${Math.floor(firstPart)}.${secondPart}`);
    } else {
        // If the source unity is not the reference, convert it to simplify
        if (!srcIsReference){
            // If we have to convert, the * is / and + is -, and vice versa
            if (unitSrc.reverseFormula)
                value = formulaToValue(unitSrc.reverseFormula, value, false);
            else
                value = formulaToValue(unitSrc.formula, value, true);
        }
        newValue = formulaToValue(unitDest.formula, value, false);
    }

    // Round to 2 decimals
    return roundToTwo ? twoDecimals(newValue) : newValue;
}

/* https://stackoverflow.com/questions/14002113/how-to-simplify-a-decimal-into-the-smallest-possible-fraction */
export const getlowestfraction = (value) => {
    // 1.0E-2 because itès rounded to 2 decimals
    let eps = 1.0E-2;
    let h, h1, h2, k, k1, k2, a, x;

    x = value;
    a = Math.floor(x);
    h1 = 1;
    k1 = 0;
    h = a;
    k = 1;

    while (x-a > eps*k*k) {
        x = 1/(x-a);
        a = Math.floor(x);
        h2 = h1; h1 = h;
        k2 = k1; k1 = k;
        h = h2 + a*h1;
        k = k2 + a*k1;
    }

    return `${k === 1 ? h : h + "/" + k}`;
}

export const twoDecimals = (value) => {
    let log10 = value ? Math.floor(Math.log10(value)) : 0;
    let div = log10 < 0 ? Math.pow(10, 1 - log10) : 100;

    return Math.round(value * div) / div;
}

export const formulaToValue = (formula, value, invertSign) => {
    let result = Number.parseFloat(value);
    const steps = formula.split(' ');
    
    for (let i = 0; i <= steps.length/2; i+=2) {
        let operator = steps[i];
        const stepValue = Number.parseFloat(steps[i+1]);

        if (invertSign){
            switch (operator) {
                case '+':
                    operator = '-';
                    break;
                case '-':
                    operator = '+';
                    break;
                case '*':
                    operator = '/';
                    break;
                case '/':
                    operator = '*';
                    break;
                default:
                    break;
            }
        }
        switch (operator) {
            case '+':
                result += stepValue;
                break;
            case '-':
                result -= stepValue;
                break;
            case '*':
                result *= stepValue;
                break;
            case '/':
                result /= stepValue;
                break;
            default:
                break;
        }
    }
    return result;
}