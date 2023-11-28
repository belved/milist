import React from 'react';

const divStyle = {
  margin: '15px 0px 0px 0px'
}

const inputStyle = {
}

class TextInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValue: ''
        };
    }

    updateInputValue(evt) {
        const val = evt.target.value;
        this.setState({
          inputValue: val
        });
      }

    render() {
      return (
        <div style={divStyle}>
          <div style={inputStyle}>
            <input 
                placeholder={this.props.placeholderText}
                value={this.state.inputValue} 
                onChange={evt => this.updateInputValue(evt)}/>
          </div>
        </div>
      );
    }
  }

  export default TextInput