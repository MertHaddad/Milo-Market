import React from "react";
export default function UpButton() {
  return (
      <button
        onClick={() => window.scrollTo({ left: 0, top: 0, behavior: "smooth" })}
        className="go-up-button pointer"
      >
        &#8679;
      </button>
  );
}
