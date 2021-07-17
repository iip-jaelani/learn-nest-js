import { UserDocument } from 'src/schema/user.schema';

export interface User extends UserDocument {
  username: string;
  password: string;
  email: string;
  role_id: string;
}
