import React, { memo } from "react";

function Loader() {
  return (
    <div className="Pre_Loader">
      <div className="Loader">
        <span className="Circle"> </span>
      </div>
    </div>
  );
}
export default memo(Loader);
