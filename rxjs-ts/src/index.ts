import { ajax } from "rxjs/ajax";
import { map, catchError } from "rxjs/operators";
import { of } from "rxjs";

const query = "js";
const obs$ = ajax
  .getJSON(`https://api.github.com/search/repositories?q=${query}`)
  .pipe(
    map((response) => {
      console.log('Total count', response['total_count'])
      for(let item of response['items']) {
        const name = item.full_name
        const repo = item.clone_url
        console.log(name, ' -> ', repo)
      }
    }),
    catchError((error) => {
      console.log("error: ", error);
      return of(error);
    })
  );

obs$.subscribe({
  next: (value: any) => console.log("GitHub:", value),
  complete: () => console.log("Complete!"),
  error: (error) => console.log("Error!", error),
});

const o$ = ajax
  .getJSON(`https://gitlab.com/api/v4/projects?search=${query}`)
  .pipe(
    map((response) => {
      for(const [key, value] of Object.entries(response)) {
        const name = value.name_with_namespace;
        const repo = value.http_url_to_repo;
        console.log(name, ' -> ', repo)
      }
    }),
    catchError((error) => {
      console.log("error: ", error);
      return of(error);
    })
  );

o$.subscribe({
  next: (value: any) => console.log("Gitlab:", value),
  complete: () => console.log("Complete!"),
  error: (error) => console.log("Error!", error),
});
