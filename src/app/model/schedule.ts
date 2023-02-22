import { User } from './user';

export class Schedule {
  constructor(
    public user: User,
    public eventDate: string,
    public eventTitle: string,
    public eventComment: string
  ) { }

}
