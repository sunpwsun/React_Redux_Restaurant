import React, {Component, Fragment} from 'react'
import './MonthTable.css'
import { Switch, Table } from 'antd'
import { getToday, getTomorrow, getRandomColor } from  '../../utils/utils'



class MonthTable extends Component {

    state = {
        switch: false,
        sortedInfo: null,
        filteredInfo: null,
    }

    onSwitchChange = (checked) => {
        this.setState({
            switch: checked
        })
    }

    handleSortChange = (pagination, filters, sorter) => {
console.log('Various parameters', pagination, filters, sorter)
        this.setState({
            sortedInfo: sorter,
            filteredInfo: filters,
        })
    }

    clearFilters = () => {
        this.setState({ filteredInfo: null })
    }
    
    clearAll = () => {
        this.setState({
            filteredInfo: null,
            sortedInfo: null,
        })
    }

    render() {

        const { labels, datasets, menus } = this.props
console.log( 'labels', labels)     
console.log( 'datasets', datasets)   
console.log( 'menus', menus) 
        let tableData = []
        
        let cnt = 0
        for( let i = 0 ; i < datasets.length ; i++ ) {

            let menuName = ''
            for( let k = 0 ; k < menus.length ; k++ ) {
                if( menus[ k ].menuID == datasets[ i ].menuID ) {
                    menuName = menus[ k ].name
                    break
                }
            }
             

            for( let j = 0 ; j < datasets[ i ].data.length ; j++ ) {
                let data = {}
                cnt++
                data.key = cnt
                data.date = labels[ j ]
                data.name = menuName
                data.qty = datasets[ i ].dataQty[ j ]
                data.total = datasets[ i ].data[ j ]

                tableData.push( data )
            }
        }



        let { sortedInfo, filteredInfo } = this.state
        sortedInfo = sortedInfo || {}
        filteredInfo = filteredInfo || {}

        let dateFilter = []
        let nameFilter = []

        for( let i = 0 ; i < labels.length ; i++ ) {
            dateFilter.push({
                text: labels[ i ],
                value: labels[ i ]
            })
        }

        for( let i = 0 ; i < menus.length ; i++ ) {
            nameFilter.push({
                text: menus[ i ].name,
                value: menus[ i ].name
            })
        }



        const columns = [
            {
                title: 'Date',
                dataIndex: 'date',
                key: 'date',
                filters: dateFilter,
                filteredValue: filteredInfo.date || null,
                onFilter: (value, record) => record.date.includes(value),
            }, 
            {
                title: 'Menu Name',
                dataIndex: 'name',
                key: 'name',
                filters: nameFilter,
                filteredValue: filteredInfo.name || null,
                onFilter: (value, record) => record.name.includes(value),
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

export default MonthTable 

