// import React from 'react'
// import { useFormContext } from 'react-hook-form'
// import { Editor } from 'draft-js'

// const DraftJSInput = (name: any, defaultValue: any) => {
//   const { register } = useFormContext()

//   // Register the Draft.js input with React Hook Form
//   React.useEffect(() => {
//     register({ name })
//   }, [register, name])

//   // Handle changes in the Draft.js editor
//   const handleChange = (contentState) => {
//     // Get the raw text from the content state
//     const text = contentState.getPlainText()

//     // Update the form field value
//     setValue(name, text)
//   }

//   return <Editor defaultValue={defaultValue} onChange={handleChange} />
// }

// export default DraftJSInput
