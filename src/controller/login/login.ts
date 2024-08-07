import { Request, Response } from 'express'
import { LoginService } from '../../service/login/login'

export const LoginController = async (req: Request, res: Response) => {
  try {
    const data = await LoginService(req.body)
    if (data) {
      res.status(200).json({ message: 'Data fetched', data })
    } else {
      res.status(404).json({ message: 'Invalid credentials', data: null })
    }
  } catch (error) {
    res.status(404).json({ message: 'Error at LoginController: ', error })
  }
}
