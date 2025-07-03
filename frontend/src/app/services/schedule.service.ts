import { inject, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Schedule } from '../models/schedule.model';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService implements OnInit {
  private httpClient = inject(HttpClient);

  private scheduleSubject = new BehaviorSubject<Schedule[]>([]);
  public schedule$ = this.scheduleSubject.asObservable();

  constructor() {
    this.ngOnInit();
  }

  async ngOnInit() {
    if (environment.dev) {
      // In development mode, fetch schedule from dummy data
      console.log('Using mock data for schedule');

      const data = await import(
        'src/app/services/dummyData/dummyScheduleData.json'
      );
      // Convert date strings to Date objects
      const schedule = data.default.map((schedule: any) => ({
        ...schedule,
        createdAt: new Date(schedule.createdAt),
        updatedAt: new Date(schedule.updatedAt),
      }));

      this.scheduleSubject.next(schedule as Schedule[]);
    } else {
      await this.getSchedule();
    }
  }

  public async getSchedule(filter?: any): Promise<any> {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer `,
      },
    };
    const body = filter || {};
    const schedule = await firstValueFrom(
      this.httpClient.post(
        environment.BASE_URL + '/schedules/find',
        body,
        headers
      )
    );
    if (schedule) {
      this.scheduleSubject.next(schedule as Schedule[]);
    } else {
      console.error('Error fetching schedule:', schedule);
    }
    return schedule;
  }

  public async addSchedule(schedule: Schedule): Promise<any> {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer `,
      },
    };
    const result = await firstValueFrom(
      this.httpClient.post(
        environment.BASE_URL + '/schedules',
        schedule,
        headers
      )
    );
    if (result) {
      const currentSchedule = this.scheduleSubject.getValue();
      this.scheduleSubject.next([...(<any>currentSchedule), result]);
    } else {
      console.error('Error adding schedule:', result);
    }
    return result;
  }

  public async updateSchedule(id: string, data: any): Promise<any> {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer `,
      },
    };
    const result = await firstValueFrom(
      this.httpClient.put(
        environment.BASE_URL + '/schedules/' + id,
        data,
        headers
      )
    );
    if (result) {
      const currentSchedule = this.scheduleSubject.getValue();
      const index = currentSchedule.findIndex((x) => x.id === id);
      if (index !== -1) {
        currentSchedule[index] = <Schedule>result;
        this.scheduleSubject.next([...currentSchedule]);
      }
    } else {
      console.error('Error adding schedule:', result);
    }
    return result;
  }

  public async deleteSchedule(id: string): Promise<any> {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer `,
      },
    };
    const result = await firstValueFrom(
      this.httpClient.delete(environment.BASE_URL + '/schedules/' + id, headers)
    );
    console.log('delete result', result);
    if (result) {
      const currentSchedule = this.scheduleSubject.getValue();
      const updatedSchedule = currentSchedule.filter(
        (schedule) => schedule.id !== id
      );
      this.scheduleSubject.next(updatedSchedule);
    } else {
      console.error('Error deleting schedule:', result);
    }
    return result;
  }
}
