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

    handleClick(i, collection) {
        const elem = collection
        elem[i].state = !elem[i].state
        this.setState({collection: elem})
    }

    componentDidMount() {
        const fetchData = async () => {
            const tuningRes = await findAll("tuning")
            const instrumentRes = await findAll("instruments")
            const styleRes = await findAll("style")

            tuningRes.forEach((elem) => elem.state = false)
            instrumentRes.forEach((elem) => elem.state = false)
            styleRes.forEach((elem) => elem.state = false)

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
          <ButtonList buttonListObject={this.state.instrument} onClick={this.handleClick.bind(this)}/>
          <ButtonList buttonListObject={this.state.style} onClick={this.handleClick.bind(this)}/>
      </div>
    );
  }
}

  export default ButtonListSection