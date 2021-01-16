import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import Pdf from "./vhdl.pdf";
import MyPdfViewer from "./MyPdfViewer";
const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: "20px",
  },
}));

export default function IconLabelButtons({ link }) {
  const classes = useStyles();
  const [showpdf, setShowpdf] = useState(false);
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<PictureAsPdfIcon />}
        onClick={() => setShowpdf(true)}
      >
        See doc
      </Button>
      {showpdf && <MyPdfViewer file={link} onclick={() => setShowpdf(false)} />}
    </div>
  );
}
