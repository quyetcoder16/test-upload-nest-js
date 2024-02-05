import { Injectable } from '@nestjs/common';
import { Demo } from './dto/demo.type';

@Injectable()
export class AppService {
  getHello(): string {
    return 'tes';
  }

  getListUser(id: string, hoTen: string, filler: string, token: string): Demo {
    return { id, hoTen, filler, token };
  }
}
