/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';
    
export interface IUser extends Document {
  readonly fullname: string;
  readonly username: string;
  readonly password: string;
  readonly author: string;
  readonly createdDate: Date;
}