/*

import Helper from '../helpers/helper';
import dummyData from '../datastore/users';
import jwt from 'jsonwebtoken';


const { users } = dummyData;

export default class AuthController {
  /**
   * @description Register a new user
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @route POST /api/v1/auth/signup
   * @returns {Object} status code, data and message properties
   * @access public
   */

/*  static signUp(req, res) {
    // eslint-disable-next-line no-unused-vars
    const { firstName, lastName, email, password, password2 } = req.body;
    const existingUser = users.some(user => user.email === email);
    if (!existingUser) {
      const hashPassword = Helper.hashPassword(req.body.password);
      const usersLength = users.length;
      const lastID = users[usersLength - 1].id;
      const newID = lastID + 1;
      const newUser = {
        id: newID,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password: hashPassword,
        type: 'client',
        createdAt:new Date()
      }

      users.push(newUser);
      const payload = { id: newUser.id, email: newUser.email };
      const token = jwt.sign(payload, 'iamaboy', { expiresIn: '15 minutes' });
      const data = {
        token,
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        type: newUser.type,
        createdAt: newUser.createdAt
      };
      return res.status(201).json({
        status: 201,
        data,
        message: 'User registered successfully'
      });
    }
    res.status(409).json({
      status: 409,
      error: 'User already exists'
    });

    return true;
  }*/

/**
 * @description Log In an existing user
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @route POST /api/v1/auth/signin
 * @returns {Object} status code, data and message properties
 * @access public
 */

/* static signIn(req, res) {
   const { email, password } = req.body;
   for (let i = 0; i < users.length; i += 1) {
     if (email === users[i].email) {
       if (password === users[i].password) {
         const userInfo = users[i];
         const payload = {
           id: userInfo.id,
           email: userInfo.email,
           type: userInfo.type,
           firstName: userInfo.firstName,
           lastName: userInfo.lastName,
           isAdmin: userInfo.isAdmin
         };
         const token = jwt.sign(payload, 'iamaboy', { expiresIn: '15 minutes' });
         const data = {
           token,
           id: userInfo.id,
           firstName: userInfo.firstName,
           lastName: userInfo.lastName,
           email: userInfo.email,
           type: userInfo.type
         };
         return res.status(200).json({
           status: 200,
           data,
           message: 'Login successful'
         });
       }
       return res.status(403).json({
         status: 403,
         error: 'Password Incorrect'
       });
     }
   }
   return res.status(403).json({
     status: 403,
     error: 'User not found'
   });
 }
}*/
"use strict";