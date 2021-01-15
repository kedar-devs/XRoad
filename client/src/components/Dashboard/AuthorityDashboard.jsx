import React from 'react'
import classes from './AuthorityDashboard.module.css'
import DoughnutChart from './DoughnutChart'

const AuthorityDashboard = (props) => {
	return (
		<div container className={classes.Root}>
			<DoughnutChart />
		</div>
	)
}

export default AuthorityDashboard
