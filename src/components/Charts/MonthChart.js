import React, {Component, Fragment} from 'react'
import './MonthChart.css'
import { Switch, Spin } from 'antd'
import MonthTable from '../Table/MonthTable'
import { getToday, getTomorrow, getRandomColor, getDateFromToday } from  '../../utils/utils'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import {Line} from 'react-chartjs-2'

const GET_MENUS = gql`
    query Menus($id: String!) {
        menus(id: $id) {
            menuID
            name
        }
    }
`

const GET_DAILY_SALES = gql`
    query DailySalesPeriod( $date1: String!, $date2: String!, $id: String!) {
        dailySalesPeriod( date1: $date1, date2: $date2, id: $id) {
            _id {
                date
                restaurantID
                menuID
            }
            totalAmount
            totalQty
        }
    }
`



class MonthChart extends Component {


    makeGraphData = (sales, menu) => {

        
        let labels = []
        let datasets = []
        let menuCnt = 0

        // building labels
        sales.forEach(e => {
            if( labels.indexOf( e._id.date ) < 0 )
                labels.push( e._id.date )
        })

        labels.sort()


        // building datasets
        // each element represents a menu
        for( let i = 0 ; i < menu.length ; i++ ) {
            let dataset = {
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: getRandomColor(),
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
                pointHitRadius: 10
            }
            dataset.label = menu[ i ].name
            dataset.menuID = menu[ i ].menuID 
            dataset.data = []
            dataset.dataQty = []

            for( let j = 0 ; j < labels.length ; j++ ) {
                dataset.data[ j ] = 0
                dataset.dataQty[ j ] = 0
            }

            datasets.push( dataset )
        }
console.log("datasets ", datasets)

        sales.forEach( e => {
            let numDataset
            for( let i = 0 ; i < datasets.length ; i++ ) {
                if( datasets[ i ].menuID == e._id.menuID ) {

                    numDataset = i
 //console.log( 'i', i , menu[ i ].name, numDataset)                 
                    break
                }
            }

            const numData = labels.indexOf( e._id.date )

//console.log('numDataset ', e._id.menuID, numDataset, numData) 
            datasets[ numDataset ].data[ numData ] = e.totalAmount.toFixed(1)
            datasets[ numDataset ].dataQty[ numData ] = e.totalQty
            
        
        })
console.log("datasets ", datasets) 
        return { labels, datasets }
    }

    render() {

        const from = getDateFromToday(30)
        const to = getDateFromToday(1)
        let menus
        return( 
            <Fragment>
                <Query query={GET_MENUS} variables={  { id: this.props.id } } >
                    

                    {({ data, loading, error }) => {
            
                        if (loading) return <div><Spin className='loading' tip='Loading...' size='large' /></div>
                        if (error) return <p>!!! ERROR when fetching menu </p>

                        menus = data.menus
            
                        return (<Fragment></Fragment>)
                    }}
                </Query>

                <Query query={GET_DAILY_SALES} variables={  { date1: from, date2: to, id: this.props.id } } >
                
                    {({ data, loading, error }) => {
                        if (loading) return <div><Spin className='loading' tip='Loading...' size='large' /></div>
                        if (error) return <p>!!! ERROR when fetching sales fugures </p>
                        
                        const graphData = this.makeGraphData( data.dailySalesPeriod, menus )

                        const lineGraphData = {
                            labels: graphData.labels,
                            datasets: graphData.datasets
                        }

                        const opt = {
                            scales: {
                                yAxes: [{
                                    stacked: true,
                                    ticks: {
                                        // Include a dollar sign in the ticks
                                        callback: function(value, index, values) {
                                            return '$' + value;
                                        }
                                    }
                                },
                            ]
                            }
                        }
                        return (
                        
                            <div>
                                <div className='monthTitle'>Last 30 Days Sales Figures</div>
                                <div className='lineChart'>                                       
                                        <Line  data={lineGraphData} options={opt} />               
                                </div>

                                <div className='tableToggle'>
                            
                                    <MonthTable labels={graphData.labels} datasets={graphData.datasets} menus={menus}/>
                                </div>
                            </div>
                        )
                    }}
                </Query>
            </Fragment>
        )
    }
}

export default MonthChart