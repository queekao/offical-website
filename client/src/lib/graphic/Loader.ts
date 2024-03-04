// import * as THREE from 'three'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
// export default class Loaders {
//   private loader: GLTFLoader | MTLLoader
//   //   private mixer: THREE.AnimationMixer
//   constructor(scene: THREE.Scene, path: string) {
//     this.loader = new GLTFLoader()
//     this.loadModelAndAnim(scene, this.loader, path)
//   }
//   private loadAnim(
//     scene: THREE.Scene,
//     loader: GLTFLoader,
//     path: string
//   ): Promise<any> {
//     // put the scene and path to render model
//     return new Promise((resolve, reject) => {
//       this.loader.load(
//         // 'models/Mesh/Umbrella__Intro_Anim.glb',
//         path,
//         (gltf: any) => {
//           const animationActions: THREE.AnimationAction[] = []
//           let activeAction: THREE.AnimationAction
//           const mixer = new THREE.AnimationMixer(gltf.scene)

//           const animationAction = mixer.clipAction((gltf as any).animations[0])
//           animationActions.push(animationAction)
//           //   animationsFolder.add(animations, 'default')
//           animationAction.loop = THREE.LoopOnce // Set the animation to play only once
//           animationAction.clampWhenFinished = true // Stop the animation on the last frame
//           animationAction.enabled = true
//           activeAction = animationActions[0]

//           scene.add(gltf.scene)
//           // if ((child as THREE.Light).isLight) {
//           //   // cast each light shadow
//           //   const l = child as THREE.Light
//           //   l.castShadow = true
//           //   l.shadow.bias = -0.005 // make the shadow a offset from the obj
//           //   l.shadow.mapSize.width = 2048
//           //   l.shadow.mapSize.height = 2048
//           // }
//         },
//         xhr => {
//           console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
//         },
//         error => {
//           console.log(error)
//         }
//       )
//     })
//   }
//   private loadModelAndAnim(
//     scene: THREE.Scene,
//     loader: GLTFLoader,
//     path: string
//   ): Promise<any> {
//     // put the scene and path to render model
//     return new Promise((resolve, reject) => {
//       this.loader.load(
//         // 'models/Mesh/Umbrella__Intro_Anim.glb',
//         path,
//         (gltf: any) => {
//           const animationActions: THREE.AnimationAction[] = []
//           let activeAction: THREE.AnimationAction
//           const mixer = new THREE.AnimationMixer(gltf.scene)

//           const animationAction = mixer.clipAction((gltf as any).animations[0])
//           animationActions.push(animationAction)
//           //   animationsFolder.add(animations, 'default')
//           animationAction.loop = THREE.LoopOnce // Set the animation to play only once
//           animationAction.clampWhenFinished = true // Stop the animation on the last frame
//           animationAction.enabled = true
//           activeAction = animationActions[0]

//           scene.add(gltf.scene)
//           // if ((child as THREE.Light).isLight) {
//           //   // cast each light shadow
//           //   const l = child as THREE.Light
//           //   l.castShadow = true
//           //   l.shadow.bias = -0.005 // make the shadow a offset from the obj
//           //   l.shadow.mapSize.width = 2048
//           //   l.shadow.mapSize.height = 2048
//           // }
//         },
//         xhr => {
//           console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
//         },
//         error => {
//           console.log(error)
//         }
//       )
//     })
//   }
// }
export {}
