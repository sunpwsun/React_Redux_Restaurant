import React, {Component, Fragment} from 'react'
import './LikeTable.css'
import { Switch, Table } from 'antd'



class LikeTable extends Component {

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
        this.setState({
          sortedInfo: sorter
        })
    }

    render() {

        const { labels, datasets } = this.props
 
        let tableData = []
        
        for( let i = 0 ; i < labels.length ; i++ ) {
            tableData.push( {
                key : i + 1,
                name : labels[ i ],
                like : datasets[ 0 ].data[ i ],
                dislike : datasets[ 1 ].data[ i ]
            })
        }



        let { sortedInfo } = this.state;
        sortedInfo = sortedInfo || {};
        
        const columns = [

            {
                title: 'Menu Name',
                dataIndex: 'name',
                key: 'name'
            }, 
            {
                title: 'Like',
                dataIndex: 'like',
                key: 'like',
                sorter: (a, b) => a.like - b.like,
                sortOrder: sortedInfo.columnKey === 'like' && sortedInfo.order,
            }, 
            {
                title: 'Dislike',
                dataIndex: 'dislike',
                key: 'dislike',
                sorter: (a, b) => a.dislike - b.dislike,
                sortOrder: sortedInfo.columnKey === 'dislike' && sortedInfo.order,
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

export default LikeTable