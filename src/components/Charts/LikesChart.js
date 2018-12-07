import React, {Component, Fragment} from 'react'
import './LikesChart.css'
import { Switch, Spin } from 'antd'
import LikeTable from '../Table/LikeTable'
import { getToday, getTomorrow, getRandomColor, getDateFromToday } from  '../../utils/utils'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import {Bar} from 'react-chartjs-2'

const GET_MENUS = gql`
    query Menus($id: String!) {
        menus(id: $id) {
            menuID
            name
            thumbUpUserID
            thumbDownUserID
        }
    }
`



class LikesChart extends Component {

    makeGraphData = (menu) => {
        
        let labels = []
        let datasets = [
            {
                label: 'Like',
                backgroundColor: 'rgba( 0, 99, 255, 0.5 )',
                borderColor: 'rgba( 0, 99, 255, 1 )',
                borderWidth: 2,
                hoverBackgroundColor: 'rgba( 0, 99, 255, 0.6 )',
                hoverBorderColor: 'rgba( 0, 99, 255, 1 )',
                data: []
            },
            {
                label: 'Dislike',
                backgroundColor: 'rgba( 255, 0, 0, 0.5 )',
                borderColor: 'rgba( 255, 0, 0, 1 )',
                borderWidth: 2,
                hoverBackgroundColor: 'rgba( 255, 0, 0, 0.6 )',
                hoverBorderColor: 'rgba( 255, 0, 0, 1 )',
                data: []
            }
        ]

        // building datasets
        menu.forEach(e => {
            labels.push( e.name )
            datasets[ 0 ].data.push( e.thumbUpUserID.length )
            datasets[ 1 ].data.push( e.thumbDownUserID.length )
        })

        return { labels: labels, datasets: datasets }
    }

    render() {

        return( 
            <Fragment>
                <Query query={GET_MENUS} variables={  { id: this.props.id } } >
                    

                    {({ data, loading, error }) => {
            
                        if (loading) return <div><Spin className='loading' tip='Loading...' size='large' /></div>
                        if (error) return <p>!!! ERROR when fetching menu </p>

                    
                        const graphData = this.makeGraphData( data.menus )

                        // const opt = {
                        //     scales: {
                        //         yAxes: [{
                        //             stacked: true
                        //         }]
                        //     }
                        // }
                        return (
                        
                            <div>
                                <div className='monthTitle'>Likes/Dislikes Figures</div>
                                <div className='likeChart'>                                       
                                    <Bar  
                                        data={graphData} 
                                        width={100}
                                        height={500}
                                        options={{
                                          maintainAspectRatio: false
                                        }} />               
                                </div>

                                <div className='tableToggle'>
                            
                                    <LikeTable labels={graphData.labels} datasets={graphData.datasets} />
                                </div>
                            </div>
                        )
                    }}
                </Query>
            </Fragment>
        )
    }
}

export default LikesChart