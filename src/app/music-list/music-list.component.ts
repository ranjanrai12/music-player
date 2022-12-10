import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { MusicInterface } from '../interfaces/music.interface';

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.scss'],
})
export class MusicListComponent implements OnInit {
  @Input() allMusic: MusicInterface[] = [];
  @ViewChildren('musicListDuration')
  musicListDuration!: QueryList<ElementRef>;
  @ViewChildren('listAudioRef')
  listAudioRef!: QueryList<ElementRef>;
  @Output() activeSong = new EventEmitter<number>();
  @Input() activeSongIndex: number = 0;
  @Input() isSongPlaying: boolean = false;
  @Input() searchText: any;

  constructor() {}

  ngOnInit(): void {}

  // To show music duraion on song list, it's heavy operation
  onLoadedData() {
    this.listAudioRef.forEach((ele, index) => {
      let totalMin = Math.floor(ele.nativeElement.duration / 60);
      let totalSec: number | string = Math.floor(
        ele.nativeElement.duration % 60
      );
      if (totalSec < 10) {
        //if sec is less than 10 then add 0 before it
        totalSec = `0${totalSec}`;
      }
      this.musicListDuration.toArray()[
        index
      ].nativeElement.innerText = `${totalMin}:${totalSec}`;
    });
  }

  onPlayListSong(currentIndex: number) {
    this.activeSong.emit(currentIndex);
  }

  trackByFun(index: number, item: MusicInterface) {
    if (!item) return null;
    return item.id;
  }
}
