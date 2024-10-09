import {CapsuleCollider, RigidBody} from "@react-three/rapier";
import { Model } from "../assets/ShrekModelo";
import {useRef} from "react";
import { PerspectiveCamera, useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Controls } from "../App";
import * as THREE from "three";
import { useAnimationContext } from "../assets/context/AnimationProvider";
import { animationsTypes } from "../assets/context/animationsTypes";

const Shrek = () => {
    const character = useRef();
    const {animationState, setAnimationState} = useAnimationContext();

    const radius = 0.4;
    const height = 0.7;
    const position = [0, 1, 0];
    const cameraRef = useRef()
   // velocidade pulo, movimento, etc
    const JUMP_FORCE = 2;
    const MOVEMENT_SPEED = 0.1;
    const MAX_VEL = 2;
    const WALK_VEL = 1.5;
    // Controle movimento,pulo , etc
    const jumpPressed = useKeyboardControls((state) => state[Controls.jump]);
    const leftPressed = useKeyboardControls((state) => state[Controls.left]);
    const rightPressed = useKeyboardControls((state) => state[Controls.right]);
    const backPressed = useKeyboardControls((state) => state[Controls.back]);
    const forwardPressed = useKeyboardControls((state) => state[Controls.forward]);

    //referencias
    const rigidBody = useRef();
    const isOnFloor = useRef(true);

    useFrame((state, delta) => {

        const characterWorldPosition = character.current.getWorldPosition(new THREE.Vector3());

        const targetCameraPosition = new THREE.Vector3( characterWorldPosition.x,3, characterWorldPosition.z + 8 );

        state.camera.position.lerp(targetCameraPosition, delta * 3);
        state.camera.lookAt(characterWorldPosition);
        
        const impulse = {x: 0, y: 0, z: 0};
        if (jumpPressed && isOnFloor.current) {
            impulse.y += JUMP_FORCE;
            isOnFloor.current = false;
        }

        const linvel = rigidBody.current.linvel();
        let changeRotation = false;
        if (rightPressed && linvel.x < MAX_VEL) {
            impulse.x += MOVEMENT_SPEED;
            changeRotation = true;
        }
        if (leftPressed && linvel.x > -MAX_VEL) {
            impulse.x -= MOVEMENT_SPEED;
            changeRotation = true;
        }
        if (backPressed && linvel.z < MAX_VEL) {
            impulse.z += MOVEMENT_SPEED;
            changeRotation = true;
        }
        if (forwardPressed && linvel.z > -MAX_VEL) {
            impulse.z -= MOVEMENT_SPEED;
            changeRotation = true;
        }

        rigidBody.current.applyImpulse(impulse, true);
        if (changeRotation) {
            const angle = Math.atan2(linvel.x, linvel.z);
            character.current.rotation.y = angle;
        }
        
        if (Math.abs(linvel.x) > WALK_VEL || Math.abs(linvel.z) > WALK_VEL) {
            if (animationState !== animationsTypes.walk) {
                setAnimationState(animationsTypes.walk);
            }
        } else {
            if (animationState !== animationsTypes.idle) {
                setAnimationState(animationsTypes.idle);
            }
        }

    });
    
    



    return (
        <group>
            <PerspectiveCamera ref={cameraRef} position={[0,2,10]} makeDefault/>
            <RigidBody
                ref={rigidBody}
                colliders={false}
                scale={[0.6, 0.6, 0.6]}
                enabledRotations={[false, false, false]}
                onCollisionEnter={() => {
                    isOnFloor.current = true;
                }}
            >   
                <CapsuleCollider args={[radius, height]} position={position}/>
                <group ref={character}>
                    <Model/>
                </group>


            </RigidBody>
        </group>
    );
};

export default Shrek;