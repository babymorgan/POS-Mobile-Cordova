import { Component, OnInit } from '@angular/core';
import { FeedService } from '../service/feed.service';
import { ModalController, AlertController } from '@ionic/angular';
import { FeedModal } from './feed-detail-modal/feed-modal';
import { FeedModel } from '../models/feed.model';
import { Storage } from '@ionic/storage';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  constructor(private feedService: FeedService,
    private alertController: AlertController,
    private modalController: ModalController,
    private storage: Storage, private authService: AuthService) { }

  feedList;
  subject;
  message;
  feed = new FeedModel();

  ngOnInit() {
    this.feed = new FeedModel();
    this.getFeedList();
  }

  getFeedList() {
    this.feedService.GetAllFeed().subscribe(res => {
      this.feedList = res.data;
      this.feedList.forEach(element => {
        element.abbr = element.company_name.substring(0, 2);
      });
    })
  }

  async createModal(feeds) {
    const modal = await this.modalController.create({
      component: FeedModal,
      componentProps: {
        'subject': feeds.subject,
        'address': feeds.address,
        'companyName': feeds.company_name,
        'businessType': feeds.business_type,
        'phoneNumber': feeds.phone,
        'message': feeds.message
      }
    });

    await modal.present();
  }

  async saveFeed() {
    if ((!this.feed.message && this.feed.message.length == 0) || (!this.feed.subject && this.feed.subject.length == 0)) {
      const alert = await this.alertController.create({
        header: 'Alert',
        message: 'Subject and Message need to be filled.',
        buttons: ['OK']
      });

      await alert.present();
      return;
    }


    let profile;
    this.storage.get('profile').then(el => {
      profile = el
      if (profile) {
        let pf = JSON.parse(profile)
        this.feed.company_name = pf.company_name
        this.feed.address = pf.address
        this.feed.business_type = pf.businesstype
        this.feed.phone = pf.phone
        this.feed.created = new Date()
        this.feedService.SubmitFeed(this.feed).subscribe(x => {
          this.ngOnInit()
          this.feed = new FeedModel()
        })
      } else {
        this.authService.logout()
      }
    });
  }

}
