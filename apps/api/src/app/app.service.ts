import { Injectable } from '@nestjs/common';
import { User } from '@rp-hris/types';

@Injectable()
export class AppService {
  getData(): { message: string; user: User } {
    // Sample Usage of the User Context
    const user: User = {
      id: '1',
      name: 'John Doe',
      email: 'john@gmail.com',
    };
    return { message: 'Hello API', user };
  }
}
