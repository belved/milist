import React from 'react';

const divStyle = {
  margin: '15px 15px 0px 0px', 
  width: '100px',
}

const selectedButtonStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  width: '100px',
  height: '55px',
  backgroundColor: 'orange',
  border: '1px solid black',
  borderRadius: '10px'
}

const buttonStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  width: '100px',
  height: '55px',
  border: '1px solid black',
  borderRadius: '10px'
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