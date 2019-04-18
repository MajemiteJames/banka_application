import Helper from '../helpers/helper';
import User from '../datastore/users';




class UserController {

  /**
   * Create A User
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object 
   */
  // eslint-disable-next-line consistent-return
  static signup(request, response) {
    if (!request.body.firstName) {
      return response.status(400).json({
        status: 400,
        error: 'First name is required',
      });
    }
    if (!request.body.lastName) {
      return response.status(400).json({
        status: 400,
        error: 'Last name is required',
      });
    }
    if (!request.body.email) {
      return response.status(400).json({
        status: 400,
        error: 'Email is required',
      });
    }
    if (!request.body.password) {
      return response.status(400).json({
        status: 400,
        error: 'Password is required',
      });
    }
    if (request.body.password !== request.body.confirmPassword) {
      return response.status(400).json({
        status: 400,
        error: 'Passwords do not match',
      });
    }
 
    const hashPassword = Helper.hashPassword(request.body.password);
    const token = Helper.generateToken(request.body.email);
   
    const data = {
      token,
      id: User.length + 1,
      email: request.body.email,
      firstname: request.body.firstName,
      lastname: request.body.lastName,
      hashPassword,
      type: 'user',
      registered: new Date().toISOString(),
      isAdmin: false,
    };
    User.push(data);
    return response.status(201).send({
      status: 201,
      success: 'true',
      message: 'Signup successfully',
      data
    })
  }

   /**
   * Login
   * @param {object} req 
   * @param {object} res
   * @returns {object} user object 
   */
  static login(request, response) {
    if (!request.body.email) {
      return response.status(400).json({
        status: 400,
        error: 'Email is required',
      });
    }
    if (!Helper.isValidEmail(request.body.email)) {
      return res.status(400).send({ 'message': 'Please enter a valid email address' });
    }
    if (!request.body.password) {
      return response.status(400).json({
        status: 400,
        error: 'Password is required',
      });
    }

  
    const token = Helper.generateToken(request.body.email);
    const data = {
      token,
      id: 3,
      firstname: 'Fejiro',
      lastname: 'Gospel',
      email: 'okorojames@gmail.com',
      password: 'password'
    }
    if (request.body.email == 'okorojames@gmail.com' && request.body.password == 'password') {
        // return the JWT token for the future API calls
        response.json({
          success: true,
          message: 'Authentication successful!',
          data,
        });
      }
      if(request.body.email !== data.email){
        response.json({
          status: 404,
          success: false,
          message: 'email not correct',
        })
      }
      if(request.body.password !== data.password) {
        response.json({
          status: 404,
          success: false,
          message: 'password not correct'
        })
      }
    }
  
 
   
}
export default UserController;