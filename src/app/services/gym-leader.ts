
import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { GymLeader } from '../models/gym-leader';

@Injectable({
  providedIn: 'root'
})
export class GymLeaderService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/api/leaders';

  // Stores the list of Gym Leaders
  leaders = signal<GymLeader[]>([]);

  // Counts Gym Leaders by region
  kantoCount = computed(() =>
    this.leaders().filter(leader => leader.region === 'Kanto').length
  );

  johtoCount = computed(() =>
    this.leaders().filter(leader => leader.region === 'Johto').length
  );

  hoennCount = computed(() =>
    this.leaders().filter(leader => leader.region === 'Hoenn').length
  );

  // Get all Gym Leaders
  fetchLeaders(): void {
    this.http.get<GymLeader[]>(this.apiUrl).subscribe({
      next: leaders => this.leaders.set(leaders),
      error: error => console.error('Failed to fetch Gym Leaders:', error)
    });
  }

  // Get one Gym Leader
  getLeader(id: string): Observable<GymLeader> {
    return this.http.get<GymLeader>(`${this.apiUrl}/${id}`);
  }

  // Add a Gym Leader
  addLeader(leader: GymLeader): Observable<GymLeader> {
    return this.http.post<GymLeader>(this.apiUrl, leader).pipe(
      tap(() => this.fetchLeaders())
    );
  }

  // Update a Gym Leader
  updateLeader(id: string, leader: GymLeader): Observable<GymLeader> {
    return this.http.put<GymLeader>(`${this.apiUrl}/${id}`, leader).pipe(
      tap(() => this.fetchLeaders())
    );
  }

  // Delete a Gym Leader
  deleteLeader(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `${this.apiUrl}/${id}`
    ).pipe(
      tap(() => this.fetchLeaders())
    );
  }
}
