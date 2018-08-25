import React, { Component } from 'react';
import Display from './Display';
import Button from './Button';

const style = {
    width: 360,
    padding: '10px',
    border: '1px solid #E7E7E7',
    borderRadius: 10,
    boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.15)',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
}

const isOperator = (string) => {
    return string === 'x' || string === '-' || string === '+' || string === '/';
};

const isNumber = (value) => {
    return !isNaN(value) && value !== ' ';
};


export default class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formula: ['0'],
            isAnswer: false
        }

        this.getFormulaStart = this.getFormulaStart.bind(this);
        this.getFormulaEnd = this.getFormulaEnd.bind(this);
        this.clear = this.clear.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleBackSpace = this.handleBackSpace.bind(this);
        this.addNumber = this.addNumber.bind(this);
        this.addDecimal = this.addDecimal.bind(this);
        this.addOperator = this.addOperator.bind(this);
        this.calcAnswer = this.calcAnswer.bind(this);
        this.reverseNumber = this.reverseNumber.bind(this);
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    // Returns array of start to second last position of formula
    getFormulaStart() {
        return this.state.formula.slice(0, -1);
    }

    // Returns string of last position in array
    getFormulaEnd() {
        return this.state.formula.slice(-1)[0];
    }

    clear() {
        this.setState({ 
            formula: ['0'],
            isAnswer: false
        });
    }

    handleKeyDown(event) {
        const key = event.key;

        if (isNumber(key)) {
            this.addNumber(key);
        } else if (key === '.') {
            this.addDecimal();
        } else if(isOperator(key)) {
            this.addOperator(key);
        } else if(key === '*') {
            this.addOperator('x');
        } else if (key === 'Backspace') {
            this.handleBackSpace();
        } else if (key === 'Enter' || key === '=') {
            this.calcAnswer();
        } else if (key === 'Escape') {
            this.clear();
        }
    }

    addNumber(number) {
        const formulaStart = this.state.isAnswer ? [] : this.getFormulaStart();
        const formulaEnd = this.state.isAnswer ? '' : this.getFormulaEnd();
        let newFormula = [];

        if (typeof number !== 'string') { number = number.toString(); }

        if (formulaEnd === '0') {
            newFormula = [...formulaStart, number];
        } else if (isOperator(formulaEnd)) {
            newFormula = [...formulaStart, formulaEnd, number];
        } else {
            newFormula = [...formulaStart, formulaEnd.concat(number)];
        }

        this.setState({ 
            formula: newFormula,
            isAnswer: false
        });       
    }

    addDecimal() {
        const formulaStart = this.state.isAnswer ? [] : this.getFormulaStart();
        const formulaEnd = this.state.isAnswer ? '0' 
            : this.getFormulaEnd().length > 0 ? this.getFormulaEnd() : '0'; 
        let newFormula = [];

        if (formulaEnd.indexOf('.') >= 0) { return; }

        if (isOperator(formulaEnd)) {
            newFormula = [...formulaStart, formulaEnd, '0.'];
        } else {
            newFormula = [...formulaStart, formulaEnd.concat('.')]
        }

        this.setState({ 
            formula: newFormula,
            isAnswer: false
        });     
    }

    addOperator(operator) {
        const formulaStart = this.state.isAnswer ? [] : this.getFormulaStart();
        const formulaEnd = this.getFormulaEnd();
        let newFormula = [];

        if (isOperator(formulaEnd)) {
            newFormula = [...formulaStart, operator];
        } else {
            newFormula = [...formulaStart, formulaEnd, operator];
        }

        this.setState({ 
            formula: newFormula,
            isAnswer: false
        });    
    }

    reverseNumber() {
        let formulaStart = this.state.isAnswer ? [] : this.getFormulaStart();
        let formulaEnd = this.getFormulaEnd();

        if (isNaN(formulaEnd)) { return; }

        this.setState({ 
            formula: [...formulaStart, (parseFloat(formulaEnd) * -1).toString()],
            isAnswer: false
        });          
    }

    handleBackSpace() {
        if (this.state.isAnswer) { return this.clear(); }

        const formulaEnd = this.getFormulaEnd();
        const numFormulaEnd = formulaEnd.length > 1 
            ? formulaEnd.substring(0, formulaEnd.length -1) 
            : this.getFormulaStart().length > 0 ? '' : '0';
        this.setState({ formula: [...this.getFormulaStart(), numFormulaEnd] });
    }

    calcAnswer() {
        // Don't allow additional calculations on repeated presses of equals button
        if (this.state.isAnswer) { return };

        // Get clean formula without trailing operator, if one exists
        let lastElem = this.getFormulaEnd();
        let secondLastElem = this.getFormulaStart().slice(-1)[0];
        let formula = [];

        if (isNumber(lastElem)) {
            // Keep entire formula
            formula = this.state.formula;
        } else if (isNumber(secondLastElem)) {
            // Discard last element if not a number
            formula = this.getFormulaStart();
        } else {
            // Discard last two elements if not numbers.
            // Necessary for case where last element is empty
            // string and second last is operator
            formula = this.getFormulaStart().slice(0, -1);
        }

        let numFormula = formula.map((elem) => {
            return isNumber(elem) ? parseFloat(elem, 10) : elem;
        });

        // Multiplication/division before addition/subtraction
        const operations = [
            { 
                'x': (a, b) => a * b,
                '/': (a, b) => a / b
            }, {
                '+': (a, b) => a + b,
                '-': (a, b) => a - b
            }
        ];

        // Reduce formula array to single number element containing answer
        for (let ops of operations) {
            for (let i = 1; i < numFormula.length - 1; ) {
                const operator = numFormula[i];
                
                if (ops[operator]) {
                    const a = numFormula[i - 1];
                    const b = numFormula[i + 1];

                    numFormula = [
                        ...numFormula.slice(0, i - 1), 
                        ops[operator](a, b), 
                        ...numFormula.slice(i + 2)
                    ];
                } else {
                    i++;
                }
            }
        }

        // Limit decimal places and round away those floating point precision errors
        const precisionMultiplier = 1000000000000;
        const answerString = (Math.round(numFormula[0] * precisionMultiplier) / precisionMultiplier).toString();

        this.setState({ 
            formula: [...formula, '=', answerString],
            isAnswer: true
        });
    }

    render() {
        const formulaStart = this.getFormulaStart();
        const formulaEnd = this.getFormulaEnd();

        return (
            <div style={style}>
                <Display isAnswer={this.state.isAnswer} formulaStart={formulaStart} formulaEnd={formulaEnd}/>
                <div style={{ width: '100%', display: 'flex'}}>
                    <Button id='clear' value='AC' classes='button wide' action={this.clear} />              
                    <Button id='divide' value='/' classes='button standard' action={this.addOperator} />
                    <Button id='multiply' value='x' classes='button standard' action={this.addOperator} />
                </div>
                <div style={{ width: '100%', display: 'flex' }}>
                    <Button id='one' value={1} classes='button standard' action={this.addNumber} />
                    <Button id='two' value={2} classes='button standard' action={this.addNumber} />
                    <Button id='three' value={3} classes='button standard' action={this.addNumber} />
                    <Button id='subtract' value='-' classes='button standard' action={this.addOperator} />
                </div>
                <div style={{ width: '100%', display: 'flex' }}>
                    <Button id='four' value={4} classes='button standard' action={this.addNumber} />
                    <Button id='five' value={5} classes='button standard' action={this.addNumber} />
                    <Button id='six' value={6} classes='button standard' action={this.addNumber} />
                    <Button id='add' value='+'  classes='button standard' action={this.addOperator} />
                </div>
                <div style={{ width: '75%', display: 'flex', flexWrap: 'wrap' }}>
                    <Button id='seven' value={7} classes='button standard' action={this.addNumber} />
                    <Button id='eight' value={8} classes='button standard' action={this.addNumber} />
                    <Button id='nine' value={9} classes='button standard' action={this.addNumber} />
                    <Button id='reverse' value='&plusmn;' classes='button standard' action={this.reverseNumber} />  
                    <Button id='zero' value={0} classes='button standard' action={this.addNumber} />
                    <Button id='decimal' value={'.'} classes='button standard' action={this.addDecimal} />
                </div>
                <div style={{ width: '25%', display: 'flex' }}>
                    <Button id='equals' value='=' classes='button tall' action={this.calcAnswer} />               
                </div>
             </div>
        );
    }
}
