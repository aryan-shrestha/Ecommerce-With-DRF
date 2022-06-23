import React from "react";

import "../assets/css/loading.css";

function Loading() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="loader"></div>
      </div>
    </div>
  );
}

export default Loading;
