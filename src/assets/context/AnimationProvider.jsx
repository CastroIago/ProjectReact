import {createContext, useContext, useState} from 'react';
import {animationsTypes} from "./animationsTypes.js";

// Create the context
const AnimationContext = createContext(undefined);

const AnimationProvider = ({ children }) => {
    console.log(AnimationContext)
    const [animationState, setAnimationState] = useState(animationsTypes.idle);

    return (
        <AnimationContext.Provider value={{ animationState, setAnimationState }}>
            {children}
        </AnimationContext.Provider>
    );
};

const useAnimationContext = () => {
    return useContext(AnimationContext);
}

export { useAnimationContext, AnimationProvider };
