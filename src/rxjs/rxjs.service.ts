import { Injectable } from '@nestjs/common';
import {
  firstValueFrom,
  toArray,
  from,
  map,
  mergeAll,
  take,
  Observable,
} from 'rxjs';
import axios from 'axios';

@Injectable()
export class RxjsService {
  private readonly githubURL = 'https://api.github.com/search/repositories?q=';
  private readonly gitlabURL = 'https://gitlab.com/api/v4/projects?search=';

  private getGitData(params: {
    url: string;
    text: string;
    count: number;
  }): Observable<any> {
    return from(axios.get(`${params.url}${params.text}`))
      .pipe(
        map((res: any) => res.data.items),
        mergeAll(),
      )
      .pipe(take(params.count));
  }

  async searchRepositories(text: string, hub: string): Promise<any> {
    const url = hub === 'github' ? this.githubURL : this.gitlabURL;
    const data$ = this.getGitData({ url, text, count: 10 }).pipe(toArray());
    data$.subscribe(() => {});
    return await firstValueFrom(data$);
  }
}
