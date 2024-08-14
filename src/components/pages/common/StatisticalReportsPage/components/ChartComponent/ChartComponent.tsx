import React from 'react';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { ChartData } from 'chart.js/auto';

type IChartComponentProps = {
    data: ChartData;
    title: string;
    xTitle: string;
    yTitle: string;
};

export default function ChartComponent(props: IChartComponentProps) {
    if (props.data.labels?.length === 0) {
        return <div></div>;
    }
    return (
        <div>
            <Chart
                type='bar'
                data={props.data}
                options={{
                    plugins: {
                        title: {
                            text: props.title,
                            display: true,
                            position: 'bottom',
                            font: { size: 20 },
                        },

                        legend: {
                            position: 'bottom',
                            align: 'start',
                        },
                    },
                    scales: {
                        x: {
                            title: {
                                text: props.xTitle,
                                display: true,
                                align: 'end',
                                color: '#000000',
                            },
                        },
                        y: {
                            title: {
                                text: props.yTitle,
                                display: true,
                                align: 'end',
                                color: '#000000',
                            },
                        },
                    },
                }}
            />
        </div>
    );
}
