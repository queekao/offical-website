import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import { GUI } from 'dat.gui'
// import Loaders from './graphic/loader'
import Plane from './graphic/Plane'

export default class Engine {
  private camera: THREE.PerspectiveCamera
  private scene: THREE.Scene
  private renderer: THREE.WebGLRenderer
  private loader: GLTFLoader
  // private light: THREE.Light
  private controls: OrbitControls
  //  The ! symbol indicates that the variable is declared but not initialized in the constructor.
  private raycaster: THREE.Raycaster
  private mouse: THREE.Vector2
  private plane1: THREE.Mesh
  private plane2: THREE.Mesh
  private mixer!: THREE.AnimationMixer
  private animationActions: THREE.AnimationAction[]
  private clock: THREE.Clock
  private activeAction!: THREE.AnimationAction
  private lastAction!: THREE.AnimationAction

  public getController(): OrbitControls {
    return this.controls
  }
  public getDom(): HTMLCanvasElement {
    return this.renderer.domElement
  }
  public clickPlane = (event: MouseEvent): void => {
    this.mouse.set(
      (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1,
      -(event.clientY / this.renderer.domElement.clientHeight) * 2 + 1
    )
    this.raycaster.setFromCamera(this.mouse, this.camera)
    const intersects = this.raycaster.intersectObjects(
      [this.plane1, this.plane2],
      false
    )
    const action2 = this.animationActions[1]
    const action3 = this.animationActions[2]

    for (const intersect of intersects) {
      // Check if the intersected object is one of the planes
      if (intersect.object.name === 'plane1') {
        // Trigger animation for plane2
        this.animationActions[0].fadeOut(1)
        action2.play()
        action2.reset()
        action3.fadeOut(1)
        action2.fadeIn(1)

        break
      } else if (intersect.object.name === 'plane2') {
        // Trigger animation for plane2
        this.animationActions[0].fadeOut(1)
        action3.play()
        action3.reset()
        action2.fadeOut(1)
        action3.fadeIn(1)

        break
      }
      // Add more conditions for other planes if needed
    }

    // const p = intersects[0].point
  }
  constructor(dom: HTMLCanvasElement) {
    this.loader = new GLTFLoader()
    this.scene = new THREE.Scene()
    this.raycaster = new THREE.Raycaster()
    this.mouse = new THREE.Vector2()
    const light1 = new THREE.PointLight(0xffffff, 2)
    light1.position.set(2.5, 2.5, 2.5)
    this.scene.add(light1)
    this.animationActions = []

    const light2 = new THREE.PointLight(0xffffff, 2)
    light2.position.set(-2.5, 2.5, 2.5)
    this.scene.add(light2)
    // this.scene.add(new THREE.AxesHelper(5))

    this.camera = new THREE.PerspectiveCamera(
      75,
      dom.clientWidth / dom.clientHeight,
      0.1,
      1000
    )
    this.camera.position.set(2.2, 3.2, 2.5)
    this.renderer = new THREE.WebGLRenderer({ canvas: dom })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setClearColor(0x000000, 1)
    this.renderer.useLegacyLights = true //use this instead of setting physicallyCorrectLights=true property
    // this.renderer.shadowMap.enabled = true
    // this.renderer.autoClearStencil = true
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
    this.controls.target.set(0, 2, 0)

    this.plane1 = new Plane(
      this.scene,
      {
        color: 0xffffff,
        name: 'plane1'
      },
      0
    ).getPlane()
    this.plane2 = new Plane(
      this.scene,
      {
        color: 0xe881a7,
        name: 'plane2'
      },
      -3
    ).getPlane()
    const onWindowResize = () => {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onWindowResize, false)

    // const render = () => {
    //   this.renderer.render(this.scene, this.camera)
    // }
    // let modelReady = false
    this.loader.load(
      '/Mesh/Umbrella__Intro_Anim.glb',
      (gltf: GLTF) => {
        this.scene.add(gltf.scene)
        this.mixer = new THREE.AnimationMixer(gltf.scene)

        const animationAction = this.mixer.clipAction(
          (gltf as any).animations[0]
        )
        this.animationActions.push(animationAction)
        animationAction.play()
        animationAction.reset()
        // animationsFolder.add(animations, 'default')
        animationAction.loop = THREE.LoopOnce // Set the animation to play only once
        animationAction.clampWhenFinished = true // Stop the animation on the last frame
        animationAction.enabled = true
        this.activeAction = this.animationActions[0]
        this.scene.add(gltf.scene)
        this.loader.load(
          '/Mesh/Umbrella_Rig_Close.glb',
          gltf => {
            console.log('open')
            const animationAction = this.mixer.clipAction(
              (gltf as any).animations[0]
            )
            this.animationActions.push(animationAction)
            // animationsFolder.add(animations, 'open')
            animationAction.loop = THREE.LoopOnce // Set the animation to play only once
            animationAction.clampWhenFinished = true // Stop the animation on the last frame
            animationAction.enabled = true
            //add an animation from another file
            this.loader.load(
              '/Mesh/Umbrella_Rig_Open.glb',
              gltf => {
                console.log('close')
                ;(gltf as any).animations[0].tracks.shift() //delete the specific track that moves the object forward while running
                const animationAction = this.mixer.clipAction(
                  (gltf as any).animations[0]
                )
                this.animationActions.push(animationAction)
                // animationsFolder.add(animations, 'close')
                animationAction.loop = THREE.LoopOnce // Set the animation to play only once
                animationAction.clampWhenFinished = true // Stop the animation on the last frame
                animationAction.enabled = true

                // modelReady = true
              },
              xhr => {
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
              },
              error => {
                console.log(error)
              }
            )
          },
          xhr => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
          },
          error => {
            console.log(error)
          }
        )
      },
      xhr => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
      },
      error => {
        console.error(error)
      }
    )

    // const geometry = new THREE.BoxGeometry(1, 1, 1)
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    // const cube = new THREE.Mesh(geometry, material)
    // this.scene.add(cube)
    // const animations = {
    //   default: function () {
    //     setAction(this.animationActions[0])
    //   },
    //   open: function () {
    //     setAction(this.animationActions[1])
    //   },
    //   close: function () {
    //     setAction(this.animationActions[2])
    //   }
    // }

    // const setAction = (toAction: THREE.AnimationAction) => {
    //   if (toAction != this.activeAction) {
    //     this.lastAction = this.activeAction
    //     this.activeAction = toAction
    //     // lastAction.stop();
    //     this.lastAction.fadeOut(1)
    //     this.activeAction.reset()
    //     this.activeAction.fadeIn(1)
    //     this.activeAction.play()
    //   }
    // }

    // const gui = new GUI()
    // const animationsFolder = gui.addFolder('Animations')
    this.clock = new THREE.Clock()
    const animate = () => {
      requestAnimationFrame(animate)
      this.controls.update()
      this.mixer?.update(this.clock.getDelta())
      this.renderer.render(this.scene, this.camera)
    }
    animate()
  }
}
