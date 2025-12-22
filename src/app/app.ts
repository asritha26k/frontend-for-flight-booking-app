import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';
import { AuthService } from './services/Authentication/auth-service';
import { UserRole } from './enums/user-role.enum';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  protected readonly title = signal('frontendForSigningIn');

  user$!: Observable<string>;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  get currentUser$() {
    return this.authService.currentUser;
  }

  ngOnInit(): void {
    this.user$ = this.currentUser$.pipe(
      map(user =>{
        console.log(user);
  return user?.roles.includes(UserRole.ROLE_ADMIN) ? 'admin' : 'user';
      }
       
      )
    );
  }

  logout() {
    this.authService.signout().subscribe({
      next: () => {
        this.closeSidebar();
        this.router.navigate(['/']).then(() => window.location.reload());
      }
    });
  }
  sidebarOpen = false;

toggleSidebar() {
  this.sidebarOpen = !this.sidebarOpen;
}

closeSidebar() {
  this.sidebarOpen = false;
}



  flightsAddPage() {
    this.router.navigate(['/addFlights']);
  }

  

 
  changePassword(){
    this.router.navigate(['/change-password']);
  }
}
