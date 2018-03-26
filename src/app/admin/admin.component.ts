import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastComponent } from '../shared/toast/toast.component';
import { Payload} from '../model/Payload';
import { Notification} from '../model/Notification';
import { DeviceDetailComponent} from '../device-detail/device-detail.component';
import { AuthService } from '../services/auth.service';
import { UserService} from '../services/user.service';
import { User} from '../model/user';

export class SearchUser {
  firstName:string;
  area:string;
  phoneNumber:string;
  role:string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit {
    users: User[];
    isLoading = true;
    searchForm:FormGroup;
    firstName = new FormControl('');
    phoneNumber = new FormControl('');
    area = new FormControl('');
    role = new FormControl('');
  constructor(private formBuilder:FormBuilder,
              private userService:UserService,
              public toast: ToastComponent,public auth: AuthService ) { }


  ngOnInit() {
    this.getUsers();
     this.searchForm = this.formBuilder.group({
            firstName :this.firstName,                                    
            phoneNumber:this.phoneNumber,            
            area:this.area,
            role:this.role
        })    
  }

  getUsers(){
  	 this.userService.getUsers()
    	.subscribe(users => {
    		this.users = users
    		console.log(this.users);
    	},
      error => console.log(error),
      () => this.isLoading = false);
  }

  checkAll(ev) {
    this.users.forEach(x => x.userState = ev.target.checked)
  }

  isAllChecked() {
    // if(this.users)
    //   return this.users.every(item => item.state);
  }

  search(){
    let searchUser= new SearchUser();
    if(this.searchForm.value.firstName)
      searchUser.firstName =this.searchForm.value.firstName;
    if(this.searchForm.value.phoneNumber)
      searchUser.phoneNumber =this.searchForm.value.phoneNumber;
    if(this.searchForm.value.area)
     searchUser.area =this.searchForm.value.area;
    if(this.searchForm.value.role)
     searchUser.role =this.searchForm.value.role;
    console.log(searchUser);
    this.userService.searchUser(searchUser)
    	.subscribe(users => {
    		this.users = users
    		console.log(this.users);
    	});
  }


}
