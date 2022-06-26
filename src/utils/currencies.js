import axios from "axios";
import { formulaToValue, twoDecimals } from "src/utils/conversion";

const managedCurrency = {
  'EUR': {name: 'Euro', symbol: '€', emoji: '🇪🇺'},
  'CAD': {name: 'Canadian dollar', symbol: '$', emoji: '🇨🇦'},
  'USD': {name: 'US dollar', symbol: '$', emoji: '🇺🇲'},
  'GBP': {name: 'Pound sterling', symbol: '£', emoji: '🇬🇧'},
  'JPY': {name: 'Japanese yen', symbol: '¥', emoji: '🇯🇵'},
  'CHF': {name: 'Swiss franc', symbol: 'CH', emoji: '🇨🇭'},
  'MXN': {name: 'Mexican peso', symbol: '$', emoji: '🇲🇽'},
  'AUD': {name: 'Australian dollar', symbol: '$', emoji: '🇦🇺'},
};

export const currencyCount = Object.keys(managedCurrency).length;

export const convertCurrency = (fxSrc, fxDest, value) => {
  const srcIsReference = (fxSrc.iso === 'EUR');
  // If the source unity is not the reference, convert it to simplify
  if (!srcIsReference){
    value = formulaToValue(`/ ${fxSrc.rate}`, value, false);
  }
  let newValue = formulaToValue(`* ${fxDest.rate}`, value, false);
  // Round to 2 decimals
  return twoDecimals(newValue);
}

export const getEuropeanCentralBankRates = async () => {
  let fxRate = {};
  try {
    const result = await axios.get('http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml');
    const data = result.data;
    const timeRegex = /<Cube time='(\d{4}-\d{2}-\d{2})'>/g;
    const timeMatch = timeRegex.exec(data);
    const currencyRegex = /<Cube currency='([A-Z]{3})' rate='(\d+\.\d+)'\/>/g;
    const currencyMatches = data.matchAll(currencyRegex);
    // Init with euro because it's the reference of ECB
    const currencies = [
      {iso: 'EUR', name: 'Euro', symbol: '€', emoji: '🇪🇺', rate: 1}
    ];
    for (const currency of currencyMatches) {
      const managed = managedCurrency[currency[1]];
      if (managed !== undefined) {
        managed['iso'] = currency[1];
        managed['rate'] = currency[2];
        currencies.push(managed);
      }
    }
    fxRate['day'] = timeMatch[1];
    //fxRate['rates'] = currencies.sort((a, b) => a.iso > b.iso);
    fxRate['rates'] = currencies;
  } catch (e) {
    console.log('Fail to get ECB rates', e);
  }
  return fxRate;
}
