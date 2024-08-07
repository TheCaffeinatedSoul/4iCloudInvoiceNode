import { queryWithBindExecute } from '../../config/database'
import { login } from '../../constants/query'
import { T_Login } from '../../types/services'

export const LoginService = async (payload: T_Login) => {
  const { USERNAME, PASSWORD } = payload
  try {
    const response = await queryWithBindExecute({
      sql: login.LOGIN,
      values: [USERNAME, PASSWORD],
    })
    if (response.length !== 0) {
      return response
    } else {
      return null
    }
  } catch (error) {
    console.log('Error in login service: ', error)
  }
}
