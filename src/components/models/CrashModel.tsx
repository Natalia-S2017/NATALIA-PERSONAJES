import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { clone as skeletonClone } from 'three/examples/jsm/utils/SkeletonUtils.js'
import * as THREE from 'three'

export default function CrashModel({ autoSpin = false }: { autoSpin?: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF(`${import.meta.env.BASE_URL}crash.glb`)
  // SkeletonUtils.clone rebindea correctamente el skeleton del SkinnedMesh
  const clone = useMemo(() => skeletonClone(scene), [scene])

  // bbox Three.js runtime: maxDim=13.807, center=[0, 6.578, 1.339]
  // scale = 2.2 / 13.807 = 0.159, pos = [-cx*s, -cy*s, -cz*s]
  useFrame(() => {
    if (autoSpin && groupRef.current) groupRef.current.rotation.y += 0.014
  })

  return (
    <group ref={groupRef} scale={0.159} position={[0, -1.048, -0.213]}>
      <primitive object={clone} />
    </group>
  )
}

useGLTF.preload(`${import.meta.env.BASE_URL}crash.glb`)
