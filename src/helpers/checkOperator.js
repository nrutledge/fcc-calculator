import { symbols } from './symbols';

export const checkOperator = (char) => {
    if (typeof char !== 'string') { char = char.toString() }
    const charCode = char.charCodeAt(0);

    if (char === symbols.times || charCode === 215) {  return '*'; }
    if (char === symbols.divide || charCode === 247) { return '/'; }
    if (char === symbols.plus) { return '+'; }
    if (char === symbols.minus) { return '-'; }

    return '';
};