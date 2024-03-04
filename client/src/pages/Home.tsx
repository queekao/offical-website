import React, { useEffect, useRef } from 'react'
import Engine from '../lib/Engine'
// import PopupModal from '../components/PopupModal'
export default function Home(): React.ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  //the useEffect hook serves asynchronously, whereas the useLayoutEffect hook works synchronously
  // UseLayoutEffect server side problem: https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
  useEffect(() => {
    // on strictMode React call useEffect twice
    const { current } = canvasRef
    if (!current) return
    const graphicEngine = new Engine(current)
    // graphicEngine.getController().target.set(0, 2, 0)
    function handleChange() {
      graphicEngine.getController().update()
    }
    graphicEngine
      .getDom()
      .addEventListener('click', graphicEngine.clickPlane, false)
    return () => {
      graphicEngine.getController().removeEventListener('change', handleChange)
      graphicEngine
        .getDom()
        .removeEventListener('click', graphicEngine.clickPlane)
    }
  }, [])

  return (
    <>
      {/* <PopupModal /> */}
      <canvas ref={canvasRef}></canvas>
      {/* <div ref={guiRef}></div> */}
    </>
  )
}
