import {
  Injectable,
  HttpException,
  HttpStatus,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/dto/create-user.dto';
@Injectable()
export class UserService {
  constructor(@InjectModel('User') private UserModel: Model<UserDocument>) {}
  async signup(user: User): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);
    const reqBody = {
      fullname: user.fullname,
      username: user.username,
      password: hash,
    };
    const foundUser = await this.UserModel.findOne({
      username: user.username,
    }).exec();
    if (foundUser) {
      throw new ConflictException('username already registered');
    }
    const newUser = new this.UserModel(reqBody);
    console.log(newUser);
    return newUser.save();
    //  return new HttpException(
    //     'Incorrect username or password',
    //     HttpStatus.UNAUTHORIZED,
    //   );
  }
  async signin(user: User, jwt: JwtService): Promise<any> {
    const foundUser = await this.UserModel.findOne({
      username: user.username,
    }).exec();
    if (foundUser) {
      console.log(foundUser);
      const password = foundUser.password;
      console.log(user);
      const cp = await bcrypt.compare(user.password, password);
      if (cp) {
        const payload = { username: user.username };
        return {
          token: jwt.sign(payload),
        };
      }
      return new HttpException(
        'Incorrect username or password',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return new HttpException(
      'Incorrect username or password',
      HttpStatus.UNAUTHORIZED,
    );
  }
  async getOne(username: string): Promise<any> {
    return await this.UserModel.findOne({ username }).exec();
  }
  async updateService(id: string, service: object): Promise<any> {
    console.log('service');
    console.log(id, service);
    return await this.UserModel.updateOne(
      { _id: id },
      { $push: { service: service } },
    );
  }
  async deleteService(id: string, service: object): Promise<any> {
    console.log('service');
    console.log(id, service);
    return await this.UserModel.findOneAndUpdate(
      { _id: id },
      { $pull: { service: service } },
    );
  }
  async getService(id: string): Promise<any> {
    return this.UserModel.findById(id);
  }
  async getUser(id: string): Promise<any> {
    return this.UserModel.findById(id);
  }
  async deleteUser(id: string): Promise<any> {
    return this.UserModel.findByIdAndDelete(id);
  }
  async updateUser(userId: string, CreateUserDto: CreateUserDto): Promise<any> {
    const username = CreateUserDto.username;
    const exist_username = await this.UserModel.findOne({ username });
    let hash = '';
    if (CreateUserDto.password) {
      const salt = await bcrypt.genSalt();
      hash = await bcrypt.hash(CreateUserDto.password, salt);
      CreateUserDto.password = hash;
    }
    console.log(hash);
    if (exist_username && exist_username.username != username) {
      throw new ConflictException('username already exist');
    }
    const existUser = await this.UserModel.findByIdAndUpdate(
      userId,
      CreateUserDto,
      { new: true },
    );
    if (!existUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return existUser;
  }
  async getUsers(): Promise<any> {
    return await this.UserModel.find();
  }
}
