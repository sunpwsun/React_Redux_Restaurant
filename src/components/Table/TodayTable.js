import React, {Component, Fragment} from 'react'
import './TodayTable.css'
import { Switch, Table } from 'antd'
import { getToday, getTomorrow, getRandomColor } from  '../../utils/utils'



class TodayTable extends Component {

    state = {
        switch: false,
        sortedInfo: null
    }

    onSwitchChange = (checked) => {
        console.log(`switch to ${checked}`);
        this.setState({
            switch: checked
        })
    }

    handleSortChange = (pagination, filters, sorter) => {
console.log('Various parameters', pagination, filters, sorter)
        this.setState({
          sortedInfo: sorter
        })
    }

    render() {

        const { salesData, qtyData } = this.props
console.log( 'salesData', salesData)     
console.log( 'qtyData', qtyData)   
        let tableData = []
        
        for( let i = 0 ; i < salesData.labels.length ; i++ ) {
            let data = {}
            data.key = i + 1
            data.name = salesData.labels[ i ]
            data.qty = qtyData.datasets[ 0 ].data[ i ]
            data.total = salesData.datasets[ 0 ].data[ i ]

            tableData.push( data )
        }



        let { sortedInfo } = this.state;
        sortedInfo = sortedInfo || {};
        
        const columns = [
            // {
            //     title: 'Menu ID',
            //     dataIndex: 'id',
            //     key: 'id'
            // }, 
            {
                title: 'Menu Name',
                dataIndex: 'name',
                key: 'name'
            }, 
            {
                title: 'Quantity',
                dataIndex: 'qty',
                key: 'qty',
                sorter: (a, b) => a.qty - b.qty,
                sortOrder: sortedInfo.columnKey === 'qty' && sortedInfo.order,
            }, 
            {
                title: 'Total ($)',
                dataIndex: 'total',
                key: 'total',
                sorter: (a, b) => a.total - b.total,
                sortOrder: sortedInfo.columnKey === 'total' && sortedInfo.order,
            }
        ]

        return( 

            <div>
                <Switch className='switch' checked={this.state.switch} onChange={this.onSwitchChange} /> <span> Shows figures on table</span>
                {this.state.switch &&
                    <Table className='todayTable' columns={columns} dataSource={tableData} onChange={this.handleSortChange} />
                }
            </div>
        )
    }
}

export default TodayTable