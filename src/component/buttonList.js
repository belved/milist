import React from 'react';
import Button from './button';

const divStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '20px 0px 20px 20px'
  };

class ButtonList extends React.Component {
    handleClick(i) {
      this.props.onClick(i, this.props.buttonListObject)
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