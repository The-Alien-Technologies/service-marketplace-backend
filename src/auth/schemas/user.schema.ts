import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../../common/enums/role.enum';
import * as easyMongoosePaginate from 'easy-mongoose-paginate';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: Role, default: Role.USER })
  role: string;

  @Prop({ required: true, default: false })
  isVerified: boolean;
}

const UserSchema = SchemaFactory.createForClass(User);
UserSchema.plugin(easyMongoosePaginate);

export { UserSchema };
