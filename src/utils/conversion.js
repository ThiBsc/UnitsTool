export const convert = (category, unitNameSrc, unitNameDest, value) => {
    const categoryObj = category;
    const reference = categoryObj.reference;

    const unitSrc = categoryObj.units.find(u => u.name === unitNameSrc);
    const unitDest = categoryObj.units.find(u => u.name === unitNameDest);

    const srcIsReference = (unitSrc.name === reference);
    //console.log('DEBUG', srcIsReference, unitSrc, unitDest);

    // If the source unity is not the reference, convert it to simplify
    if (!srcIsReference){
        // If we have to convert, the * is / and + is -, and vice versa
        if (unitSrc.reverseFormula)
            value = formulaToValue(unitSrc.reverseFormula, value, false);
        else
            value = formulaToValue(unitSrc.formula, value, true);
    }
    let newValue = formulaToValue(unitDest.formula, value, false);
    // Round to 2 decimals
    return twoDecimals(newValue);
}

const twoDecimals = (value) => {
    let log10 = value ? Math.floor(Math.log10(value)) : 0;
    let div = log10 < 0 ? Math.pow(10, 1 - log10) : 100;

    return Math.round(value * div) / div;
}

const formulaToValue = (formula, value, invertSign) => {
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