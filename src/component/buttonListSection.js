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

    componentDidMount() {
        const fetchData = async () => {
            const tuningRes = await findAll("tuning")
            const instrumentRes = await findAll("instruments")
            const styleRes = await findAll("style")

            this.setState({
                tuning: tuningRes,
                instrument: instrumentRes,
                style: styleRes
            })

            console.log(tuningRes)
        }

        fetchData()
     }
    
    render(){
        return (
      <div>
          <ButtonList buttonList={this.state.tuning}/>
          <ButtonList buttonList={this.state.instrument}/>
          <ButtonList buttonList={this.state.style}/>
      </div>
    );
  }
}

  export default ButtonListSection