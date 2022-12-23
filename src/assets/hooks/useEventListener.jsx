import { useEffect } from "react";
import PropTypes from "prop-types";

const useEventListener = (pressedKey, func, type = "keydown") => {
  useEffect(() => {
    const handleKeyPressed = (event) => {
      if (event.key === pressedKey) {
        func();
        if (event.key === "Control") {
          document.body.style.cursor = "pointer";
        }
      }
    };

    window.addEventListener(type, handleKeyPressed);
    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener(type, handleKeyPressed);
    };
  }, []);
};

useEventListener.propTypes = {
  func: PropTypes.func,
  pressedKey: PropTypes.string,
  type: PropTypes.string,
};

export default useEventListener;