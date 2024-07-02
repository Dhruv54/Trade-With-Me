// pages/index.js or any other page/component

import React from 'react';
import Dropdown from '../components/DropDown';

const jsonData = {
    "NSE:BANKNIFTY24JUL52000CE": {"lastUpdate": "2024-07-02", "exSymbol": "BANKNIFTY", "qtyMultiplier": 1.0, "previousClose": 1097.2, "exchange": 10, "exSeries": "XX", "optType": "CE", "mtf_margin": 0.0, "is_mtf_tradable": 0, "exSymName": "BANKNIFTY24JUL52000CE", "symTicker": "NSE:BANKNIFTY24JUL52000CE", "exInstType": 14, "fyToken": "101124073150625", "upperPrice": 2132.5, "lowerPrice": 61.9, "segment": 11, "symbolDesc": "24 Jul 31 52000 CE", "symDetails": "24 Jul 31 52000 CE", "exToken": 50625, "strikePrice": 52000.0, "minLotSize": 15, "underFyTok": "101000000026009", "currencyCode": "INR", "underSym": "BANKNIFTY", "expiryDate": "1722420000", "tradingSession": "0915-1530|1815-1915:", "asmGsmVal": "", "faceValue": 0.0, "tickSize": 0.05, "exchangeName": "NSE", "originalExpDate": null, "isin": "", "tradeStatus": 1, "qtyFreeze": "900", "previousOi": 361485.0}, 
    "NSE:OBEROIRLTY24JUL1080CE": {"lastUpdate": "2024-07-02", "exSymbol": "OBEROIRLTY", "qtyMultiplier": 1.0, "previousClose": 0.0, "exchange": 10, "exSeries": "XX", "optType": "CE", "mtf_margin": 0.0, "is_mtf_tradable": 0, "exSymName": "OBEROIRLTY24JUL1080CE", "symTicker": "NSE:OBEROIRLTY24JUL1080CE", "exInstType": 15, "fyToken": "1011240725149735", "upperPrice": 842.45, "lowerPrice": 613.75, "segment": 11, "symbolDesc": "24 Jul 25 1080 CE", "symDetails": "24 Jul 25 1080 CE", "exToken": 149735, "strikePrice": 1080.0, "minLotSize": 700, "underFyTok": "101000000020242", "currencyCode": "INR", "underSym": "OBEROIRLTY", "expiryDate": "1721901600", "tradingSession": "0915-1530|1815-1915:", "asmGsmVal": "", "faceValue": 0.0, "tickSize": 0.05, "exchangeName": "NSE", "originalExpDate": null, "isin": "", "tradeStatus": 1, "qtyFreeze": "21000", "previousOi": 0.0}, 
    "NSE:SUNTV24JUL480PE": {"lastUpdate": "2024-07-02", "exSymbol": "SUNTV", "qtyMultiplier": 1.0, "previousClose": 0.0, "exchange": 10, "exSeries": "XX", "optType": "PE", "mtf_margin": 0.0, "is_mtf_tradable": 0, "exSymName": "SUNTV24JUL480PE", "symTicker": "NSE:SUNTV24JUL480PE", "exInstType": 15, "fyToken": "1011240725143599", "upperPrice": 20.05, "lowerPrice": 0.05, "segment": 11, "symbolDesc": "24 Jul 25 480 PE", "symDetails": "24 Jul 25 480 PE", "exToken": 143599, "strikePrice": 480.0, "minLotSize": 1500, "underFyTok": "101000000013404", "currencyCode": "INR", "underSym": "SUNTV", "expiryDate": "1721901600", "tradingSession": "0915-1530|1815-1915:", "asmGsmVal": "", "faceValue": 0.0, "tickSize": 0.05, "exchangeName": "NSE", "originalExpDate": null, "isin": "", "tradeStatus": 1, "qtyFreeze": "45000", "previousOi": 0.0},
    "NSE:ASTRAL24JUL3000CE": {"lastUpdate": "2024-07-02", "exSymbol": "ASTRAL", "qtyMultiplier": 1.0, "previousClose": 0.0, "exchange": 10, "exSeries": "XX", "optType": "CE", "mtf_margin": 0.0, "is_mtf_tradable": 0, "exSymName": "ASTRAL24JUL3000CE", "symTicker": "NSE:ASTRAL24JUL3000CE", "exInstType": 15, "fyToken": "101124072582911", "upperPrice": 20.75, "lowerPrice": 0.05, "segment": 11, "symbolDesc": "24 Jul 25 3000 CE", "symDetails": "24 Jul 25 3000 CE", "exToken": 82911, "strikePrice": 3000.0, "minLotSize": 367, "underFyTok": "101000000014418", "currencyCode": "INR", "underSym": "ASTRAL", "expiryDate": "1721901600", "tradingSession": "0915-1530|1815-1915:", "asmGsmVal": "", "faceValue": 0.0, "tickSize": 0.05, "exchangeName": "NSE", "originalExpDate": null, "isin": "", "tradeStatus": 1, "qtyFreeze": "11010", "previousOi": 0.0},
    "NSE:ASIANPAINT24AUG2260PE": {"lastUpdate": "2024-07-02", "exSymbol": "ASIANPAINT", "qtyMultiplier": 1.0, "previousClose": 0.0, "exchange": 10, "exSeries": "XX", "optType": "PE", "mtf_margin": 0.0, "is_mtf_tradable": 0, "exSymName": "ASIANPAINT24AUG2260PE", "symTicker": "NSE:ASIANPAINT24AUG2260PE", "exInstType": 15, "fyToken": "101124082994956", "upperPrice": 20.15, "lowerPrice": 0.05, "segment": 11, "symbolDesc": "24 Aug 29 2260 PE", "symDetails": "24 Aug 29 2260 PE", "exToken": 94956, "strikePrice": 2260.0, "minLotSize": 200, "underFyTok": "1010000000236", "currencyCode": "INR", "underSym": "ASIANPAINT", "expiryDate": "1724925600", "tradingSession": "0915-1530|1815-1915:", "asmGsmVal": "", "faceValue": 0.0, "tickSize": 0.05, "exchangeName": "NSE", "originalExpDate": null, "isin": "", "tradeStatus": 1, "qtyFreeze": "8000", "previousOi": 0.0}, 
    "NSE:ALKEM24AUG4100PE": {"lastUpdate": "2024-07-02", "exSymbol": "ALKEM", "qtyMultiplier": 1.0, "previousClose": 0.0, "exchange": 10, "exSeries": "XX", "optType": "PE", "mtf_margin": 0.0, "is_mtf_tradable": 0, "exSymName": "ALKEM24AUG4100PE", "symTicker": "NSE:ALKEM24AUG4100PE", "exInstType": 15, "fyToken": "101124082980283", "upperPrice": 33.55, "lowerPrice": 0.05, "segment": 11, "symbolDesc": "24 Aug 29 4100 PE", "symDetails": "24 Aug 29 4100 PE", "exToken": 80283, "strikePrice": 4100.0, "minLotSize": 100, "underFyTok": "101000000011703", "currencyCode": "INR", "underSym": "ALKEM", "expiryDate": "1724925600", "tradingSession": "0915-1530|1815-1915:", "asmGsmVal": "", "faceValue": 0.0, "tickSize": 0.05, "exchangeName": "NSE", "originalExpDate": null, "isin": "", "tradeStatus": 1, "qtyFreeze": "6000", "previousOi": 0.0},
};

const extractOptions = (data) => {
  return Object.values(data).map(item => ({
    symTicker: item.symTicker,
    symbolDesc: item.symbolDesc,
  }));
};

const HomePage = () => {
  const options = extractOptions(jsonData);

  return (
    <div>
      <h1>Select Option</h1>
      <Dropdown options={options} />
    </div>
  );
};

export default HomePage;
