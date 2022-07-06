import { User } from './entities/User';
import { Role } from 'src/typeorm/entities/Role';
import { Book } from 'src/typeorm/entities/Book';
import { Genre } from 'src/typeorm/entities/Genre';
import { Comment } from 'src/typeorm/entities/Comment';
import { BookViews } from 'src/typeorm/entities/BookViews';

export const entities = [User, Role, Book, Genre, BookViews, Comment];

export { User, Role, Book, Genre, BookViews, Comment };
