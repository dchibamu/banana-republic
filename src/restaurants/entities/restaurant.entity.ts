import { Field, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  id: number;

  @Field(() => String)
  @IsString()
  @Column()
  name: string;

  @Field(() => Boolean)
  @IsBoolean()
  @Column()
  isVegan?: boolean;

  @Field(() => String)
  @IsString()
  @Column()
  address: string;

  @Field(() => String)
  @IsString()
  @Column()
  ownerName: string;

  @Field(() => String)
  @IsString()
  @Column()
  categoryName: string;
}
