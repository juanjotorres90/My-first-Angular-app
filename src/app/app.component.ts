import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountsService } from './accounts.service';
import { UserService } from './users.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css']
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit {
  @ViewChild('f', {static: false}) signupForm: NgForm; // ! 15. Forms
  defaultQuestion = 'teacher';
  answer = '';
  genders = ['male', 'female'];
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  };
  submitted = false;

  constructor(private accountsService: AccountsService) {}



  /*   servers = [];

  onAddServer() {
    this.servers.push('Another Server');
  } */

  /*   onRemoveServer(id: number) {
    const position = id;
    this.servers.splice(position, 1);
  } */
  oddNumbers: number[] = [];
  evenNumbers: number[] = [];

  serverElements = [
    { type: 'server', name: 'Testserver', content: 'Just a test' }
  ];

  // ! 7.Directives
  numbers = [1, 2, 3, 4, 5];
  oddNumbers7 = [1, 3, 5];
  evenNumbers7 = [2, 4];
  onlyOdd = false;
  value = 10;

  accounts: { name: string; status: string }[] = [];

  onServerAdded(serverData: { serverName: string; serverContent: string }) {
    this.serverElements.push({
      type: 'server',
      name: serverData.serverName,
      content: serverData.serverContent
    });
  }

  onBlueprintAdded(blueprintData: {
    serverName;
    string;
    serverContent: string;
  }) {
    this.serverElements.push({
      type: 'blueprint',
      name: blueprintData.serverName,
      content: blueprintData.serverContent
    });
  }
  onChangeFirst() {
    this.serverElements[0].name = 'Changed!';
  }

  onDestroyFirst() {
    this.serverElements.splice(0, 1);
  }

  onIntervalFired(firedNumber: number) {
    firedNumber % 2 === 0
      ? this.evenNumbers.push(firedNumber)
      : this.oddNumbers.push(firedNumber);
  }

  // ! 15. Forms
  suggestUserName() {
    const suggestedName = 'Superuser';
    // this.signupForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: ''
    //   },
    //   secret: 'pet',
    //   questionAnswer: '',
    //   gender: 'male'
    // });
    this.signupForm.form.patchValue({ // ! overwrite only parts of the form
      userData: {
        username: suggestedName
    }});
  }

  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }

  onSubmit() {
    this.submitted = true;
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secretQuestion = this.signupForm.value.secret;
    this.user.answer = this.signupForm.value.questionAnswer;
    this.user.gender = this.signupForm.value.gender;

    this.signupForm.reset();
  }

  // ! 9. Services

  ngOnInit() {
    this.accounts = this.accountsService.accounts;
  }
}
