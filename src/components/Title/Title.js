import React, {Component} from 'react'
import './Title.css'
import { Icon, Tooltip } from 'antd'
import 'antd/dist/antd.css'



class Title extends Component {


    render() {

        return (

           <div className='headerContainer'>
                <div className='headerItem'></div>
                <div className='headerItem'>Restaurant United</div>
                {
                    this.props.pathname === '/menu' ?
                        <div className='headerItem' >

                            <Tooltip title='View your order history'>
                                <Icon className='iconOrderHistory' onClick={this.props.showOrderHistory} type="bars" theme="outlined" /> &nbsp;&nbsp; &nbsp; 
                            </Tooltip>
                            <Tooltip title='View cart'>
                                <span onClick={this.props.showDrawer} ><Icon className='iconCart' type="shopping-cart" theme="outlined" />({this.props.totalItems}) </span>
                            </Tooltip>
                        </div>
                    :
                        <div className='headerItem'> 

                            <Tooltip title='View your order history'>
                                <Icon className='iconOrderHistory' onClick={this.props.showOrderHistory} type="bars" theme="outlined" /> &nbsp;&nbsp; 
                            </Tooltip>
                        </div>
                }
            </div>

        )
    }
}

export default Title
