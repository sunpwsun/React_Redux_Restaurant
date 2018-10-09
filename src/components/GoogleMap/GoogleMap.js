import React, {Component} from 'react'
import { Map, Marker, InfoWindow } from 'google-maps-react'
import { bindActionCreators } from 'redux'
import * as restaurantAction from  '../../store/modules/restaurant'
import { connect } from 'react-redux'



export class GoogleMap extends Component {

    
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
    }
    
    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        })
    
    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
            showingInfoWindow: false,
            activeMarker: null
            })
        }
    }
     




    render() {

        const restaurantIcon = {
            url: 'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|0091ff|40|_|%E2%80%A2', // url
            scaledSize: new this.props.google.maps.Size(20, 30), // scaled size
        }
        const myPositionIcon = {
            url:  'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|FFFF24|40|_|%E2%80%A2', // url
            scaledSize: new this.props.google.maps.Size(20, 30), // scaled size
        }
        const style = {
            width: '45%',
            height: '85%'
        }

        // markers for showing the restaurants
        const markers = this.props.restaurantList.map(
            ({ name, geolocation }) => (
                <Marker
                    name={name}
                    title={name}
                    position={{lat:geolocation[0], lng:geolocation[1]}}
                    onClick={this.onMarkerClick }
                        
                    />       
            )
        )



        return ( 
            <Map 
                style={style} 
                google={this.props.google} 
                zoom={15}
           //     initialCenter = {{ lat:this.props.lat, lng:this.props.long }}
                center = {{lat:this.props.mapCenter.lat, lng:this.props.mapCenter.long}}
            >

                
                <Marker position = {{ lat:this.props.lat, lng:this.props.long }}
                        name={'Current location' }
                        title={'Curren location'}
                        icon={ myPositionIcon}
                        onClick={this.onMarkerClick }
                        
                        />
                {markers}
                        <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                            <div>
                            <h1>{this.state.activeMarker.name}</h1>
                            </div>
                        </InfoWindow>
             
                    
                
            </Map>
        )
    }
}

export default connect(
    (state) => ({
        cityList            : state.restaurant.cityList,
        selectedCity        : state.restaurant.selectedCity,
        restaurantList      : state.restaurant.restaurantList,
        selectedRestaurant  : state.restaurant.selectedRestaurant,
        lat                 : state.restaurant.lat,
        long                : state.restaurant.long,
        firstRestaurantListFetch : state.restaurant.firstRestaurantListFetch,
        mapCenter           : state.restaurant.mapCenter
        

    }),
    (dispatch) => ({
        RestaurantActions: bindActionCreators(restaurantAction, dispatch)
    })
)( GoogleMap )