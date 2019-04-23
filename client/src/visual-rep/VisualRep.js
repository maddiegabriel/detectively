import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

function createChartData(raw_data){

    let background_color = 'rgb(255, 99, 132)';
    let border_color     = 'rgb(255, 99, 132)';
    let chart_title      = (raw_data.length < 18) ? `Comparison of ${raw_data[0].first_name} ${raw_data[0].last_name} Salary over Time` : `Comparison of ${raw_data[0].job_title} Salary`;

    let chart_labels     = [];
    let chart_data       = [];

    if(raw_data.length < 18 ) {
        raw_data = raw_data.sort((a, b) => a.year - b.year)
    } else {
        raw_data = raw_data.sort((a, b) => a.salary - b.salary)
    }

    for(let row of raw_data){
        (raw_data.length < 18) ? chart_labels.push(row.year) : chart_labels.push(`${row.first_name} ${row.last_name}`);
        chart_data.push(row.salary);
    }

    let data = {
        labels: chart_labels,
        datasets: [{
            label: chart_title,
            backgroundColor: background_color,
            borderColor: border_color,
            data: chart_data
        }]
    }

    return data;
}

export default class VisualRep extends Component {
    state = {
        data: {},
        options: {}
    }

    render() {
        return(
            <div className="visual-representation-page">
                <Bar data={this.state.data} options={this.state.options} />
            </div>
        );
    }

    componentDidMount() {
        fetch(this.props.search.search)
            .then(res => res.json())
            .then(res => {
                let xId = (res.results.length < 18) ? 'Year' : 'Name';
                let yId = 'Salary ($)';

                this.setState({data: createChartData(res.results), options: {
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                            display: true,
                            labelString: yId
                            }
                        }],
                        xAxes: [{
                            scaleLabel: {
                            display: true,
                            labelString: xId
                            }
                        }]
                    },
                    layout: {
                        padding: {
                            left: 50,
                            right: 50,
                            top: 50,
                            bottom: 50
                        }
                    }
                }})});
    }
}