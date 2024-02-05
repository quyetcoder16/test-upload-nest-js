import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client'
import { initAvatar } from 'src/utils';


@Injectable()
export class UserService {

  prisma = new PrismaClient()

  async create(createUserDto: CreateUserDto): Promise<string> {
    // return 'This action adds a new user';


    let fullName = createUserDto.full_name;

    const newUser = { ...createUserDto, face_app_id: "123454", avatar: initAvatar(fullName) };

    await this.prisma.users.create({
      data: newUser
    });
    return "success";
  }

  async findAll(skip: number, numSize: number, fill: string): Promise<any> {
    let data = await this.prisma.users.findMany({
      where: {
        full_name: {
          contains: fill
        }
      },
      include: {
        video_comment: true,
        video_like: true,
      },

    });
    return data;
    // return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
