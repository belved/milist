import React from 'react'

import ButtonList from './buttonList.js'

import { findAll } from '../services/firestoreHelper.js'

class ButtonListSection extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            tuning: {},
            instrument: {},
            style: {}
        }
    }

    handleClick(i) {
        const elem = this.state.tuning
        elem[i].state++
        if(elem[i].state > 2) elem[i].state = 0
        this.setState({tuning: elem})
    }

    componentDidMount() {
        const fetchData = async () => {
            const tuningRes = await findAll("tuning")
            const instrumentRes = await findAll("instruments")
            const styleRes = await findAll("style")

            tuningRes.forEach((elem) => elem.state = 0)
            instrumentRes.forEach((elem) => elem.state = 0)
            styleRes.forEach((elem) => elem.state = 0)

            this.setState({
                tuning: tuningRes,
                instrument: instrumentRes,
                style: styleRes
            })
        }

        fetchData()
     }
    
    render(){
        return (
      <div>
          <ButtonList buttonListObject={this.state.tuning} onClick={this.handleClick.bind(this)}/>
      </div>
    );
  }
}

  export default ButtonListSection