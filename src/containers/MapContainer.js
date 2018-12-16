import React, {Component} from 'react'
import { GoogleApiWrapper } from 'google-maps-react'
import GoogleMap from '../components/GoogleMap/GoogleMap'
import {GoogleMapApiKey} from '../key' 

export class MapContainer extends Component {

    render() {
    
        return (
            <GoogleMap google={this.props.google} />
        )
    }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyCtOYjleDui0rc8V1iVSBkbpFR1DaoXonQ'
})( MapContainer )

