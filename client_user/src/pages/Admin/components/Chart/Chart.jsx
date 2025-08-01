import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
function formatCurrencyVND(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND";
}


export default function ChartRevenue({ dataset }) {

    const chartSetting = {

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
            className='bg-[#001529] rounded-lg p-4'
            dataset={dataset}
            xAxis={[{ scaleType: 'band', dataKey: 'month', tickLabelStyle: { fill: 'white' } }]}
            yAxis={[{ tickLabelStyle: { fill: 'white' } }]}
            series={[
                {
                    dataKey: 'revenue',
                    label: 'Doanh thu theo tháng',
                    formatCurrencyVND,
                    type: 'bar',
                    color: '#1890ff',
                },
            ]}
            slotProps={{
                legend: {
                    labelStyle: {
                        fill: '#fff',
                        fontWeight: 500,
                        fontSize: 15,
                        fontFamily: `'Roboto', 'Helvetica', 'Arial', sans-serif`,
                    },
                }
            }}
            {...chartSetting}
            sx={{
                [`& .${axisClasses.tickLabel}`]: {
                    fill: 'white',
                },
                [`& .${axisClasses.label}`]: {
                    fill: 'white',
                },
                '& g.MuiChartsAxis-root line': {
                    stroke: 'white',
                    strokeWidth: 1.5,
                },
                '& .MuiChartsGrid-line': {
                    stroke: '#444', // Ví dụ màu grid
                },

            }}
        />

    );
}