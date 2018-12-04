import React, {Component, Fragment} from 'react'
import './MonthChart.css'
import { Switch } from 'antd'
import { getToday, getTomorrow, getRandomColor, getDateFromToday } from  '../../utils/utils'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import {Line} from 'react-chartjs-2'

const GET_MENUS = gql`
  query Menus($id: String!) {
    menus(id: $id) {
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

function onChange(checked) {
    console.log(`switch to ${checked}`);
  }


class MonthChart extends Component {
    // const data = {
    //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    //     datasets: [
    //       {
    //         label: 'My 1st dataset',
    //         fill: false,
    //         lineTension: 0.1,
    //         backgroundColor: 'rgba(75,192,192,0.4)',
    //         borderColor: 'rgba(75,192,192,1)',
    //         borderCapStyle: 'butt',
    //         borderDash: [],
    //         borderDashOffset: 0.0,
    //         borderJoinStyle: 'miter',
    //         pointBorderColor: 'rgba(75,192,192,1)',
    //         pointBackgroundColor: '#fff',
    //         pointBorderWidth: 1,
    //         pointHoverRadius: 5,
    //         pointHoverBackgroundColor: 'rgba(75,192,192,1)',
    //         pointHoverBorderColor: 'rgba(220,220,220,1)',
    //         pointHoverBorderWidth: 2,
    //         pointRadius: 1,
    //         pointHitRadius: 10,
    //         data: [25, 5, 8, 11, 15, 12, 21]
    //       },
      
    //       {
    //         label: 'My 2nd dataset',
    //         fill: false,
    //         lineTension: 0.1,
    //         backgroundColor: 'rgba(75,192,192,0.4)',
    //         borderColor: 'rgba(75,192,192,1)',
    //         borderCapStyle: 'butt',
    //         borderDash: [],
    //         borderDashOffset: 0.0,
    //         borderJoinStyle: 'miter',
    //         pointBorderColor: 'rgba(75,192,192,1)',
    //         pointBackgroundColor: '#fff',
    //         pointBorderWidth: 1,
    //         pointHoverRadius: 5,
    //         pointHoverBackgroundColor: 'rgba(75,192,192,1)',
    //         pointHoverBorderColor: 'rgba(220,220,220,1)',
    //         pointHoverBorderWidth: 2,
    //         pointRadius: 1,
    //         pointHitRadius: 10,
    //         data: [5, 8, 14, 22, 25, 13, 9]
    //       }
    //     ]
      
      
    //   };
      
    //   const options = {
    //     scales: {
    //         yAxes: [{
    //             stacked: true
    //         }]
    //     }
    //   }

    makeGraphData = (payments) => {

        let labels = []
        for( let i = 29 ; i >= 0 ; i-- )
            labels[ ( 29 - i ) ] = getDateFromToday( i + 1 )

 console.log('labels', labels)           


        let totalSales = []

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
                }
                else {
                    totalSales[ menu.name ] = menu.price
                    menuNames.push( menu.name )
                }
//     console.log(i, j, totalSales, totalItems, menuNames)           
            }
        }

        
//         let salesLabels = []
//         let salesDatasets = { data: [], backgroundColor: [] }
//         let salesOption = { title: {display: true, text: ['Total Sales'], fontStyle: 'bold', fontSize: 40}, legend: {
//             display: true,
//             position: "top",
//             labels: {
//                 fontColor: "#333",
//                 fontSize: 12
//             }
//         }}
//         let qtyLabels = []
//         let qtyDatasets = { data: [], backgroundColor: [] }
//         let qtyOption = { title: {display: true, text: ['Number of Sold Dishes'], fontStyle: 'bold', fontSize: 40}}
//         let totalSalesToday = 0
//         let totalQtyToday = 0

//         menuNames.forEach(e => {
//             const color = getRandomColor()
//             salesLabels.push( e )
//             salesDatasets.data.push( totalSales[ e ].toFixed(1) )
//             totalSalesToday += totalSales[ e ]
//             salesDatasets.backgroundColor.push( color )

//             qtyLabels.push( e )
//             qtyDatasets.data.push( totalItems[ e ] )
//             totalQtyToday += totalItems[ e ]
//             qtyDatasets.backgroundColor.push( color )
//         })

//         salesOption.title.text.push( '$ ' + totalSalesToday.toFixed(1) )
//         qtyOption.title.text.push( totalQtyToday )



//         const salesData = { labels: salesLabels, datasets:[ salesDatasets ], options: salesOption }
//         const qtyData   = { labels: qtyLabels,   datasets:[ qtyDatasets ],   options: qtyOption }
// console.log(salesData, qtyData)
const salesData = {}
const qtyData = {}
        return { salesData, qtyData }
    }



    render() {

        const from = getDateFromToday(30)
        const to = getToday()

        return( 

            <Query query={GET_PAYMENTS} variables={  { date1: from, date2: to, id: this.props.id } } >
            

                {({ data, loading, error }) => {
 //                   if (loading) return <Loading />;
                    if (loading) return <p>Loading...</p>
                    if (error) return <p>ERROR</p>
console.log(data.payments)

                    const graphData = this.makeGraphData(data.payments)



                        const data2 = {
        labels: ['2018-07-11', '2018-07-12', '2018-07-13', '2018-07-14', '2018-07-15', '2018-07-16', 
        '2018-07-17', '2018-07-18', '2018-07-11', '2018-07-11', '2018-07-11', '2018-07-11', 
        '2018-07-11', '2018-07-11', '2018-07-11', '2018-07-11', '2018-07-11', '2018-07-11', 
        '2018-07-11', '2018-07-11', '2018-07-11', '2018-07-11', '2018-07-11', '2018-07-11', 
        '2018-07-11', '2018-07-11', '2018-07-11', '2018-07-11', '2018-07-11', '2018-07-11' ],
                                    datasets: [
                                    {
                                        label: 'My 1st dataset',
                                        fill: false,
                                        lineTension: 0.1,
                                        backgroundColor: 'rgba(75,192,192,0.4)',
                                        borderColor: 'rgba(0,192,192,1)',
                                        borderCapStyle: 'butt',
                                        borderDash: [],
                                        borderDashOffset: 0.0,
                                        borderJoinStyle: 'miter',
                                        pointBorderColor: 'rgba(75,192,192,1)',
                                        pointBackgroundColor: '#fff',
                                        pointBorderWidth: 1,
                                        pointHoverRadius: 5,
                                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                                        pointHoverBorderWidth: 2,
                                        pointRadius: 1,
                                        pointHitRadius: 10,
           data: [25, 5, 8, 11, 15, 25, 5, 8, 11, 15, 12, 25, 5, 8, 11, 15, 12, 25, 5, 8, 11, 15, 12, 25, 5, 8, 11, 15, 12, 21]
                                    },
                                
                                    {
                                        label: 'My 2nd dataset',
                                        fill: false,
                                        lineTension: 0.1,
                                        backgroundColor: 'rgba(75,192,192,0.4)',
                                        borderColor: 'rgba(255,192,192,1)',
                                        borderCapStyle: 'butt',
                                        borderDash: [],
                                        borderDashOffset: 0.0,
                                        borderJoinStyle: 'miter',
                                        pointBorderColor: 'rgba(75,192,192,1)',
                                        pointBackgroundColor: '#fff',
                                        pointBorderWidth: 1,
                                        pointHoverRadius: 5,
                                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                                        pointHoverBorderWidth: 2,
                                        pointRadius: 1,
                                        pointHitRadius: 10,
        data: [5, 8, 14, 22, 25, 13,5, 5, 8, 14, 22, 25, 13,8, 14,22, 25, 13,8, 14,22, 25, 13,8, 14, 32, 22, 25, 13, 9]
                                    }
                                    ]
                                
                                
      };
      
      const opt = {
        scales: {
            yAxes: [{
                stacked: true
            }]
        }
      }
                    return (
                     
                            <div>
                                <h1 className='todayTitle'>Last 30 Days Salse Figures</h1>
                                <div className='lineChart'>
                                       
                                        <Line  data={data2} options={opt} />
                                    

                                </div>
                                <div className='tableToggle'>
                                    <Switch defaultChecked onChange={onChange} /> <span> Shows figures on table</span>
                                </div>
                            </div>
                 
                    );
                }}
            </Query>
        )
    }
}

export default MonthChart