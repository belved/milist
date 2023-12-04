import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';

class DropdownMenu extends React.Component {
  
  callback(i) {
    this.props.callback(i+1)
  }

  render(){
    return (
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {this.props.menuName}
        </Dropdown.Toggle>
  
        <Dropdown.Menu>
          {this.props.menuList.length > 0 && this.props.menuList.map((elem, i) => {
            return(<Dropdown.Item onClick={() => this.callback(i)}>{elem.name}</Dropdown.Item>)
          })}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default DropdownMenu;