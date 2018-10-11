
import React, {Component} from 'react'
import { Modal, Button } from 'antd'
import Cards from 'react-credit-cards'
import ReactCreditCardFormContainer from '../../containers/ReactCreditCardFormContainer'

class CreditCardForm extends Component {

    render() {
        return (
            <div>
                <Modal
                    title="Check Out"
                    visible={this.props.visible}
                    onOk={this.props.onProcessPayment}
                    onCancel={this.props.onHide}
                    okText="Order"
                    cancelText="Cancel"
                >
                    <ReactCreditCardFormContainer
          
                    />

                </Modal>
            </div>
        )
    }
}


export default CreditCardForm
