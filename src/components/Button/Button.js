import React from 'react';
import PropTypes from 'prop-types'
import './Button.css';

const marginSize = 5;

const Button = ({ id, value, action, width, height, bgColor }) => {
    const style = {
        margin: marginSize + 'px',
        width: width.indexOf('%') >= 0 ? `calc(${width} - ${marginSize * 2}px` : width,
        height: height.indexOf('%') >= 0 ? `calc(${height} - ${marginSize * 2}px` : height,
        backgroundColor: bgColor
    };

    return (
        // Using div instead of button to prevent browswer behaviour where enter
        // key fires click event on last active button (which causes miscalculation 
        // when enter key is used). "button" role added for screen readers.
        <div 
            id={id} 
            role="button" 
            style={style} 
            className="button" 
            onClick={() => action(value)}>{value}
        </div>
    );
}

Button.propTypes = {
    id: PropTypes.string,
    value: PropTypes.string,
    action: PropTypes.func,
    width: PropTypes.string,
    height: PropTypes.string,
    bgColor: PropTypes.string
}

export default Button;