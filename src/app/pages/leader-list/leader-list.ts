
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { GymLeaderService } from '../../services/gym-leader';
import { LeaderCard } from '../../components/leader-card/leader-card';

@Component({
  selector: 'app-leader-list',
  standalone: true,
  imports: [LeaderCard, RouterLink],
  templateUrl: './leader-list.html',
  styleUrl: './leader-list.css'
})
export class LeaderList implements OnInit {
  private gymLeaderService = inject(GymLeaderService);
  private router = inject(Router);

  leaders = this.gymLeaderService.leaders;
  selectedRegion = signal('All');

  filteredLeaders = computed(() => {
    const region = this.selectedRegion();

    if (region === 'All') {
      return this.leaders();
    }

    return this.leaders().filter(
      leader => leader.region === region
    );
  });

  ngOnInit(): void {
    this.gymLeaderService.fetchLeaders();
  }

  filterBy(region: string): void {
    this.selectedRegion.set(region);
  }

  editLeader(id: string): void {
    this.router.navigate(['/leaders', id, 'edit']);
  }

  removeLeader(id: string): void {
    const leader = this.leaders().find(item => item._id === id);

    if (!leader) {
      return;
    }

    const confirmed = confirm(
      `Remove ${leader.name} from the registry?`
    );

    if (confirmed) {
      this.gymLeaderService.deleteLeader(id).subscribe({
        error: error =>
          console.error('Failed to remove Gym Leader:', error)
      });
    }
  }
}
