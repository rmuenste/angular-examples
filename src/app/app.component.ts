import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  todo: any | null = null;
  title = 'angular-async-tutorial';
  loading = false;
  error = '';

  ngOnInit() {
    this.fetchTodo();
  }

  async fetchTodo() {
    this.loading = true;
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
      if(!response.ok) {
        throw new Error('Failed to fetch todo');
      }
      this.todo = await response.json();
    } catch (err) {
      this.error = 'Failed to load todo. Please try again later.';
      console.error('Error fetching todo:', err);
    } finally {
      this.loading = false;
    }
  }

}
