import React, {Component} from 'react'
import {Icon} from 'antd'
//import './StatHeader.css'


class StatHeader extends Component {

    state = { 

    }



    render() {

    

        return (

           <div className='headerContainer'>
                <div className='headerItem'></div>
                <div className='headerItem'>Sales Statistics</div>
                <div className='headerItem'><Icon type="home" /></div>
            </div>

        )
    }
}

export default StatHeader
