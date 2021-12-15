import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private snackbar: MatSnackBar
  ) { }

  showSimpleNotification(text: string, duration: number = 3000): void {
    this.snackbar.open(text, 'Close', { duration: duration, horizontalPosition: "center", verticalPosition: "top" });
  }
}
