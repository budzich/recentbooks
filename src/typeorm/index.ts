import { User } from './entities/User';
import { Role } from 'src/typeorm/entities/Role';
import { Book } from 'src/typeorm/entities/Book';

export const entities = [User, Role, Book];

export { User, Role, Book };
