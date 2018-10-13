
import React, {Component} from 'react'
import { Modal, Button } from 'antd'
import Payments from '../Payments/Payments'

class PaymentModal extends Component {

    render() {

        const {cart, totalPrice, totalItems, onHide, onDrawClose } = this.props
console.log('cart, totalPrice, totalItems', cart, totalPrice, totalItems)
        return (
            <div>
                <Modal
                    title="Check Out"
                    visible={this.props.visible}
                    onOk={this.props.onProcessPayment}
                    onCancel={this.props.onHide}

                    onHide={this.props.onHide}
                    onDrawClose={this.props.onDrawClose}
                
                >

                    <Payments 
                    
                        cart = {cart}
                        totalPrice = {totalPrice}
                        totalItems = {totalItems}
                    />
                </Modal>
            </div>
        )
    }
}


export default PaymentModal
