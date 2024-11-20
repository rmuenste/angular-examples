import { Component } from '@angular/core';

interface FileObject {
  name: string;
  x: number[];
  y: number[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  todo: any | null = null;
  title = 'angular-async-tutorial';
  multipleFiles: FileObject[] | null = null;
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

  async fetchMultipleFiles() {
    this.loading = true;
    this.error = '';
    this.multipleFiles = null;

    try {
      const response = await fetch('http://localhost:8000/get-multiple-json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileNames: ["c2g1l5s"]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch multiple files');
      }

      this.multipleFiles = await response.json();
    } catch (err) {
      this.error = 'Failed to load files. Please try again later.';
      console.error('Error fetching multiple files:', err);
    } finally {
      this.loading = false;
    }
  }


}
