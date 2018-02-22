import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(private _apiService: ApiService) { }

  message: any = {
    content: ""
  }

  allMessages: any[];

  ngOnInit() {
    this.getAllMessages();
  }

  getAllMessages() {
    console.log('get all messages');
    let observable = this._apiService.getAll();
    observable.subscribe((responseData:any)=>{
      console.log(responseData);
      if (responseData.errors) {
        // let the user know
      } else {
        console.log('new message')
        this.allMessages = responseData.data;
        this.allMessages.reverse();
      }
    })
  }

  newMessage(){
    console.log('new message', this.message);
    let observable = this._apiService.addMessage(this.message);
    observable.subscribe((responseData:any)=>{
      console.log(responseData);
      if (responseData.errors) {
        // let the user know
      } else {
        console.log('new message')
        this.message.content = "";
        // Get all the messages again
        this.getAllMessages();
      }
    })
  }
}
