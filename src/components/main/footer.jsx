import React from "react";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <h1 className="text-center text-primary fs-1 phone-message" >Sorry small screen version is not ready yet!</h1>
        <span className="text-primary">
          ©2023 Milo Market •{" "}
          <a className="no-text-style text-primary" href="/">
            Privacy Policy
          </a>{" "}
        </span>
      </div>
    </>
  );
};

export default Footer;
