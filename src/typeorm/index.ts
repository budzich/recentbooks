import { User } from './entities/User';
import { Role } from 'src/typeorm/entities/Role';
import { Book } from 'src/typeorm/entities/Book';
import { Genre } from 'src/typeorm/entities/Genre';
import { BookViews } from 'src/typeorm/entities/BookViews'

export const entities = [User, Role, Book, Genre, BookViews];

export { User, Role, Book, Genre, BookViews };
