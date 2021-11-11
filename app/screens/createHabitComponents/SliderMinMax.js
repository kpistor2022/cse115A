import React from 'react';
import { Slider } from 'react-native-elements';

function SliderMinMax({currVal, setCurrVal, min, max, color, thumb}) {

    return (
        <Slider
            value={currVal}
            onValueChange={setCurrVal}
            minimumValue={min}
            maximumValue={max}
            thumbStyle = {{
                backgroundColor: "#BD9EEF",
                width: thumb ? 20 : 0,
                height: thumb ? 20 : 0
            }}
            style = {{
                marginHorizontal: 10
            }}
            step={1}
            minimumTrackTintColor={color}
        />
    );
}

export default SliderMinMax;