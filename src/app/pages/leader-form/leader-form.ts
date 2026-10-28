
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GymLeaderService } from '../../services/gym-leader';
import { GymLeader } from '../../models/gym-leader';

@Component({
  selector: 'app-leader-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './leader-form.html',
  styleUrl: './leader-form.css'
})
export class LeaderForm implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private gymLeaderService = inject(GymLeaderService);

  leaderId: string | null = null;
  isEditMode = signal(false);
  isLoading = signal(false);
  errorMessage = signal('');

  leaderForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    region: ['Kanto' as 'Kanto' | 'Johto' | 'Hoenn', Validators.required],
    town: ['', Validators.required],
    badge: ['', Validators.required],
    specialty: ['', Validators.required],
    aceLevel: [1, [
      Validators.required,
      Validators.min(1),
      Validators.max(100),
      Validators.pattern(/^\d+$/)
    ]],
    motto: ['', Validators.maxLength(150)]
  });

  ngOnInit(): void {
    this.leaderId = this.route.snapshot.paramMap.get('id');

    if (this.leaderId) {
      this.isEditMode.set(true);
      this.isLoading.set(true);

      this.gymLeaderService.getLeader(this.leaderId).subscribe({
        next: leader => {
          this.leaderForm.patchValue({
            name: leader.name,
            region: leader.region,
            town: leader.town,
            badge: leader.badge,
            specialty: leader.specialty,
            aceLevel: leader.aceLevel,
            motto: leader.motto ?? ''
          });
          this.isLoading.set(false);
        },
        error: error => {
          console.error('Failed to load Gym Leader:', error);
          this.errorMessage.set('Could not load this Gym Leader.');
          this.isLoading.set(false);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.leaderForm.invalid) {
      this.leaderForm.markAllAsTouched();
      return;
    }

    this.errorMessage.set('');
    const formValue = this.leaderForm.getRawValue();

    const leader: GymLeader = {
      ...formValue,
      aceLevel: Number(formValue.aceLevel)
    };

    if (this.isEditMode() && this.leaderId) {
      this.gymLeaderService.updateLeader(this.leaderId, leader).subscribe({
        next: () => this.router.navigate(['/leaders']),
        error: error => {
          console.error('Failed to update Gym Leader:', error);
          this.errorMessage.set('Could not update the Gym Leader. Please try again.');
        }
      });
    } else {
      this.gymLeaderService.addLeader(leader).subscribe({
        next: () => {
          this.leaderForm.reset({
            name: '',
            region: 'Kanto',
            town: '',
            badge: '',
            specialty: '',
            aceLevel: 1,
            motto: ''
          });
          this.router.navigate(['/leaders']);
        },
        error: error => {
          console.error('Failed to add Gym Leader:', error);
          this.errorMessage.set('Could not add the Gym Leader. Please check the details and try again.');
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/leaders']);
  }
}
