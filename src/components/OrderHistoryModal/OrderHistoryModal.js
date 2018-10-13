
import React, {Component} from 'react'
import { Modal, Table } from 'antd'


class OrderHistoryModal extends Component {



    render() {

        const orders = this.props.orders

        // sorts by data and time (descending)
        orders.sort(function(a, b) {
            return a.dateTime > b.dateTime ? -1 : a.dateTime < b.dateTime ? 1 : 0 
        })

        const columns = [
            { title: 'Order #', dataIndex: 'order', key: 'order' },
            { title: 'Date/Time', dataIndex: 'date', key: 'date' },
            { title: 'Restaurant', dataIndex: 'restaurant', key: 'restaurant' },
            { title: 'Price', dataIndex: 'price', key: 'price' },
        ]
          
        let data = []
     
        for( let i = 0 ; i < orders.length ; i++ ) {
         
            const price = '$' + (orders[i].totalPrice/100).toFixed(2)
            const key = i+1
            const order ={
                key : key,
                order: orders[i].paymentID.$numberDecimal,
                date: orders[i].dateTime,
                restaurant: orders[i].restaurantName,
                price:price
            }
            data.push(order)
        }



        return (
            <div>
                <Modal
                    title="Order History"
                    visible={this.props.visible}

                    onCancel={this.props.hideOrderHistoryModal}
                    width={800}
                    footer={[]}
                >

                    <Table
                        columns={columns}
                        bordered
                        dataSource={data}
                        onRow={(record) => {
                            return {
                              onClick: () => {console.log('record:',record)}
                            }
                          }}
                    />




                </Modal>
            </div>
        )
    }
}


export default OrderHistoryModal
