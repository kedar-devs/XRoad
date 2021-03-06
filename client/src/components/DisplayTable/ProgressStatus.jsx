import React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import "./ProgressStatus.css";

function CircularProgressWithLabel(props) {
  const { value } = props;
  return (
    <Box
      position="relative"
      display="inline-flex"
      className={`${
        value < 25
          ? "lessthan25"
          : value < 50
          ? "lessthan50"
          : value < 75
          ? "lessthan75"
          : "lessthan100"
      }`}
    >
      <CircularProgress variant="determinate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          style={{ color: "white " }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export default function CircularStatic({ value }) {
  return <CircularProgressWithLabel value={value} />;
}
