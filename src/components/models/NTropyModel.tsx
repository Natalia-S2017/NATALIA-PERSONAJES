import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { clone as skeletonClone } from 'three/examples/jsm/utils/SkeletonUtils.js'
import * as THREE from 'three'

export default function NTropyModel({ autoSpin = false }: { autoSpin?: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF(`${import.meta.env.BASE_URL}n._tropy.glb`)
  const clone = useMemo(() => skeletonClone(scene), [scene])

  useFrame(() => {
    if (autoSpin && groupRef.current) groupRef.current.rotation.y += 0.014
  })

  return (
    <group ref={groupRef} scale={1.83} position={[0, -1.10, 0]}>
      <primitive object={clone} />
    </group>
  )
}

useGLTF.preload(`${import.meta.env.BASE_URL}n._tropy.glb`)
