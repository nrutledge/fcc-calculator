import { checkOperator, getFormulaStart, getFormulaEnd } from '../helpers';

export const addDecimal = (formula, isAnswer) => {
    const formulaStart = isAnswer ? [] : getFormulaStart(formula);
    const formulaEnd = isAnswer ? '0' 
        : getFormulaEnd(formula).length > 0 ? getFormulaEnd(formula) : '0'; 
    let newFormula = [];

    if (formulaEnd.indexOf('.') >= 0) { return; }

    if (checkOperator(formulaEnd)) {
        newFormula = [...formulaStart, formulaEnd, '0.'];
    } else {
        newFormula = [...formulaStart, formulaEnd.concat('.')]
    }

    return { 
        formula: newFormula,
        isAnswer: false
    };     
};