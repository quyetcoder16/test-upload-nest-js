import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { loginDTO } from './dto/login.dto';
import { PrismaClient } from '@prisma/client'
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService
  ) { }

  prisma = new PrismaClient();

  async login(body: loginDTO): Promise<any> {
    let { email, pass_word } = body;
    let checkUser = await this.prisma.users.findFirst({
      where: {
        email
      }
    });
    if (checkUser) {
      let isCorrectPass = bcrypt.compareSync(pass_word, checkUser.pass_word);
      if (isCorrectPass) {
        let payload = {
          user_id: checkUser.user_id,
          email: checkUser.email,
          role: checkUser.role
        }
        let token = this.jwtService.sign(payload, {
          secret: this.configService.get("SECRET_KEY"),
          expiresIn: this.configService.get("EXPIRES_IN")
        })
        return token;
      }
      return "err"
    }
    return body;
  }

  signUp() {
    return "signUp";
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
