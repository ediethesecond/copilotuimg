import React, { useEffect, useState } from 'react';
import { LineChartStyledExample } from "./charthigh";
import {
    IChartProps,
    ILineChartPoints,
    ILineChartProps,
    LineChart,
    ChartHoverCard,
    ICustomizedCalloutData,
    DataVizPalette,
  } from '@fluentui/react-charting';


interface DiagProps {
    id: string;
}

const Diag: React.FC<DiagProps> = ({ id }) => {
    //const [data, setData] = useState<DiagData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            //const response = await fetch(`http://localhost:3000/api/diag?id=${id}`);
            //const json = await response.json();
            //setData(json);
        };

        fetchData();
    }, [id]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ width: '100%' }}>
                
            </div>
            <div style={{ display: 'flex', width: '100%' }}>
                <div style={{ width: '80%' }}>
                    <LineChartStyledExample />
                </div>
                <div style={{ width: '20%' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '50%' }}>
                        <div style={{ marginBottom: '10px' }}>Row 1</div>
                        <div>
                            <button onClick={async () => {
                                const response = await fetch(`http://localhost:3000/api/postData?id=${id}`, { method: 'POST' });
                                if (response.ok) {
                                    // Close the dialog
                                    // You can use a state variable to control the visibility of the dialog
                                }
                            }}>Post Data</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Diag;
