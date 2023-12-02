import React from 'react';
import Button from './button';

const divStyle = {
    display: 'flex'
  };

class ButtonList extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        buttonListObject: props.buttonListObject
      }
    }

    handleClick(i) {
      this.props.onClick(i)
    }

    render() {
      return (
        <div style={divStyle}>
            {this.props.buttonListObject.length > 0 && this.props.buttonListObject.map((object, i) => {
                return (<Button 
                  name={object.name}
                  state={object.state}
                  onClick={() => this.handleClick(i)}/>) 
            })}
        </div>
      );
    }
  }

  export default ButtonList