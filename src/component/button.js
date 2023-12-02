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

    render() {
      return (
        <div style={divStyle}>
          <div style={buttonStyle} onClick={() => this.props.onClick()}>
            {this.props.name} {this.props.state.toString()}
          </div>
        </div>
      );
    }
  }

  export default Button