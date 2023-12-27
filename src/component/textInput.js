import React from 'react';

const divStyle = {
  margin: '20px 0px 0px 20px',
}

const inputStyle = {
  border: '1px solid black',
  borderRadius : '10px',
  padding: '0px 0px 0px 20px',
  height: '40px',
  width: '20.3%'
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
          <div>
            <input 
                placeholder={this.props.placeholderText}
                value={this.props.value} 
                onChange={evt => this.updateInputValue(evt)}
                style={inputStyle}/>
          </div>
        </div>
      );
    }
  }

  export default TextInput