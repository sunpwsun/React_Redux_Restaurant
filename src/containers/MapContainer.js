import React, {Component} from 'react'
import { GoogleApiWrapper } from 'google-maps-react'
import GoogleMap from '../components/GoogleMap/GoogleMap'
 
export class MapContainer extends Component {

    render() {
    
        return (
            <GoogleMap google={this.props.google} />
        )
    }
}
 
export default GoogleApiWrapper({
  apiKey: ''
})( MapContainer )
