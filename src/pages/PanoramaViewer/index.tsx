import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function PanoramaViewer(): JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const name = params.get('name')
    if (!name) return

    const url = `http://localhost:3001/api/panoramas/file/${encodeURIComponent(name)}`

    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 1, 1100)
    camera.position.set(0, 0, 0)
    camera.rotation.order = 'YXZ'

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(renderer.domElement)

    const geometry = new THREE.SphereGeometry(500, 60, 40)
    geometry.scale(-1, 1, 1) // invert the sphere to view from inside

    const loader = new THREE.TextureLoader()
    loader.setCrossOrigin('anonymous')

    let mesh: THREE.Mesh | null = null

    loader.load(
      url,
      (texture) => {
        const material = new THREE.MeshBasicMaterial({ map: texture })
        mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)
      },
      undefined,
      (err) => {
        // eslint-disable-next-line no-console
        console.error('Failed to load panorama image', err)
      }
    )

    let isUserInteracting = false
    let onPointerDownPointerX = 0
    let onPointerDownPointerY = 0
    let lon = 0
    let lat = 0
    let onPointerDownLon = 0
    let onPointerDownLat = 0

    function onPointerDown(event: Event) {
      const pe = event as PointerEvent
      isUserInteracting = true
      onPointerDownPointerX = pe.clientX
      onPointerDownPointerY = pe.clientY
      onPointerDownLon = lon
      onPointerDownLat = lat
      try {
        (pe.target as Element).setPointerCapture(pe.pointerId)
      } catch (e) {
        // ignore
      }
    }

    function onPointerMove(event: Event) {
      const pe = event as PointerEvent
      if (isUserInteracting) {
        lon = onPointerDownLon + (onPointerDownPointerX - pe.clientX) * 0.1
        lat = onPointerDownLat + (pe.clientY - onPointerDownPointerY) * 0.1
        lat = Math.max(-85, Math.min(85, lat))
      }
    }

    function onPointerUp(event: Event) {
      const pe = event as PointerEvent
      isUserInteracting = false
      try {
        (pe.target as Element).releasePointerCapture(pe.pointerId)
      } catch (e) {
        // ignore
      }
    }

    function onWindowResize() {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }

    // register listeners
    container.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('resize', onWindowResize)

    let animationId = 0
    function animate() {
      animationId = requestAnimationFrame(animate)
      // slow auto-rotate when not interacting
      if (!isUserInteracting) lon += 0.02
      camera.rotation.y = THREE.MathUtils.degToRad(lon)
      camera.rotation.x = THREE.MathUtils.degToRad(lat)
      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      container.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('resize', onWindowResize)
      renderer.dispose()
      geometry.dispose()
      if (mesh) {
        // dispose material/texture
        const mat = mesh.material as THREE.MeshBasicMaterial
        if (mat.map) mat.map.dispose()
        mat.dispose()
      }
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div style={{ height: '100vh', width: '100vw', background: '#000' }}>
      <div ref={containerRef} style={{ height: '100%', width: '100%' }} />
    </div>
  )
}
