# UnitsTool
[<img alt="Donate using Liberapay" src="https://liberapay.com/assets/widgets/donate.svg">](https://liberapay.com/thibsc/donate) [![License: GPLv3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://opensource.org/licenses/gpl-3.0)   
An application to convert units  
Available languages : 🇬🇧, 🇫🇷, 🇪🇸

[<img alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' height="75"/>](https://play.google.com/store/apps/details?id=com.unitstool)
[<img src="https://fdroid.gitlab.io/artwork/badge/get-it-on.png" height="75">](https://f-droid.org/packages/com.unitstool/)

<div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-between; align-items: center;">
    <img alt="home" src="screenshot/home.png" style="width: 24%; height: 24%;"/>
    <img alt="languages" src="screenshot/languages.png" style="width: 24%; height: 24%;"/>
    <img alt="category" src="screenshot/category.png" style="width: 24%; height: 24%;"/>
    <img alt="currency" src="screenshot/currency.png" style="width: 24%; height: 24%;"/>
    <img alt="temperature" src="screenshot/darkmode.png" style="width: 24%; height: 24%;"/>
</div>

## Privacy
This application does not store or use any data from the user 

## How to use

* Select the category you want by touching it
* Select your favorite unit by touching the star
* Enter your value to convert

> If the `conversion.json` file is updated, no need to update the application,  
> You just have to Pull down the list in the `Home` screen 👇

## Contribute

### Helping for a beautiful app icon
if someone can make a beautiful icon for this app, it will be very appreciate !

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

### Before generate Android bundle

```sh
cd android/app/
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output src/main/assets/index.android.bundle
```