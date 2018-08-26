import React, { Component } from 'react';
import './Calculator.css';
import Display from '../Display/Display';
import Button from '../Button/Button';
import { getFormulaStart, getFormulaEnd, isNumber, symbols} from '../../helpers';
import {
    addNumber,
    addDecimal,
    addOperator,
    calcAnswer,
    clear,
    handleBackSpace,
    reverseNumber
} from '../../services';

export default class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formula: ['0'],
            isAnswer: false
        }
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleInput);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleInput);
    }

    handleInput = (event) => {
        console.log('symbol ', symbols.plusMinus);
        console.log('key ', event.key);

        const { formula, isAnswer} = this.state;
        const key = (event.key) ? event.key : (typeof event === 'string') ? event : null;

        if (!key) { return };
        
        if (isNumber(key)) { 
            return this.setState(addNumber(key, formula, isAnswer)); 
        }

        if (key === symbols.decimal) { 
            return this.setState(addDecimal(formula, isAnswer)); 
        }

        if (key === symbols.times || key === '*') { 
            return this.setState(addOperator(symbols.times, formula, isAnswer)); 
        }

        if (key === symbols.divide || key === '/') { 
            return this.setState(addOperator(symbols.divide, formula, isAnswer)); 
        }

        if (key === '+') { 
            return this.setState(addOperator(symbols.plus, formula, isAnswer)); 
        }

        if (key === '-') { 
            return this.setState(addOperator(symbols.minus, formula, isAnswer)); 
        }

        if (key === 'Backspace') { 
            return this.setState(handleBackSpace(formula, isAnswer)); 
        }

        if (key === 'Escape' || key === symbols.clear) { 
            return this.setState(clear(formula, isAnswer)); 
        }

        if (key === 'Enter' || key === symbols.equals) { 
            return this.setState(calcAnswer(formula, isAnswer)); 
        } 

        if (key === symbols.plusMinus || key === '_') { 
            return this.setState(reverseNumber(formula, isAnswer)); 
        }
    };

    render() {
        const formulaStart = getFormulaStart(this.state.formula);
        const formulaEnd = getFormulaEnd(this.state.formula);

        return (
            <div className='Calculator'>
                <Display isAnswer={this.state.isAnswer} formulaStart={formulaStart} formulaEnd={formulaEnd}/>
                <div style={{ width: '100%', display: 'flex'}}>
                    <Button id='clear' value={symbols.clear} type='wide blue' action={this.handleInput} />              
                    <Button id='divide' value={symbols.divide} type='standard blue' action={this.handleInput}/>
                    <Button id='multiply' value={symbols.times} type='standard blue' action={this.handleInput}/>
                </div>
                <div style={{ width: '100%', display: 'flex' }}>
                    <Button id='one' value={'1'} type='standard' action={this.handleInput}/>
                    <Button id='two' value={'2'} type='standard' action={this.handleInput}/>
                    <Button id='three' value={'3'} type='standard' action={this.handleInput}/>
                    <Button id='subtract' value={symbols.minus} type='standard blue' action={this.handleInput}/>
                </div>
                <div style={{ width: '100%', display: 'flex' }}>
                    <Button id='four' value={'4'} type='standard' action={this.handleInput}/>
                    <Button id='five' value={'5'} type='standard' action={this.handleInput}/>
                    <Button id='six' value={'6'} type='standard' action={this.handleInput}/>
                    <Button id='add' value={symbols.plus} type='standard blue' action={this.handleInput}/>
                </div>
                <div style={{ width: '75%', display: 'flex', flexWrap: 'wrap' }}>
                    <Button id='seven' value={'7'} type='standard' action={this.handleInput}/>
                    <Button id='eight' value={'8'} type='standard' action={this.handleInput}/>
                    <Button id='nine' value={'9'} type='standard' action={this.handleInput}/>
                    <Button id='reverse' value='&plusmn;' type='standard' action={this.handleInput}/>  
                    <Button id='zero' value={'0'} type='standard' action={this.handleInput}/>
                    <Button id='decimal' value={symbols.decimal} type='standard' action={this.handleInput}/>
                </div>
                <div style={{ width: '25%', display: 'flex' }}>
                    <Button id='equals' value={symbols.equals} type='tall blue' action={this.handleInput}/>               
                </div>
             </div>
        );
    }
}
