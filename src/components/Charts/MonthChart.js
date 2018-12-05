import React, {Component, Fragment} from 'react'
import './MonthChart.css'
import { Switch, Spin } from 'antd'
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
            count
        }
    }
`

function onChange(checked) {
    console.log(`switch to ${checked}`);
}



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

            for( let j = 0 ; j < labels.length ; j++ ) 
                dataset.data[ j ] = 0

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
            
                        if (loading) return <p>Menu Loading...</p>
                        if (error) return <p>Menu ERROR</p>

                        menus = data.menus
            
                        return (<Fragment></Fragment>)
                    }}
                </Query>

                <Query query={GET_DAILY_SALES} variables={  { date1: from, date2: to, id: this.props.id } } >
                
                    {({ data, loading, error }) => {
                        if (loading) return <div><Spin className='loading' tip='Loading...' size='large' /></div>
                        if (error) return <p>ERROR</p>
    console.log("dailySalesPeriod - ", data.dailySalesPeriod)
console.log('menu A- ', menus)
                        
                            const graphData = this.makeGraphData( data.dailySalesPeriod, menus )

                            const lineGraphData = {
                                labels: graphData.labels,
                                datasets: graphData.datasets
                            }

                            const data2 = {
                                        labels: ['2018-07-11', '2018-07-12', '2018-07-13', '2018-07-14', '2018-07-15', '2018-07-16',  '2018-07-17', '2018-07-18', '2018-07-11', '2018-07-11', '2018-07-11', '2018-07-11', '2018-07-11', '2018-07-11', '2018-07-11', '2018-07-11', '2018-07-11', '2018-07-11',  '2018-07-11', '2018-07-11', '2018-07-11', '2018-07-11', '2018-07-11', '2018-07-11', '2018-07-11', '2018-07-11', '2018-07-11', '2018-07-11', '2018-07-11', '2018-07-11' ],
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
            //data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
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
                                        
                                            <Line  data={lineGraphData} options={opt} />               
                                    </div>
                                    <div className='tableToggle'>
                                        <Switch defaultChecked onChange={onChange} /> <span> Shows figures on table</span>
                                    </div>
                                </div>
                    
                        );
                    }}
                </Query>
            </Fragment>
        )
    }
}

export default MonthChart