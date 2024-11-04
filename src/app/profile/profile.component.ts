import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {ApiService} from '../api.service';
import {Profiles} from '../profiles';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterLink,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  profileData: { message: string; user: Profiles } | undefined;

  ngOnInit() {
    this.apiService.getProfile().subscribe(response => {
      this.profileData = response;
      console.log(this.profileData);
    });
  }

}
