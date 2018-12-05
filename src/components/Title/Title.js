import React, {Component} from 'react'
import './Title.css'
import { Icon, Tooltip, message, Badge } from 'antd'
import 'antd/dist/antd.css'
import * as service from '../../services/restaurants'
import OrderHistoryModal from '../OrderHistoryModal/OrderHistoryModal'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {Link} from 'react-router-dom'
import * as restaurantAction from  '../../store/modules/restaurant'



class Title extends Component {

    state = { 
        orderHistoryModalVisible: false,
        orders : []
    }

    logout = () => {

        // delete user
        this.props.RestaurantActions.logout()

        // go to the init page
        //this.props.history.push('/')
    }

    showNoDataMessage = () => {
        message.config({ top: 300 })
        message.info('No order history');
    }

    showOrderHistoryModal = () => {
        this.setState({
            orderHistoryModalVisible: true,
        })
    }
    
    hideOrderHistoryModal = () => {
        this.setState({
            orderHistoryModalVisible: false,
        })
    }

    showOrderHistory = async () => {
        this.showOrderHistoryModal()
        //const payments = await service.getOrderHistory('test_user1')
        const payments = await service.getOrderHistory(this.props.userID)

        console.log('[payment history] result :', payments.status )
        if( payments.status === 200 ) {     // OK

            if( payments.data.length === 0 ) { // no data
console.log('[payment history] - no data' )
this.hideOrderHistoryModal()
                this.showNoDataMessage()
            }
            else {  
console.log('[payment history]', payments.data )
                this.setState({
                    ...this,
                    orders: payments.data
                })
                
            }
        }
        else {                                  // error
console.log('[payment history] - error', payments)
        }

    }




    render() {

        let navIcons = null
        switch( this.props.pathname ) {
            case '/menu' :
                
                navIcons =  
                    <div className='headerItem' >

                        <Tooltip title='View your order history'>
                            <Icon className='iconOrderHistory' onClick={this.showOrderHistory} type="ordered-list" theme="outlined" /> &nbsp;&nbsp;
                        </Tooltip>
                        
                        <Tooltip title='View cart'>
                            <span className='iconCart' onClick={this.props.showDrawer} > <Icon  type="shopping-cart" theme="outlined" /><Badge count={this.props.totalItems} showZero></Badge> </span>
                            &nbsp;  
                        </Tooltip>
                        <Tooltip title={this.props.userID}>
                            <span><Icon className='iconUser' type="user" theme="outlined" /> </span>
                            &nbsp;  
                        </Tooltip>
                        <Tooltip title='Log out'>
                            <Link to='/'><span><Icon className='iconLogout' type="logout" theme="outlined" onClick={this.logout} /></span></Link>
                        </Tooltip>
                    </div> 
                   
                break
            case '/restaurant' :
                navIcons = 
                    <div className='headerItem'> 

                        <Tooltip title='View your order history'>
                            <Icon className='iconOrderHistory' onClick={this.showOrderHistory} type="ordered-list" theme="outlined" /> &nbsp;
                        </Tooltip>
                        <Tooltip title={this.props.userID}>
                            <span><Icon className='iconUser' type="user" theme="outlined" /> </span>
                            &nbsp; 
                        </Tooltip>

                        <Tooltip title='Log out'>
                            <Link  to='/'><span><Icon className='iconLogout' type="logout" theme="outlined" onClick={this.logout} /></span></Link>
                        </Tooltip>
                    </div>
                break

            // other cases, /, /signup, /stat
            default :
                //navIcons = <div className='headerItem'> &nbsp; </div>
                navIcons = 
                    <div className='headerItem'>
                        <Tooltip title='Sales Statistics'>
                            <Link to='/stat'><Icon className='salesStat' type="bar-chart" theme="outlined" /> &nbsp;</Link>
                        </Tooltip>

                    
                    </div>
                break
        }

        return (

           <div className='headerContainer'>
                <div className='headerItem'></div>
                <div className='headerItem'>Restaurant United</div>
                {navIcons}


                <OrderHistoryModal 
                    orders={this.state.orders}
                    visible={this.state.orderHistoryModalVisible}
                    hideOrderHistoryModal={this.hideOrderHistoryModal}
                    showOrderHistoryModal={this.showOrderHistoryModal}
                    />
            </div>

        )
    }
}

//export default Title

export default connect(
    (state) => ({
        userID : state.restaurant.userID
    }),
    (dispatch) => ({
        RestaurantActions: bindActionCreators(restaurantAction, dispatch)
    })
)( Title )
