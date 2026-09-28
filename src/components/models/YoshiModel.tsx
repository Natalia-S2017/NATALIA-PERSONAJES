import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export default function YoshiModel({ autoSpin = false }: { autoSpin?: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF(`${import.meta.env.BASE_URL}yoshi.glb`)
  const clone = useMemo(() => scene.clone(), [scene])
  const fitted = useRef(false)

  useFrame(() => {
    if (!groupRef.current) return

    if (!fitted.current) {
      // Traversal directo para capturar geometría de cualquier tipo
      const box = new THREE.Box3()
      clone.updateMatrixWorld(true)
      clone.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh
          mesh.geometry.computeBoundingBox()
          const geomBox = mesh.geometry.boundingBox
          if (geomBox) {
            box.union(geomBox.clone().applyMatrix4(mesh.matrixWorld))
          }
        }
      })
      if (box.isEmpty()) return
      fitted.current = true

      const size = new THREE.Vector3()
      box.getSize(size)
      const maxDim = Math.max(size.x, size.y, size.z)
      if (maxDim === 0) return

      const s = 10 / maxDim
      groupRef.current.scale.setScalar(s)
      const center = new THREE.Vector3()
      box.getCenter(center)
      groupRef.current.position.set(-center.x * s, -center.y * s, -center.z * s)
    }

    if (autoSpin) groupRef.current.rotation.y += 0.014
  })

  return (
    <group ref={groupRef}>
      <primitive object={clone} />
    </group>
  )
}

useGLTF.preload(`${import.meta.env.BASE_URL}yoshi.glb`)
