import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { Model } from "../assets/Itachi";
import { useRef } from "react";

const Itachi = () => {
    const character = useRef();
    const rigidbody = useRef();
    
    const radius = 0.5;
    const height = 0.7;
    const position = [0, 1, 0];
    
    return (
        <group position-y={1} position-x={-3} position-z={-11}>
            <RigidBody
                colliders={'hull'}
                ref={rigidbody}
                scale={[1.5, 1.5, 1.5]}
                enabledRotations={[false, false, false]}
            >
                
                <Model ref={character}/>
            </RigidBody>
        </group>
    );
};

export default Itachi;