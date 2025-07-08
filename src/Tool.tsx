import React from "react";

const Tool = ({ children }: { children: React.reactNode }) => {
  return (
    <div className="text-white text-2xl p-4 border-2 m-auto">{children}</div>
  );
};

export default Tool;
