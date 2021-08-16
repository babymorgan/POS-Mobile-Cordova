import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EnvirontmentService } from './environtment.service';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  private env = this.envService.getGeneralEnvironment()

  private prefix = 'feed';

  private GetFeedPath = this.prefix + '/getAll';
  private GetFeedUrl = this.env + this.GetFeedPath;

  private SubmitFeedPath = this.prefix + '/submit';
  private SubmitFeedUrl = this.env + this.SubmitFeedPath;

  constructor(private envService: EnvirontmentService, private http: HttpClient) { }

  public GetAllFeed() {
    return this.http.get<any>(this.GetFeedUrl);
  }

  public SubmitFeed(feed)
  {
    return this.http.post<any>(this.SubmitFeedUrl,feed);
  }

}
