import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { SourceWebService } from '../services/source-web.service';
import { Observable } from 'rxjs/';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public githubUserId;
  public apiKeys = [];
  public addAnotherAPIKey = false;

  constructor(public service: SourceWebService,
    public dialog: MdDialog,
    private router: Router) {
  }

  ngOnInit() {
    this.loadAPIKeys();
  }

  private loadAPIKeys() {
    // load the API keys for this user
    this.service.getAPIKeys().subscribe(
      response => {
        console.log('getting API keys', response);
        this.apiKeys = response;
      },
      error => 'ERROR: ' + <any>error
    );

    // limit keys to 5
    this.addAnotherAPIKey = (this.apiKeys.length <= environment.MAX_ALLOWED_API_KEYS);
  }

  deleteAPIKey(apiKey) {
    console.log('call delete event', apiKey);
    this.service.deleteAPIKey(apiKey).subscribe(
      response => {
        console.log('got add api key response');
        this.loadAPIKeys();
      },
      error => 'ERROR: ' + <any>error
    );
  }

  addAPIKey() {
    console.log('call add api key');
    this.service.addAPIKey("some name").subscribe(
      response => {
        console.log('got add api key response');
        this.loadAPIKeys();
      },
      error => 'ERROR: ' + <any>error
    );
  }

  deleteAccount() {
    const dialogRef = this.dialog.open(DeleteDialogResultComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        console.log('deleted account', result);
        this.service.deleteAccount().subscribe(
          response => {
            console.log('successfully deleted account');
            
            this.router.navigate(['/']);
          },
          error => 'ERROR: ' + <any>error
        );
      }
    });
  }

}

@Component({
  selector: 'app-delete-dialog-result',
  styleUrls: ['./delete-dialog-result.component.css'],
  templateUrl: './delete-dialog-result.component.html'
})
export class DeleteDialogResultComponent {
  constructor(public dialogRef: MdDialogRef<DeleteDialogResultComponent>) { }
}
