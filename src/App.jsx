import {Canvas} from '@react-three/fiber'
import {Suspense, useMemo, useState} from "react";
import {Physics} from "@react-three/rapier";
import Experience from './componentes/Experience';
import { KeyboardControls } from '@react-three/drei';
import './App.css';
import { AnimationProvider } from './assets/context/AnimationProvider.jsx';

export const Controls = {
    forward: "forward",
    back: "back",
    left: "left",
    right: "right",
    jump: "jump"

};


function App() {
  const [alturaDaTela, setAlturaDaTela] = useState(window.innerHeight);

  window.addEventListener('resize', () => {
      setAlturaDaTela(window.innerHeight);
});

const map = useMemo(
    () => [
        { name: Controls.forward, keys: ["ArrowUp", "KeyW"]},
        { name: Controls.back, keys: ["ArrowDown", "KeyS"]},
        { name: Controls.right, keys: ["ArrowRight", "KeyD"]},
        { name: Controls.left, keys: ["ArrowLeft", "KeyA"]},
        { name: Controls.jump, keys: ["Space"]},
    ],
    []
);

  return (
      <>
        <AnimationProvider>    
        <KeyboardControls map={map}>
          <Canvas style={{height: alturaDaTela}}>
              <Suspense>
                  <Physics>
                      <Experience/>
                  </Physics>
              </Suspense>
          </Canvas>
        </KeyboardControls>
        </AnimationProvider>
      </>
  )
}

export default App