import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export default function BowserModel({ autoSpin = false }: { autoSpin?: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF(`${import.meta.env.BASE_URL}bowser.glb`)
  const clone = useMemo(() => scene.clone(), [scene])

  const { fitScale, fitPos } = useMemo(() => {
    scene.updateMatrixWorld(true)
    const box = new THREE.Box3().setFromObject(scene)
    if (box.isEmpty()) return { fitScale: 1, fitPos: [0, 0, 0] as [number,number,number] }
    const size = new THREE.Vector3()
    box.getSize(size)
    const maxDim = Math.max(size.x, size.y, size.z)
    const s = 2.2 / maxDim
    const center = new THREE.Vector3()
    box.getCenter(center)
    return { fitScale: s, fitPos: [-center.x * s, -center.y * s, -center.z * s] as [number,number,number] }
  }, [scene])

  useFrame(() => {
    if (autoSpin && groupRef.current) groupRef.current.rotation.y += 0.014
  })

  return (
    <group ref={groupRef} scale={fitScale} position={fitPos}>
      <primitive object={clone} />
    </group>
  )
}

useGLTF.preload(`${import.meta.env.BASE_URL}bowser.glb`)
