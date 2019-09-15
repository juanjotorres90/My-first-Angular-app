import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountsService } from './accounts.service';
import { UserService } from './users.service';
import { NgForm, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { CustomValidators } from './custom-validators';

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


  signupFormR: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  projectForm: FormGroup;


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



  onSubmitR() {
    console.log(this.signupFormR);
    this.signupFormR.reset(); // ! If I want to only reset certain values indicate it through an object inside reset({})
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (this.signupFormR.get('hobbies') as FormArray).push(control);
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }



  onSaveProject() {
    console.log(this.projectForm.value);
  }

  // ! 9. Services

  ngOnInit() {
    this.accounts = this.accountsService.accounts;



    // ! 15. Forms

    this.signupFormR = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
    // this.signupFormR.valueChanges.subscribe(
    //   (value) => console.log(value)
    // );
    this.signupFormR.statusChanges.subscribe(
      (value) => console.log(value)
    );
    this.signupFormR.setValue({
      'userData': {
        'username': 'Juanjo',
        'email': 'juanjo@test.com'
      },
      'gender': 'male',
      'hobbies': []
    });
    this.signupFormR.patchValue({
      'userData': {
        'username': 'Anna'
      }
    });





    // ! 15. Assignment

    this.projectForm = new FormGroup({
      'projectName': new FormControl(
        null,
        [Validators.required, CustomValidators.invalidProjectName], CustomValidators.asyncInvalidProjectName),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'projectStatus': new FormControl('critical')
    });
  }
}
