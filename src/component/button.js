import React from 'react';

const divStyle = {
  margin: '15px 15px 0px 0px', 
  width: '100px',
  height: '75px'
}

const selectedButtonStyle = {
  width: '100px',
  height: '45px',
  backgroundColor: 'green'
}

const buttonStyle = {
  width: '100px',
  height: '45px'
}

class Button extends React.Component {

    render() {
      return (
        <div style={divStyle}>
          {this.props.state ? 
          <div style={selectedButtonStyle} onClick={() => this.props.onClick()}>
            {this.props.name}
          </div> 
          : 
          <div style={buttonStyle} onClick={() => this.props.onClick()}>
            {this.props.name}
          </div>}
          
        </div>
      );
    }
  }

  export default Button