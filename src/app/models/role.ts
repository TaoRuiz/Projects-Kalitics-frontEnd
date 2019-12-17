import { User } from "./user";
import { Position } from "./position";

export interface Role {
  id: number;
  title: string;
  users?: User[];
  position?: Position[];
}
