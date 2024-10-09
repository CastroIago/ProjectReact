import {OrbitControls, Sky} from "@react-three/drei";
import Floor from "./Floor.jsx";
import Shrek from "./Shrek.jsx";
import Pikachu from "./Pikachu.jsx"
import Itachi from "./Itachi.jsx"
import Simba from "./Simba.jsx";
import { AnimationProvider } from "../assets/context/AnimationProvider.jsx";
function Experience() {
    return (
        <>
           
            <hemisphereLight intensity={1}/>
            <directionalLight position={[1, 10, 10]} intensity={4}/>
            <OrbitControls/>
            <Floor/>
            <Shrek/>
            <Pikachu/>
            <Itachi/>
            <Simba/>
            <Sky/>
        </>
    );
}

export default Experience;