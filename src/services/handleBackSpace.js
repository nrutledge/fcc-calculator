import { getFormulaEnd, getFormulaStart } from '../helpers';
import { clear } from './'; 

export const handleBackSpace = (formula, isAnswer) => {
    if (isAnswer) { return clear(); }

    const formulaEnd = getFormulaEnd(formula);
    const numFormulaEnd = formulaEnd.length > 1 
        ? formulaEnd.substring(0, formulaEnd.length -1) 
        : getFormulaStart(formula).length > 0 ? '' : '0';

    return { 
        formula: [...getFormulaStart(formula), numFormulaEnd],
        isAnswer: false
    };
}