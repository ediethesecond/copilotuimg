import * as React from 'react';
import {
  IChartProps,
  ILineChartPoints,
  ILineChartProps,
  LineChart,
  ChartHoverCard,
  ICustomizedCalloutData,
  DataVizPalette,
} from '@fluentui/react-charting';

interface IStyledLineChartExampleState {
  width: number;
  height: number;
}

export class LineChartStyledExample extends React.Component<{}, IStyledLineChartExampleState> {
  constructor(props: ILineChartProps) {
    super(props);
    this.state = {
      width: 400,
      height: 200,
    };
  }

  public render(): JSX.Element {
    return <div>{this._styledExample()}</div>;
  }

  private _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ width: parseInt(e.target.value, 10) });
  };
  private _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ height: parseInt(e.target.value, 10) });
  };

  private _styledExample(): JSX.Element {
    const points: ILineChartPoints[] = [
      {
        data: [
          { x: new Date('2023-10-06T09:00:00'), y: 10, xAxisCalloutData: 'Appointment 1' },
          { x: new Date('2023-10-06T10:00:00'), y: 18, xAxisCalloutData: 'Appointment 2' },
          { x: new Date('2023-10-06T11:00:00'), y: 24, xAxisCalloutData: 'Appointment 3' },
          { x: new Date('2023-10-06T12:00:00'), y: 35, xAxisCalloutData: 'Appointment 4' },
          { x: new Date('2023-10-06T13:00:00'), y: 35, xAxisCalloutData: 'Appointment 5' },
          { x: new Date('2023-10-06T14:00:00'), y: 90, xAxisCalloutData: 'Appointment 6' },
        ],
        legend: 'first legend',
        lineOptions: {
          lineBorderWidth: '4',
        },
        color: DataVizPalette.color10,
      },
    ];

    const data: IChartProps = {
      chartTitle: 'Line Chart',
      lineChartData: points,
    };
    const rootStyle = {
      width: `${this.state.width}px`,
      height: `${this.state.height}px`,
    };
    return (
      <>
        <label htmlFor="changeWidth_Styled">Change Width:</label>
        <input
          type="range"
          value={this.state.width}
          min={200}
          max={1000}
          id="changeWidth_Styled"
          onChange={this._onWidthChange}
          aria-valuetext={`ChangeWidthSlider${this.state.width}`}
        />
        <div style={rootStyle}>
          <LineChart
            data={data}
            strokeWidth={4}
            yMaxValue={90}
            showXAxisLablesTooltip
            height={this.state.height}
            width={this.state.width}
            tickFormat={'%m/%d'}
            tickValues={[new Date('2023-10-06T09:00:00'), new Date('2023-10-06T14:00:00')]}
            // eslint-disable-next-line react/jsx-no-bind
            enablePerfOptimization={true}
            legendProps={{
              styles: {
                legend: {
                  textTransform: 'none',
                },
              },
            }}
          />
        </div>
      </>
    );
  }
}