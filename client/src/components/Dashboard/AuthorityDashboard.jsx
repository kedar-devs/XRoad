import React from 'react'
import { Grid } from '@material-ui/core'
import classes from './AuthorityDashboard.module.css'
import DoughnutChart from './DoughnutChart'

const AuthorityDashboard = (props) => {
	return (
		<Grid container className={classes.Root} direction='row'>
			<Grid item container xs={12} md={6}>
				<DoughnutChart />
			</Grid>
			<Grid item container xs={12} md={6}>
				Complaints
			</Grid>
		</Grid>
	)
}

export default AuthorityDashboard
