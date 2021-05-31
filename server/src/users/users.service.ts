import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import CreateUserDto from './dto/create-user.dto';
import GetUserDto from './dto/get-user.dto';
import { User, UserDocument } from './user.model';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async signup(userData: CreateUserDto): Promise<User> {
    const { email, password, firstName, lastName } = userData;
    const user = await this.UserModel.findOne({ email }).exec();

    if (user) {
      throw new HttpException(
        `User ${email} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new this.UserModel({
      email,
      hashedPassword,
      firstName,
      lastName,
    });
    try {
      await newUser.save();
      return newUser;
    } catch (error) {
      throw new HttpException(
        `User ${email} not created`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async signin(userData: GetUserDto, request): Promise<User> {
    const { email, password } = userData;
    const user = await this.UserModel.findOne({ email }).exec();
    if (!user) {
      throw new HttpException(
        `User ${email} not exists`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const { firstName, lastName, _id } = user;
    await this.verifyPassword(password, user.hashedPassword);
    const secret = this.configService.get('JWT_SECRET');
    const expiresIn = this.configService.get('JWT_EXPIRATION_TIME');
    const id = _id;
    const payload = { id, email, firstName, lastName };
    const token = this.jwtService.sign(payload, { secret, expiresIn });
    const cookie = `Authentication=${token}; Path=/; Max-Age=${expiresIn};`;
    request.res.setHeader('Set-Cookie', [cookie]);
    return user;
  }

  private async verifyPassword(password: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.UserModel.findById(id).exec();
    if (!user) {
      throw new HttpException(`User ${id} not exists`, HttpStatus.BAD_REQUEST);
    }
    return user;
  }
}
