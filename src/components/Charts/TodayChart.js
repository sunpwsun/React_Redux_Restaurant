import React, {Component, Fragment} from 'react'
import './TodayChart.css'
import { Switch, Spin } from 'antd'
import { getToday, getTomorrow, getRandomColor } from  '../../utils/utils'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import {Doughnut} from 'react-chartjs-2'
import TodayTable from '../TodayTable/TodayTable'

const GET_PAYMENTS = gql`
    query Payments($date1: String!, $date2: String!, $id: String!) {
        payments(date1: $date1, date2: $date2, id: $id) {
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
        }
    }
`


class TodayChart extends Component {

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
//     console.log(i, j, totalSales, totalItems, menuNames)           
            }
        }

        
        let salesLabels = []
        let salesDatasets = { data: [], backgroundColor: [] }
        let salesOption = { title: {display: true, text: ['Total Sales'], fontStyle: 'bold', fontSize: 40}, legend: {
            display: true,
            position: "top",
            labels: {
                fontColor: "#333",
                fontSize: 12
            }
        }}
        let qtyLabels = []
        let qtyDatasets = { data: [], backgroundColor: [] }
        let qtyOption = { title: {display: true, text: ['Number of Sold Dishes'], fontStyle: 'bold', fontSize: 40}}
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

        salesOption.title.text.push( '$ ' + totalSalesToday.toFixed(1) )
        qtyOption.title.text.push( totalQtyToday )



        const salesData = { labels: salesLabels, datasets:[ salesDatasets ], options: salesOption }
        const qtyData   = { labels: qtyLabels,   datasets:[ qtyDatasets ],   options: qtyOption }
console.log(salesData, qtyData)
        return { salesData, qtyData }
    }



    render() {

        const today = getToday()
        const tomorrow = getTomorrow()

        return( 

            <Query query={GET_PAYMENTS} variables={  { date1: today, date2: tomorrow, id: this.props.id } } >
            

                {({ data, loading, error }) => {
                    if (loading) return <div><Spin className='loading' tip='Loading...' size='large' /></div>
                    //if (loading) return <p>Loading...</p>
                    if (error) return <p>ERROR</p>

    console.log(data.payments)

                    const graphData = this.makeGraphData(data.payments)

                    return (
                     
                            <div>
                                <h1 className='todayTitle'>Today Salse Figures ({today})</h1>
                                <div className='todayChartContainer'>
                                    <div className='todayChartItem'>
                                        {/* <h1 className='todayChars'>Total Revenue</h1> */}
                                        <Doughnut data={graphData.salesData} options={graphData.salesData.options} />
                                    </div>
                                    <div className='todayChartItem'>
                                        {/* <h1 className='todayChars'>Totoal Number of Dishes</h1> */}
                                        <Doughnut data={graphData.qtyData} options={graphData.qtyData.options}/>
                                    </div>
                                    
                                </div>
                                <div className='tableToggle'>
                                    
                                    <TodayTable salesData={graphData.salesData} qtyData={graphData.qtyData} />
                                </div>
                            </div>
                 
                    );
                }}
            </Query>
        )
    }
}

export default TodayChart