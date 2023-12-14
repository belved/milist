import React from 'react';

const divStyle = {
  margin: '15px 0px 0px 0px'
}

const inputStyle = {
}

class TextInput extends React.Component {
    constructor(props) {
        super(props)
    }

    updateInputValue(evt) {
        const val = evt.target.value;
        this.props.onChange(val)
      }

    render() {
      return (
        <div style={divStyle}>
          <div style={inputStyle}>
            <input 
                placeholder={this.props.placeholderText}
                value={this.props.value} 
                onChange={evt => this.updateInputValue(evt)}/>
          </div>
        </div>
      );
    }
  }

  export default TextInput