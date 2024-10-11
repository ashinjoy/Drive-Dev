
import React, { useEffect, useState } from 'react';
import { Map, Source, Layer } from 'react-map-gl';

function RippleEffect() {
    const [radius,setRadius] = useState(0)
    useEffect(()=>{
        const interval = setInterval(()=>{
            setRadius((prev)=> prev>=100 ? 0 : prev+2 )
        },1000)
        return ()=> clearInterval(interval)
    })

    const rippleLayer = {
        id: 'ripple',
        type: 'circle',
        source: 'ripple-data',
        paint: {
            'circle-radius': radius,
            'circle-color': 'rgba(0, 150, 255, 0.5)', 
            'circle-opacity': 1,
        },
        filter: ['==', 'ripple', true], 
    };

    return (
        <Source id="ripple-data" type="geojson" data={{
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [76.3260732465575,9.934814501530493], 
                    },
                    properties: {
                        ripple: true,
                    },
                },
            ],
        }}>
            <Layer {...rippleLayer} />
        </Source>
    );
};




export default RippleEffect
