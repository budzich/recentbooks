import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('genres')
export class Genre {
  @ApiProperty({ example: 1, description: 'Genre id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Fantasy', description: 'Book genre' })
  @Column({ unique: true })
  title: string;
}
