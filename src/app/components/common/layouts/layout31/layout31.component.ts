import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { IkVideoComponent } from 'imagekitio-angular';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-layout31',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './layout31.component.html',
  styleUrl: './layout31.component.css',
})
export class Layout31Component {
  @Input({ required: true }) id: any;
  @Input({ required: true }) isEdit: any;
  @Input() video!: string;
  @Input() autoPlay: boolean = false;
  videoUrl = environment.image_video_url_server;
  @Output() getFile = new EventEmitter<File>();

  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  isPlaying: boolean = false;

  isBase64(imagePath: any): boolean {
    return (
      (typeof imagePath === 'string' &&
        imagePath.startsWith('data:video/mp4')) ||
      imagePath.startsWith('../../../../../')
    );
  }
  // ngAfterViewInit(): void {
  //   if (
  //     this.videoPlayer &&
  //     this.videoPlayer.nativeElement instanceof HTMLVideoElement
  //   ) {
  //     const videoElement: HTMLVideoElement = this.videoPlayer.nativeElement;

  //     // Pause the video after 500 milliseconds (0.5 seconds)
  //     videoElement.muted = true;
  //     videoElement.play();
  //     setTimeout(() => {
  //       videoElement.pause();
  //     }, 500);
  //   }
  // }
  ngAfterViewInit(): void {
    const videoElement = this.videoPlayer.nativeElement;

    // Default autoplay behavior set for the default video
    if (this.autoPlay) {
      videoElement.muted = true;
      videoElement
        .play()
        .then(() => {
          this.isPlaying = true;
        })
        .catch((error) => {
          console.error(error);
        });
    }

    // Play video event
    videoElement.addEventListener('play', () => {
      this.isPlaying = true;
    });

    // Pause video event
    videoElement.addEventListener('pause', () => {
      this.isPlaying = false;
    });
  }

  togglePlayPause(): void {
    const videoElement = this.videoPlayer.nativeElement;

    if (videoElement.paused) {
      videoElement
        .play()
        .then(() => {
          this.isPlaying = true;
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      videoElement.pause();
    }
  }

  setVideo(event: any): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      const maxSize = 6 * 1024 * 1024;
      if (file.size > maxSize) {
        alert('File size exceeds the maximum limit of 6MB.');
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        const videoUrl = reader.result as string;
        this.video = videoUrl;

        this.getFile.emit(file);

        const videoElement = this.videoPlayer.nativeElement;
        videoElement.load();
        videoElement.play();
      };

      reader.readAsDataURL(file);
    }
  }
}
