import React from "react";
import { Row } from "reactstrap";

const Loading = ({ modal = false }) => {
  return (
    <div className="container m-2 text-center">
      <Row>
        <h4 className={!modal ? "col-12" : "col-12 text-white"}>
          {!modal ? "Loading Images... " : "Loading Image..."}
        </h4>
      </Row>
    </div>
  );
};

export default Loading;
