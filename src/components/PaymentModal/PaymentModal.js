
import React, {Component} from 'react'
import { Modal } from 'antd'
import Payments from '../Payments/Payments'

class PaymentModal extends Component {

    render() {

        const {cart, totalPrice, totalItems } = this.props
console.log('cart, totalPrice, totalItems', cart, totalPrice, totalItems)
        return (
            <div>
                <Modal
                    title="Check Out"
                    visible={this.props.visible}
                    onOk={this.props.onProcessPayment}
                    onCancel={this.props.onPaymentModalHide}

                   
                    onDrawClose={this.props.onDrawClose}
                    footer={[]}
                >

                    <Payments 
                    
                        cart = {cart}
                        totalPrice = {totalPrice}
                        totalItems = {totalItems}
                        onPaymentModalHide = {this.props.onPaymentModalHide}
                        onDrawClose ={this.props.onDrawClose}
                    />
                </Modal>
            </div>
        )
    }
}


export default PaymentModal
