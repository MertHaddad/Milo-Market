import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const useDidMountEffect = (func, dependacyArray) => {
    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current) func();
        else didMount.current = true;
    }, dependacyArray);
}

useDidMountEffect.propTypes  = {
    func: PropTypes.func,
    dependacyArray: PropTypes.array,
  };

export default useDidMountEffect;