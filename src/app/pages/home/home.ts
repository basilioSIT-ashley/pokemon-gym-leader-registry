
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GymLeaderService } from '../../services/gym-leader';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  private gymLeaderService = inject(GymLeaderService);

  kantoCount = this.gymLeaderService.kantoCount;
  johtoCount = this.gymLeaderService.johtoCount;
  hoennCount = this.gymLeaderService.hoennCount;

  ngOnInit(): void {
    this.gymLeaderService.fetchLeaders();
  }
}
