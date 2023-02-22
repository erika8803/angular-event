import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';

import { Schedule } from './model/schedule';
import { User } from './model/user';

// ユーザーデータのMOCデータ
const CURRENT_USER: User = new User(1, 'test');
const ANOTHER_USER: User = new User(2, 'test02');

// スケジュールデータのMOCデータ
const SCHEDULES: Schedule[] = [
  new Schedule(CURRENT_USER, '2022/02/01', '誕生日！', 'テキストテキストテキストテキストテキストテキスト' ),
  new Schedule(ANOTHER_USER, '2022/02/02', '誕生日！', 'テキストテキストテキストテキストテキストテキスト' ),
  new Schedule(ANOTHER_USER, '2022/02/01', '誕生日！', 'テキストテキストテキストテキストテキストテキスト' ),
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public now = new Date();

  // schedules = SCHEDULES;
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
    this.schedules$ = this.schedulesRef.valueChanges();
  }

  addSchedule(eventDate:string, eventTitle: string, eventComment: string): void {
    if (eventTitle) {
      this.schedulesRef.push(new Schedule(this.currentUser, eventDate, eventTitle, eventComment));
      this.eventDate = '' ;
      this.eventTitle = '' ;
      this.eventComment = '' ;
    }
  }

}
