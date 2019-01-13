import React, {Component} from 'react'
import {Icon} from 'antd'
import {Link} from 'react-router-dom'
//import './StatHeader.css'


class StatHeader extends Component {

    state = { 

    }



    render() {

    

        return (

           <div className='headerContainer'>
                <div className='headerItem'></div>
                <div className='headerItem'>Sales Statistics</div>
                <div className='headerItem'><Link to='/' ><Icon type="home" className='salesStat' /></Link></div>
            </div>

        )
    }
}

export default StatHeader
