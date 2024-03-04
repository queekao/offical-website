import * as THREE from 'three'
export default class Plane {
  //   private mixer: THREE.AnimationMixer
  private plane: THREE.Mesh
  constructor(scene: THREE.Scene, config: any, position: number) {
    // Create a plane geometry
    const planeGeometry = new THREE.PlaneGeometry(5, 5)

    // Create a mesh material
    const material = new THREE.MeshBasicMaterial({
      color: config.color,
      side: THREE.DoubleSide
    })

    // Create a plane mesh
    this.plane = new THREE.Mesh(planeGeometry, material)
    this.plane.name = config.name
    this.plane.position.x = position
    this.plane.position.z = 0.5
    this.plane.scale.x = 0.5
    this.plane.scale.y = 0.5
    // Create a text geometry
    // const textGeometry = new THREE.TextGeometry('Hello, World!', {
    //   font: 'Arial',
    //   size: 1,
    //   height: 0.1
    // })

    // Create a text material
    // const textMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 })

    // Create a text mesh
    // const text = new THREE.Mesh(plane, textMaterial)
    // text.position.set(0, 0, 0.2) // Adjust the position of the text

    // Add the text mesh as a child of the plane mesh
    // plane.add(text)

    // Add the plane mesh to the scene
    scene.add(this.plane)
  }
  public getPlane(): THREE.Mesh {
    return this.plane
  }
}
