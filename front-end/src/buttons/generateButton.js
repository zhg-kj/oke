//button to generate room codes
import React, {Component} from 'react';
import './buttons.css';
import GenerateRandomCode from 'react-random-code-generator';

export class GenerateButton extends Component {

    generateCode() {
        return GenerateRandomCode.TextCode(6).toUpperCase();
    }

    render() {
        return (
            <button className="generate">CREATE</button>
        );
    }
}

export default GenerateButton;