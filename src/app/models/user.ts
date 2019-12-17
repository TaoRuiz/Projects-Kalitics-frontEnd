import { Role } from "./role";
import { Position } from "./position";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email?: string;
  avatar?: string;
  position?: Position;
  roles?: Role[];
}
