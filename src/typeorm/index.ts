import { User } from './entities/User';
import { Role } from 'src/typeorm/entities/Role';
import { Book } from 'src/typeorm/entities/Book';
import { Genre } from 'src/typeorm/entities/Genre';

export const entities = [User, Role, Book, Genre];

export { User, Role, Book, Genre };
