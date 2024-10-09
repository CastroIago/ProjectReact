import {useTexture} from "@react-three/drei";
import * as THREE from "three";
import {RigidBody} from "@react-three/rapier";

const Floor = () => {
    const texture = useTexture({
        map: './textures/brown_mud_leaves_01_diff_2k.jpg',
        displacementMap: './textures/brown_mud_leaves_01_disp_2k.png',
        aoMap: "/textures/brown_mud_leaves_01_ao_2k.jpg",
    });

    console.log(texture)
    const repeatX = 10;
    const repeatY = 10; 

    if(texture.map){
        texture.map.wrapS = THREE.RepeatWrapping;
        texture.map.wrapT = THREE.RepeatWrapping;
        texture.map.repeat.set(repeatX, repeatY);
        }
        if(texture.displacementMap){  
        texture.displacementMap.wrapS = THREE.RepeatWrapping;
        texture.displacementMap.wrapT = THREE.RepeatWrapping;
        texture.displacementMap.repeat.set(repeatX, repeatY);
        }
        if(texture.aoMap){
        texture.aoMap.wrapS = THREE.RepeatWrapping;
        texture.aoMap.wrapT = THREE.RepeatWrapping;
        texture.aoMap.repeat.set(repeatX, repeatY);
        }
        console.log(texture);

    return (
        <group>
            <RigidBody colliders={"cuboid"} position={[0, -1, 0]}>
                <mesh rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[40, 40, 160, 160]}/>
                    <meshStandardMaterial {...texture} />
                </mesh>
            </RigidBody>
        </group>
    )
};

export default Floor;