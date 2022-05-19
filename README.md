# UnitsTool
An application to convert units

<div style="display: flex; flex-direction: row; justify-content: space-between;">
    <img alt="home" src="screenshot/home.png" style="width: 30%; height: 30%;"/>
    <img alt="temperature" src="screenshot/temperature.png" style="width: 30%; height: 30%;"/>
</div>

## Contribute
### By completing `conversion.json`
This file is the core of the application, it describe what is supposed to be displayed on the `Home` page, on each element in the list and the conversion formula to use.

> The `icon` key must have a value accepted on the [font-awesome](https://fontawesome.com/) website
#### Example of a category
```json
{
    "category": "mycategory",
    "title": "My Category",
    "icon": "tint",
    "reference": "UnityName",
    "units": [
        {
            "name": "UnityName",
            "symbol": "°C",
            "formula": "* 1"
        },
        {
            "name": "OtherUnity",
            "symbol": "°F",
            "formula": "* 1.8 + 32",
            "reverseFormula": "- 32 / 1.8"
        }
    ]
}
```
> The formula must always have a space between the `operand` and the `number` and there is no notion of mathematical priority. **It's always calculated in the order of the formula**.  
Also, for each `operand` you must have a following number and the first caracter must always be an operator (`+`, `-`, `*`, `/`).

## How to run

[React-native environment setup](https://reactnative.dev/docs/environment-setup)
```bash
# Run Metro in a terminal
npx react-native start
# Run the app
npx react-native run-android
```

## Resources

## docs
https://reactnative.dev/docs/getting-started  
https://reactnativeelements.com/    
https://reactnavigation.org/
