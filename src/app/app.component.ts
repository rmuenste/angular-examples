import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface FileObject {
  name: string;
  x: number[];
  y: number[];
}

interface Todo2 {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  todo: any | null = null;

  todo$: Observable<Todo2> | null = null;
  title = 'angular-async-tutorial';
  multipleFiles: FileObject[] | null = null;
  loading = false;
  loading2 = false;
  error = '';

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.fetchTodo();
    console.log('1. Starting execution');
    this.asyncOperation();
    console.log('4. After async function call');

  }

  async asyncOperation() {
    console.log('2. Starting async operation');

    // This await pauses execution inside this function
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('3. Async operation complete');
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

  async fetchTodoPromises() {
    this.loading = true;
  
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch todo');
        }
        return response.json();
      })
      .then(data => {
        this.todo = data;
      })
      .catch(err => {
        this.error = 'Failed to load todo. Please try again later.';
        console.error('Error fetching todo:', err);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  // Method to fetch the todo item
  fetchTodoWithObservable() {
    this.loading = true;
    this.http.get('https://jsonplaceholder.typicode.com/todos/1')
      .subscribe({
        next: (data) => {
          this.todo = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load todo. Please try again later.';
          console.error('Error fetching todo:', err);
          this.loading = false;
        },
        complete() {
          console.info('Complete');        
        }
      });
  }  

  // Method to fetch the todo item
  async fetchTodoWithObservablePipe() {
    this.loading2 = true;

    const result = await new Promise(resolve => 
        setTimeout(() => resolve('2. Finished waiting'), 2000)
    );

    this.todo$ = this.http.get<Todo2>('https://jsonplaceholder.typicode.com/todos/2');

    this.todo$.subscribe({
        next: (data) => {
          this.todo = data;
          this.loading2 = false;
        },
        error: (err) => {
          this.error = 'Failed to load todo. Please try again later.';
          console.error('Error fetching todo:', err);
          this.loading2 = false;
        },
        complete() {
          console.info('Complete');        
        }
      });
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
