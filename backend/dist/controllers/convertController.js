"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 *
 *
 *       Complete the handler logic below
 *
 *
 */
const units = {
    volume: {
        l: 'liter',
        gal: 'gallon'
    },
    length: {
        mi: 'mile',
        km: 'kilometer'
    },
    weight: {
        lbs: 'pound',
        kg: 'kilogram'
    }
};
class ConverController {
    constructor() {
        this.getFirstLetterIndex = input => input.indexOf(input.match(/[a-zA-Z]/)); // Hint: Split the input by looking for the index of the first character.
        this.countOccurence = (text, separator) => text.split(separator).length - 1;
        this.getNum = input => {
            const firstLetterIndex = this.getFirstLetterIndex(input);
            const inputNum = input.slice(0, firstLetterIndex);
            const decCount = this.countOccurence(inputNum, '.');
            const fractionCount = this.countOccurence(inputNum, '/'); // count '/' occurence
            if (!fractionCount && decCount > 1)
                return null;
            if (firstLetterIndex == 0)
                return 1;
            if (firstLetterIndex === -1)
                return null; // no unit provided
            if (fractionCount > 1)
                return null; // there may only be one fraction
            if (fractionCount) {
                const numbersArr = inputNum.split('/');
                const validDecs = numbersArr
                    .map(n => this.countOccurence(n, '.'))
                    .every(count => count <= 1);
                if (!validDecs)
                    return null;
            }
            return eval(inputNum);
        };
        this.getUnit = input => {
            const unitKeys = Object.keys(units)
                .map(un => Object.keys(units[un]))
                .reduce((a, b) => a.concat(b));
            const firstLetterIndex = this.getFirstLetterIndex(input);
            const unit = input.slice(firstLetterIndex);
            if (unitKeys.includes(unit.toLowerCase()))
                return unit;
            else
                return null;
        };
        this.getReturnUnit = initUnit => {
            const unit = initUnit.toLowerCase();
            const returnUnits = {
                l: 'gal',
                gal: 'L',
                lbs: 'kg',
                kg: 'lbs',
                mi: 'km',
                km: 'mi'
            };
            return returnUnits[unit];
        };
        this.convert = (initNum, initUnit) => {
            const galToL = 3.78541;
            const lbsToKg = 0.453592;
            const miToKm = 1.60934;
            const unit = initUnit.toLowerCase();
            const convertTable = {
                gal: galToL,
                l: 1 / galToL,
                mi: miToKm,
                km: 1 / miToKm,
                lbs: lbsToKg,
                kg: 1 / lbsToKg
            };
            return Math.round(eval(initNum) * convertTable[unit] * Math.pow(10, 5)) / Math.pow(10, 5);
        };
        this.spellOutUnit = (unit, val) => {
            const primaryUnits = Object.keys(units);
            let result;
            const un = unit.toLowerCase();
            primaryUnits.forEach(k => {
                const metricKeys = Object.keys(units[k]);
                if (metricKeys.includes(un))
                    result = units[k][un];
            });
            return `${result}${eval(val) > 1 ? 's' : ''}`;
        };
        this.getString = (initNum, initUnit, returnNum, returnUnit) => `${initNum} ${this.spellOutUnit(initUnit, initNum)} converts to ${returnNum} ${this.spellOutUnit(returnUnit, returnNum)}`;
    }
}
exports.default = ConverController;
//# sourceMappingURL=convertController.js.map