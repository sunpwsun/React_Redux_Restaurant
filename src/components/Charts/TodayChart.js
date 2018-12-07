import React, {Component, Fragment} from 'react'
import './TodayChart.css'
import { DatePicker, Spin, Divider } from 'antd'
import moment from 'moment'
import { getToday, getTomorrow, getRandomColor } from  '../../utils/utils'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import {Doughnut} from 'react-chartjs-2'
import TodayTable from '../Table/TodayTable'

const GET_PAYMENTS = gql`
    query PaymentsDate($date: String!, $id: String!) {
        paymentsDate(date: $date, id: $id) {
            paymentID
            userID
            email
            restaurantID
            restaurantName
            cart {
                menuID
                name 
                items
                price
            }
            totalItems
            totalPrice
            dateTime
            date
            time
        }
    }
`





function disabledDate(current) {
    // Can not select days before today and today
    return current > moment().endOf('day');
  }



class TodayChart extends Component {


    state = {
        date: getToday()
    }


    makeGraphData = (payments) => {

        let totalSales = {}
        let totalItems = {}
        let menuNames = []


        // performance of the for-loop is much better than forEach
        // if there's numorous data to handle, must use for-loop

        let i
        for( i = 0 ; i < payments.length ; i++ ) {

            let j
            for( j = 0 ; j < payments[ i ].cart.length ; j++ ) {
                const menu = payments[ i ].cart[ j ]
                if( totalSales[ menu.name ] != undefined ) {         
                    totalSales[ menu.name ] += menu.price
                    totalItems[ menu.name ] += menu.items
                }
                else {
                    totalSales[ menu.name ] = menu.price
                    totalItems[ menu.name ] = menu.items
                    menuNames.push( menu.name )
                }   
            }
        }

        
        let salesLabels = []
        let salesDatasets = { data: [], backgroundColor: [] }
        let salesOption = { _title: {display: true, text: ['Total Sales'], fontStyle: 'bold', fontSize: 40, fontColor: '#06f'}}
        let qtyLabels = []
        let qtyDatasets = { data: [], backgroundColor: [] }
        let qtyOption = { _title: {display: true, text: ['Number of Sold Dishes'], fontStyle: 'bold', fontSize: 40, fontColor: '#06f'}}
        let totalSalesToday = 0
        let totalQtyToday = 0

        menuNames.forEach(e => {
            const color = getRandomColor()
            salesLabels.push( e )
            salesDatasets.data.push( totalSales[ e ].toFixed(1) )
            totalSalesToday += totalSales[ e ]
            salesDatasets.backgroundColor.push( color )

            qtyLabels.push( e )
            qtyDatasets.data.push( totalItems[ e ] )
            totalQtyToday += totalItems[ e ]
            qtyDatasets.backgroundColor.push( color )
        })

        salesOption._title.text.push( '$ ' + totalSalesToday.toFixed(1) )
        qtyOption._title.text.push( totalQtyToday )



        const salesData = { labels: salesLabels, datasets:[ salesDatasets ], options: salesOption }
        const qtyData   = { labels: qtyLabels,   datasets:[ qtyDatasets ],   options: qtyOption }
//console.log(salesData, qtyData)
        return { salesData, qtyData }
    }

    onDateChange = (e) => {
        console.log('new date:', e._d.toISOString().substring(0, 10))

        this.setState({
            date: e._d.toISOString().substring(0, 10)
        })
    }


    render() {

        const today = getToday()
        const tomorrow = getTomorrow()
console.log( 'today ', today, 'id', this.props.id)
        return( 

            <Query query={GET_PAYMENTS} variables={  { date: this.state.date, id: this.props.id } } >
            

                {({ data, loading, error }) => {
                    if (loading) return <div><Spin className='loading' tip='Loading...' size='large' /></div>
                    if (error) return <p>ERROR</p>

    console.log('data', data.paymentsDate)

                    const graphData = this.makeGraphData(data.paymentsDate)

                    return (
                     
                        <div className='chartBody'>
                            <div className='todayTitle'>
                                <div className='todayTitleContainer'>
                                <div className='todayTitleItem'></div>
                                    <div className='todayTitleItem'>Daily Sales Figures ({this.state.date})</div>
                                   
                                    <div className='todayTitleItem'><DatePicker  defaultValue={moment(this.state.date, 'YYYY-MM-DD')} 
                                                    format={'YYYY-MM-DD'} 
                                                    size={'large'} 
                                                    allowClear={false}
                                                    onChange={this.onDateChange}
                                                    disabledDate={disabledDate}
                                                    />
                                    </div>
                                </div>    
                            </div>
                            <div className='todayChartContainer'>
                                <div className='todayChartItem'>
                                    <div className='doughnutTitle' >{graphData.salesData.options._title.text[0]}</div>
                                    <div className='doughnutTitle' >{graphData.salesData.options._title.text[1]}</div>
                                    <hr />
                                    <Doughnut data={graphData.salesData} options={graphData.salesData.options} />
                                </div>
                                <div className='todayChartItem'>
                                    <div className='doughnutTitle' >{graphData.qtyData.options._title.text[0]}</div>
                                    <div className='doughnutTitle' >{graphData.qtyData.options._title.text[1]}</div>
                                    <hr />
                                    <Doughnut data={graphData.qtyData} options={graphData.qtyData.options}/>
                                </div>
                                
                            </div>
                            <div className='tableToggle'>
                                
                                <TodayTable salesData={graphData.salesData} qtyData={graphData.qtyData} />
                            </div>
                        </div>
                 
                    )
                }}
            </Query>
        )
    }
}

export default TodayChart