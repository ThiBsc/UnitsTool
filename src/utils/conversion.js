export const conversion =
  Object.freeze(
    [
        {
            category: "distance",
            title: "Distances",
            icon: "ruler",
            reference: "Centimeter",
            units: [
                {
                    name: "Millimeter",
                    symbol: "mm",
                    formula: "* 10"
                },
                {
                    name: "Centimeter",
                    symbol: "cm",
                    formula: "* 1"
                },
                {
                    name: "Meter",
                    symbol: "m",
                    formula: "/ 100"
                },
                {
                    name: "Inch",
                    symbol: "in",
                    formula: "/ 2.54"
                },
                {
                    name: "Feet",
                    symbol: "ft",
                    formula: "/ 30.48"
                },
                {
                    name: "Miles",
                    symbol: "mi",
                    formula: "/ 160934"
                },
            ]
        },
        {
            category: "weight",
            title: "Poids",
            icon: "balance-scale",
            reference: "Gram",
            units: [
                {
                    name: "Gram",
                    symbol: "g",
                    formula: "* 1"
                },
                {
                    name: "Milligram",
                    symbol: "mg",
                    formula: "* 1000"
                },
                {
                    name: "KiloGram",
                    symbol: "kg",
                    formula: "/ 1000"
                },
                {
                    name: "Pounds",
                    symbol: "lbs",
                    formula: "/ 454"
                }
            ]
        },
        {
            category: "volume",
            title: "Volumes",
            icon: "cube",
            units: []
        },
        {
            category: "temperature",
            title: "Temperatures",
            icon: "thermometer-half",
            reference: "Celsius",
            units: [
                {
                    name: "Celsius",
                    symbol: "°C",
                    formula: "* 1"
                },
                {
                    name: "Fahrenheit",
                    symbol: "°F",
                    formula: "* 1.8 + 32"
                },
                {
                    name: "Kelvin",
                    symbol: "K",
                    formula: "+ 273.15"
                },
            ]
        }
    ]
  );

export const convert = (category, unitNameSrc, unitNameDest, value) => {
    const categoryObj = conversion.find(c => c.category === category);
    const reference = categoryObj.reference;

    const unitSrc = categoryObj.units.find(u => u.name === unitNameSrc);
    const unitDest = categoryObj.units.find(u => u.name === unitNameDest);

    const srcIsReference = (unitSrc.name === reference);
    //console.log('DEBUG', srcIsReference, unitSrc, unitDest);

    // If the source unity is not the reference, convert it to simplify
    if (!srcIsReference){
        // If we have to convert, the * is / and + is -, and vice versa
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