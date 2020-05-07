import { AlertifyService } from './../../_Services/alertify.service';
import { UserService } from 'src/app/_Services/user.service';
import { AuthService } from './../../_Services/auth.service';
import { environment } from './../../../environments/environment';
import { Photo } from './../../_models/photo';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[] ;
  @Output() getMemberPhotoChange = new EventEmitter<string>();


  baseUrl = environment.apiUrl;
  currentMainPhoto: Photo;

  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  response: string;
  constructor(private authSer: AuthService, private userSer: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.initializeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.authSer.decodedToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };
        this.photos.push(photo);

        if (photo.isMain) {
        this.authSer.changeMemberPhoto(photo.url);
        this.authSer.currentUser.photoUrl = photo.url;
        localStorage.setItem('user', JSON.stringify(this.authSer.currentUser));
        }
      }
    };

    }

    setMainPhoto(photo: Photo) {
      this.userSer.setMainPhoto(this.authSer.decodedToken.nameid, photo.id).subscribe(() => {
        this.currentMainPhoto = this.photos.filter(p => p.isMain === true)[0];
        this.currentMainPhoto.isMain = false;
        photo.isMain = true ;
        this.authSer.changeMemberPhoto(photo.url);
        this.authSer.currentUser.photoUrl = photo.url;
        localStorage.setItem('user', JSON.stringify(this.authSer.currentUser));
      },
      error => {
        this.alertify.error(error);
      });
    }

    deletePhoto(id: number) {
      this.alertify.confirm('Are you sure you want to delete this photo?', () => {
        this.userSer.deletePhoto(this.authSer.decodedToken.nameid, id).subscribe(() => {
          this.photos.splice(this.photos.findIndex(p => p.id === id), 1);
          this.alertify.success('Photo has been deleted');
        },
        error => {
          this.alertify.error('Failed to delete the photo');
        });
      });

    }



}
