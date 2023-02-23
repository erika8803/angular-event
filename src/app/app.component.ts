import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Schedule } from './model/schedule';
import { User } from './model/user';

// ユーザーデータのMOCデータ
const CURRENT_USER: User = new User(1, 'test');
const ANOTHER_USER: User = new User(2, 'test02');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public now = new Date();

  schedules$: Observable<Schedule[]>;
  schedulesRef: AngularFireList<Schedule>;

  currentUser = CURRENT_USER;
  eventDate = '';
  eventTitle = '';
  eventComment = '';

  item$: Observable<any>;

  constructor(private db: AngularFireDatabase) {
    this.item$ = db.object('/item').valueChanges();
    this.schedulesRef = db.list('/schedules');
    this.schedules$ = this.schedulesRef.snapshotChanges()
      .pipe(
        map((snapshots: SnapshotAction<Schedule>[]) => {
          return snapshots.map(snapshot => {
            const value = snapshot.payload.val();
            return new Schedule({ key: snapshot.payload.key, ...value});
          });
        })
      )
  }

  addSchedule(eventDate:string, eventTitle: string, eventComment: string): void {
    if (eventTitle) {
      this.schedulesRef.push(new Schedule({
        user: this.currentUser,
        eventDate: eventDate,
        eventTitle: eventTitle,
        eventComment: eventComment
      }));
      this.eventDate = '' ;
      this.eventTitle = '' ;
      this.eventComment = '' ;
    }
  }
  updateSchedule(getEventDate: Schedule): void {
    const { key, eventDate, eventTitle, eventComment } = getEventDate;

    this.schedulesRef.update(key, { eventDate, eventTitle, eventComment});
  }

  deleteSchedule(getEventDate: Schedule): void {
    this.schedulesRef.remove(getEventDate.key);
  }

}
