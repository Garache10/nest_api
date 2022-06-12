import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const createdUser = new this.userModel(createUserDto);
      await createdUser.save();
      return createdUser;
    } catch (error) {
      return error;
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.userModel.find().exec();
      return users;
    } catch (error) {
      return error;
    }
  }

  async findOne(id: Types.ObjectId): Promise<User> {
    try {
      const user = await this.userModel.findById(id).exec();
      return user;
    } catch (error) {
      return error;
    }
  }

  async update(id: Types.ObjectId, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const userUpdated = await this.userModel
        .findByIdAndUpdate(id, updateUserDto, { new: true })
        .exec();
      return userUpdated;
    } catch (error) {
      return error;
    }
  }

  async delete(id: Types.ObjectId): Promise<User> {
    try {
      const userDeleted = await this.userModel.findByIdAndDelete(id).exec();
      return userDeleted;
    } catch (error) {
      return error;
    }
  }
}
