import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {

  constructor(private _http: HttpClient) { }

  addMessage(newMessage) {
    console.log('add message');
    return this._http.post('/api/messages', newMessage);
  }

  getAll() {
    console.log('get all');
    return this._http.get('/api/messages');
  }
}
