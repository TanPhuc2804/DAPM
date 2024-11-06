import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
function valueFormatter(value) {
    return `${value} VNĐ`;
}


export default function ChartRevenue({ dataset }) {
    
    const chartSetting = {
        yAxis: [
            {
                label: 'VNĐ'
            },
        ],
        width: 900,
        height: 300,
        sx: {
            [`.${axisClasses.left} .${axisClasses.label}`]: {
                transform: 'translate(-50px, 0)',
            },
        },
    };
    return (
        <BarChart
            dataset={dataset}
            xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
            series={[
                { dataKey: 'revenue', label: 'Tổng doanh thu', valueFormatter },
            ]}
            {...chartSetting}
        />

    );
}