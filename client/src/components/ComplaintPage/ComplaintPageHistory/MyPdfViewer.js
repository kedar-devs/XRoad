import React, { useState, useRef } from "react";
import { usePdf } from "@mikecousins/react-pdf";

const MyPdfViewer = ({ file, onclick }) => {
  const [page, setPage] = useState(1);
  const canvasRef = useRef(null);

  const { pdfDocument, pdfPage } = usePdf({
    file: file,
    page,
    canvasRef,
  });

  return (
    <div style={{ background: "white", height: "100vh", width: "100vw" }}>
      {!pdfDocument && <span>Loading...</span>}
      <canvas ref={canvasRef} />
      {Boolean(pdfDocument && pdfDocument.numPages) && (
        <nav>
          <ul className="pager" style={{ display: "flex" }}>
            <li className="previous">
              <button
                style={{ color: "white" }}
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </button>
            </li>
            <li className="next">
              <button
                disabled={page === pdfDocument.numPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </li>
            <li className="next">
              <button onClick={onclick}>Close</button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};
export default MyPdfViewer;
