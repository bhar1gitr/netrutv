"use client"

import React, { Suspense, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { useGLTF, OrbitControls, Stage, Center, Loader } from "@react-three/drei"
import * as THREE from "three"

// Define available colors
const COLORS = [
  { name: "White", value: "#ffffff" },
  { name: "Black", value: "#1a1a1a" },
  { name: "Luxury Gold", value: "#d4af37" },
  { name: "Crimson", value: "#8b0000" },
  { name: "Navy", value: "#000080" },
]

function Model({ url, color }: { url: string; color: string }) {
  const { scene } = useGLTF(url)

  // We traverse the model to find the mesh and apply the color to its material
  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh
      // We use 'color' to update the base material color
      // .set() helps Three.js convert the hex string to a Color object
      if (mesh.material) {
        (mesh.material as THREE.MeshStandardMaterial).color.set(color)
      }
    }
  })

  return <primitive object={scene} />
}

export default function TshirtViewer() {
  const [selectedColor, setSelectedColor] = useState(COLORS[0].value)

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* 3D CANVAS */}
      <div className="w-full h-[500px] bg-zinc-900/10 rounded-xl relative border border-zinc-800/50">
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
          <Suspense fallback={null}>
            <Stage environment="city" intensity={0.5} contactShadow={{ opacity: 0.5, blur: 2 }}>
              <Center>
                <Model url="/models/scene.gltf" color={selectedColor} />
              </Center>
            </Stage>
          </Suspense>
          <OrbitControls 
            makeDefault 
            enableZoom={false} 
            autoRotate 
            autoRotateSpeed={0.4} 
          />
        </Canvas>
        <Loader /> 
      </div>

      {/* COLOR PICKER UI */}
      <div className="flex flex-col gap-3">
        <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
          Select Finish
        </span>
        <div className="flex gap-4">
          {COLORS.map((color) => (
            <button
              key={color.value}
              onClick={() => setSelectedColor(color.value)}
              className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                selectedColor === color.value ? "border-[#d4af37] scale-110" : "border-zinc-800"
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>
      </div>
    </div>
  )
}