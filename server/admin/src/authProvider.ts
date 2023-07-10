// import { AuthProvider } from 'react-admin'
// import axios from 'axios'
// import { linkClasses } from '@mui/material'

// const authProvider: AuthProvider = {
//   login: async ({ username, password }) => {
//     // const login = await axios.post(
//     //   `${import.meta.env.VITE_API_URL}/auth/login`,
//     //   {
//     //     email: username,
//     //     password
//     //   }
//     // )
//     // Get specific query parameters
//     // console.log(login)
//     // return Promise.resolve()
//     localStorage.setItem('username', username)
//     console.log(username, password)
//     // accept all username/password combinations
//     return Promise.resolve()
//   },
//   logout: () => {
//     localStorage.removeItem('username')
//     return Promise.resolve()
//   },
//   checkError: () => Promise.resolve(),
//   checkAuth: () =>
//     localStorage.getItem('username') ? Promise.resolve() : Promise.reject(),
//   getPermissions: () => Promise.resolve(),
//   getIdentity: () =>
//     Promise.resolve({
//       id: 'user',
//       fullName: 'Jane Doe'
//     }),
//   handleCallback: async () => {
//     const token = window.location.search
//     console.log(token.includes('token='))
//     console.log(token)
//     return Promise.resolve()
//   }
// }

// export default authProvider
