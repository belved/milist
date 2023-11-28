import { useState, useEffect } from 'react'

import ButtonList from './buttonList.js'

import { findAll } from '../services/firestoreHelper.js'

function ButtonListSection() {
    const [tuning, setTuning] = useState([])
    const [instrument, setInstrument] = useState([])
    const [style, setStyle] = useState([])

    const fetchData = async () => {
        setTuning(true)

        const tuningRes = await findAll("tuning")
        const instrumentRes = await findAll("instruments")
        const styleRes = await findAll("style")

        setTuning([...tuningRes])
        setInstrument([...instrumentRes])
        setStyle([...styleRes])
    }

    useEffect(() => {
        fetchData()
    }, [])
    
    return (
      <div>
          <ButtonList buttonList={tuning}/>
          <ButtonList buttonList={instrument}/>
          <ButtonList buttonList={style}/>
      </div>
    );
  }

  export default ButtonListSection