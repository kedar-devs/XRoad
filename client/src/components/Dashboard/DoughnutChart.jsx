import React from 'react'
import { Doughnut, defaults } from 'react-chartjs-2'

defaults.global.defaultFontColor = 'white'

function DoughnutChart({ status }) {
	const data = {
		labels: status.x,
		datasets: [
			{
				label: 'Progress',
				data: status.y,

				backgroundColor: ['#bf616a', '#ebcb8b', '#81a1c1', '#a3be8c'],
			},
		],
	}

	const options = {
		title: {
			display: true,
			text: 'Progress',
			fontColor: 'white',
		},
		responsive: true,
		maintainAspectRatio: true,
	}
	return <Doughnut data={data} options={options} />
}

export default DoughnutChart
