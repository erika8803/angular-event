import { User } from './user';
export class Schedule {

  user: User;
  eventDate: string;
  eventTitle: string;
  eventComment: string;
  key?: string;
  isEdit: boolean;

  constructor(value: any) {
    this.user = value.user;
    this.eventDate = value.eventDate;
    this.eventTitle = value.eventTitle;
    this.eventComment = value.eventComment;
    if (value.key) {
      this.key = value.key;
    }

  }

}
