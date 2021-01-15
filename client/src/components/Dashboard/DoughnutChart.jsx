import React from 'react'
import { Doughnut } from 'react-chartjs-2'

const status = {
	x: ['Pending', 'Level-1', 'Level-2', 'Completed'],
	y: [12, 5, 3, 8],
}

function DoughnutChart() {
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
		},
		responsive: true,
		maintainAspectRatio: true,
	}
	return <Doughnut data={data} options={options} />
}

export default DoughnutChart
