/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop({ required: true })
  fullname: string;
  @Prop({ required: true, lowercase: true })
  username: string;
  @Prop({ required: true })
  password: string;
  @Prop({ default: Date.now() })
  createdDate: Date;
  @Prop({ default: "user" })
  isAdmin: string;
  @Prop()
  service : [];
}
export const UserSchema = SchemaFactory.createForClass(User);
