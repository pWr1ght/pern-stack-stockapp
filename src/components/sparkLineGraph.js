import React, {useState} from 'react'
import { Sparklines, SparklinesLine, SparklinesReferenceLine, SparklinesSpots } from 'react-sparklines';


function SparkLineGraph(props) {
    // const [color, setColor] = useState('grey')
    const getYAxisData = () => {
        let seriesData = props.data.chart.series[0].data
        const chartYAxisArray = seriesData.map(YAxis => YAxis.y).map(close => close[3])
        console.log(chartYAxisArray)
        return chartYAxisArray;
    }
    
    // const colorIndicator = () => {
    //     setColor('green')
    // }
    return (
        <div className="sparkStyle">
             {/* {colorIndicator()} */}
            <Sparklines data={getYAxisData(props.graphData)} margin={5} >
                <SparklinesLine color={props.color} style={{ fill: props.color }} />
                <SparklinesSpots  style={{ fill: props.color }}/>
            </Sparklines>
        </div>
    )
}

export default SparkLineGraph
