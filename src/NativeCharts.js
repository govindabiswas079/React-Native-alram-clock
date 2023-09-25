import { View, Text, StatusBar, Dimensions } from 'react-native'
import React, { Fragment } from 'react'
import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";

const NativeCharts = () => {

    const barData = [
        { value: 0.7, label: '1' },
        { value: 0.8, label: '2' },
        { value: 0.6, label: '3' },
        { value: 0.4, label: '4' },
        { value: 0.9, label: '5' },
        { value: 0.7, label: '6' },
    ];

    return (
        <Fragment>
            <StatusBar backgroundColor={'#FFFFFF'} barStyle={'dark-content'} animated={true} />
            <View style={{ flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
                <BarChart
                    showFractionalValues
                    showYAxisIndices
                    showXAxisIndices
                    hideRules
                    noOfSections={5}
                    data={barData}
                    showGradient
                    frontColor={'#1B6BB0'}
                    gradientColor={'#FFEEFE'}
                    backgroundColor={'#FECF9E'}
                />
            </View>
        </Fragment>
    )
}

export default NativeCharts