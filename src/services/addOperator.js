import { checkOperator, getFormulaStart, getFormulaEnd } from '../helpers';

export const addOperator = (operator, formula, isAnswer) => {
    const formulaStart = isAnswer ? [] : getFormulaStart(formula);
    const formulaEnd = getFormulaEnd(formula);
    let newFormula = [];

    if (checkOperator(formulaEnd)) {
        newFormula = [...formulaStart, operator];
    } else {
        newFormula = [...formulaStart, formulaEnd, operator];
    }

    return { 
        formula: newFormula,
        isAnswer: false
    };   
}