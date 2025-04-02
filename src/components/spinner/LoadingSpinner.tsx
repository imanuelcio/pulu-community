import React from "react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="loader border-t-4 border-b-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
      <style jsx>{`
        .loader {
          border-top-color: transparent;
        }
      `}</style>
    </div>
  );
};

export default Spinner;
