import React, { Component } from "react";

import "./calculator.css";

import Button from "../components/button/Button";
import Display from "../components/display/Display";

const initialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};

export default class Calculator extends Component {
  state = { ...initialState };

  constructor(props) {
    super(props);

    this.clearMemory = this.clearMemory.bind(this);
    this.setOperation = this.setOperation.bind(this);
    this.addDigit = this.addDigit.bind(this);
  }

  clearMemory() {
    this.setState({ ...initialState });
  }

  setOperation(operation) {
    /**
     * Se ao clicar nesta função o ESTADO "current" for igual a Zero,
     * será passado um novo estado para que os ESTADOS abaixo sejam
     * modificados.
     */
    if (this.state.current === 0) {
      this.setState({ operation, current: 1, clearDisplay: true });
    } else {
      const equals = operation === "=";
      const currentOperation = this.state.operation;

      /**
       * --Clonar o conteúdo do ESTADO value.
       * --Realizar a operação informada e armazenar o novo valor
       *   da na primeira posição do Array do ESTADO value.
       * --Zerar o valor da segunda posição do Array do ESTADO value
       */
      const values = [...this.state.values];
      try {
        values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`);
      } catch (e) {
        values[0] = this.state.values[0];
      }

      values[1] = 0;

      this.setState({
        displayValue: values[0],
        operation: equals ? null : currentOperation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values,
      });
    }
  }

  addDigit(n) {
    if (n === "." && this.state.displayValue.includes(".")) {
      return;
    }

    const clearDisplay =
      this.state.displayValue === "0" || this.state.clearDisplay;
    const currentValue = clearDisplay ? "" : this.state.displayValue;
    const displayValue = currentValue + n;
    /**
     * Se o nome da constante for igual ao nome do ESTADO só precisa
     * informar o nome atribuído uma única vez no setState, pois nomes
     * iguais reflentem no ESTADO
     *
     * MESMA COISA QUE ESCREVER:
     *  this.setState({ displayValue: displayValue, clearDisplay: false });
     *  */
    this.setState({ displayValue, clearDisplay: false });

    if (n !== ".") {
      const index = this.state.current;
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values];
      values[index] = newValue;
      /**
       * Se o nome da constante for igual ao nome do ESTADO só precisa
       * informar o nome atribuído uma única vez no setState, pois nomes
       * iguais reflentem no ESTADO
       *
       * MESMA COISA QUE ESCREVER APENAS:
       *  this.setState({ values });
       *  */
      this.setState({ values: values });
      console.log(values);
    }
  }

  render() {
    return (
      <div className="calculator">
        <Display value={this.state.displayValue} />
        <Button label="AC" click={this.clearMemory} triple />
        <Button label="/" click={this.setOperation} operation />
        <Button label="7" click={this.addDigit} />
        <Button label="8" click={this.addDigit} />
        <Button label="9" click={this.addDigit} />
        <Button label="*" click={this.setOperation} operation />
        <Button label="4" click={this.addDigit} />
        <Button label="5" click={this.addDigit} />
        <Button label="6" click={this.addDigit} />
        <Button label="-" click={this.setOperation} operation />
        <Button label="1" click={this.addDigit} />
        <Button label="2" click={this.addDigit} />
        <Button label="3" click={this.addDigit} />
        <Button label="+" click={this.setOperation} operation />
        <Button label="0" click={this.addDigit} double />
        <Button label="." click={this.addDigit} />
        <Button label="=" click={this.setOperation} operation />
      </div>
    );
  }
}
