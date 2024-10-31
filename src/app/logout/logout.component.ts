import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent implements OnInit {

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.apiService.logout().subscribe(response => {
      console.log(response);
      localStorage.removeItem('token');
      this.router.navigate(['/']);
    });
  }
}
