import React from 'react'
import { Grid } from '@material-ui/core'
import classes from './AuthorityDashboard.module.css'
import DoughnutChart from './DoughnutChart'
import { useState } from 'react'
import { useEffect } from 'react'

const AuthorityDashboard = (props) => {
	const [status, changeStatus] = useState({
		x: ['Pending', 'Level-1', 'Level-2', 'Completed'],
		y: null,
	})

	useEffect(() => {
		console.log('tst');
		changeStatus({
			x: ['Pending', 'Level-1', 'Level-2', 'Completed'],
			y: [12, 5, 3, 8],
		})
	}, [])

	return (
		<Grid container className={classes.Root} direction='row'>
			<Grid item container xs={12} md={6}>
				<DoughnutChart status={status} />
			</Grid>
			<Grid item container xs={12} md={6}>
				Complaints
			</Grid>
		</Grid>
	)
}

export default AuthorityDashboard
