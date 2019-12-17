import { Role } from "./role";
import { User } from "./user";

export interface Position {
  id: number;
  title: string;
  roles?: Role[];
  users?: User[];
}
