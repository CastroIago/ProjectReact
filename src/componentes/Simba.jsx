import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { Model } from "../assets/Simba";
import { useRef } from "react";

const Simba = () => {
    const character = useRef();
    const rigidbody = useRef();
    
    const radius = 0.5;
    const height = 0.7;
    const position = [0, 1, 0];
    
    return (
        <group position-y={3} position-x={1.5} position-z={-11}>
            <RigidBody
                colliders={'hull'}
                ref={rigidbody}
                scale={[0.02, 0.02, 0.02]}
                enabledRotations={[false, false, false]}
            >
                
                <Model ref={character}/>
            </RigidBody>
        </group>
    );
};

export default Simba;