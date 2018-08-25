import React from 'react';
import './Button.css';

const Button = (props) => {
    const { value, action } = props;

    return (
        <div id={props.id} className={props.classes} onClick={() => action(value)}>{value}</div>
    );
}

export default Button;