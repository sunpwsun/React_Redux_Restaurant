import React, {Component} from 'react'
import './Title.css'
import { Icon, Tooltip, message } from 'antd'
import 'antd/dist/antd.css'
import * as service from '../../services/restaurants'
import OrderHistoryModal from '../OrderHistoryModal/OrderHistoryModal'

class Title extends Component {

    state = { 
        orderHistoryModalVisible: false,
        orders : []
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

        const payments = await service.getOrderHistory('test_user1')


        console.log('[payment history] result :', payments.status )
        if( payments.status === 200 ) {     // OK

            if( payments.data.length === 0 ) { // no data
console.log('[payment history] - no data' )
                this.showNoDataMessage()
            }
            else {  
console.log('[payment history]', payments.data )
                this.setState({
                    ...this,
                    orders: payments.data
                })
                this.showOrderHistoryModal()
            }
        }
        else {                                  // error
console.log('[payment history] - error', payments)
        }
    }


    render() {

        return (

           <div className='headerContainer'>
                <div className='headerItem'></div>
                <div className='headerItem'>Restaurant United</div>
                {
                    this.props.pathname === '/menu' ?
                        <div className='headerItem' >

                            <Tooltip title='View your order history'>
                                <Icon className='iconOrderHistory' onClick={this.showOrderHistory} type="ordered-list" theme="outlined" /> &nbsp;&nbsp; &nbsp; 
                            </Tooltip>
                            <Tooltip title='View cart'>
                                <span onClick={this.props.showDrawer} ><Icon className='iconCart' type="shopping-cart" theme="outlined" />({this.props.totalItems}) </span>
                            </Tooltip>
                        </div>
                    :
                        <div className='headerItem'> 

                            <Tooltip title='View your order history'>
                                <Icon className='iconOrderHistory' onClick={this.showOrderHistory} type="ordered-list" theme="outlined" /> &nbsp;&nbsp; 
                            </Tooltip>
                        </div>
                }


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

export default Title
