import { checkOperator, getFormulaStart, getFormulaEnd } from '../helpers';

export const addNumber = (number, formula, isAnswer) => {
    const formulaStart = isAnswer ? [] : getFormulaStart(formula);
    const formulaEnd = isAnswer ? '' : getFormulaEnd(formula);

    let newFormula = [];

    if (typeof number !== 'string') { number = number.toString(); }

    if (formulaEnd === '0') {
        newFormula = [...formulaStart, number];
    } else if (checkOperator(formulaEnd)) {
        newFormula = [...formulaStart, formulaEnd, number];
    } else {
        newFormula = [...formulaStart, formulaEnd.concat(number)];
    }

    return { 
        formula: newFormula,
        isAnswer: false
    };
}