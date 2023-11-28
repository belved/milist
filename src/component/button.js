import React from 'react';

const divStyle = {
  margin: '15px 15px 0px 0px', 
  width: '100px',
  height: '75px'
}

const buttonStyle = {
  width: '100px',
  height: '45px'
}

class Button extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isSelected: false,
        };
    }

    render() {
      return (
        <div style={divStyle}>
          <div style={buttonStyle} onClick={() => this.setState({isSelected: !this.state.isSelected})}>
            {this.props.name}{this.state.isSelected? " v" : " x"}
          </div>
        </div>
      );
    }
  }

  export default Button