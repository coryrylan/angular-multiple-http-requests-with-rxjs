import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <h1>Angular Multiple HTTP Requests with RxJS</h1>

    <p>
      <a href="https://coryrylan.com/blog/angular-multiple-http-requests-with-rxjs">Tutorial at coryrylan.com</a>
    </p>

    <pre>
      {{loadedCharacter | json}}
    </pre>
  `,
})
export class App {
  loadedCharacter!: {};
  constructor(private http: HttpClient) { }

  ngOnInit() {
    let character = this.http.get('https://swapi.dev/api/people/1/');
    let characterHomeworld = this.http.get('https://swapi.dev/api/planets/1/');

    forkJoin([character, characterHomeworld]).subscribe(results => {
      // results[0] is our character
      // results[1] is our character homeworld
      (results[0] as any).homeworld = results[1];
      this.loadedCharacter = results[0];
    });
  }
}

bootstrapApplication(App);
