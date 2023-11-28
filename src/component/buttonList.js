import React from 'react';
import Button from './button';

const divStyle = {
    display: 'flex'
  };

class ButtonList extends React.Component {
    render() {
      return (
        <div style={divStyle}>
            {this.props.buttonList.length > 0 && this.props.buttonList.map((tuning, i) => {
                return (<Button name={tuning.name}/>) 
            })}
        </div>
      );
    }
  }

  export default ButtonList