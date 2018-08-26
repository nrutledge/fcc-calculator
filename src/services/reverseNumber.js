import { getFormulaStart, getFormulaEnd } from '../helpers';

export const reverseNumber = (formula, isAnswer) => {
    let formulaStart = isAnswer ? [] : getFormulaStart(formula);
    let formulaEnd = getFormulaEnd(formula);

    if (isNaN(formulaEnd)) { return; }

    return { 
        formula: [...formulaStart, (parseFloat(formulaEnd) * -1).toString()],
        isAnswer: false
    };   
}