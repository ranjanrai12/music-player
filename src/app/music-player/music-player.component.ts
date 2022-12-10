import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MusicInterface } from '../interfaces/music.interface';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss'],
})
export class MusicPlayerComponent implements OnInit {
  isSongPlaying = false;
  isRepeatSongOn = false;
  isShuffleOn = false;
  searchText = '';
  @ViewChild('audioRef')
  mainAudioRef!: ElementRef;
  orignalMusic: MusicInterface[] = [];
  allMusic: MusicInterface[] = [
    {
      songName: 'Harley Bird - Home',
      artistName: 'Jordan Schor',
      img: '/assets/images/music-1.jpg',
      src: '/assets/songs/music-1.mp3',
      id: 123123,
    },
    {
      songName: 'Ikson Anywhere – Ikson',
      artistName: 'Audio Library',
      img: '/assets/images/music-2.jpg',
      src: '/assets/songs/music-2.mp3',
      id: 234567,
    },
    {
      songName: 'Beauz & Jvna - Crazy',
      artistName: 'Beauz & Jvna',
      img: '/assets/images/music-3.jpg',
      src: '/assets/songs/music-3.mp3',
      id: 567234,
    },
    {
      songName: 'Hardwind - Want Me',
      artistName: 'Mike Archangelo',
      img: '/assets/images/music-4.jpg',
      src: '/assets/songs/music-4.mp3',
      id: 456678,
    },
    {
      songName: 'Jim - Sun Goes Down',
      artistName: 'Jim Yosef x Roy',
      img: '/assets/images/music-5.jpg',
      src: '/assets/songs/music-5.mp3',
      id: 234123,
    },
    {
      songName: 'Lost Sky - Vision NCS',
      artistName: 'NCS Release',
      img: '/assets/images/music-6.jpg',
      src: '/assets/songs/music-6.mp3',
      id: 456234,
    },
    {
      songName: 'Rema - Calm Down',
      artistName: 'Selena Gomez, Rema',
      img: '/assets/images/music-7.jpg',
      src: '/assets/songs/music-7.mp3',
      id: 456643,
    },
    {
      songName: 'Love Your Voice',
      artistName: 'johnny',
      img: '/assets/images/music-8.jpg',
      src: '/assets/songs/music-8.mp3',
      id: 897231,
    },
  ];
  @ViewChild('progressArea')
  progressArea!: ElementRef;
  @ViewChild('progressBar')
  progressBar!: ElementRef;
  @ViewChild('currentTime')
  currentTime!: ElementRef;
  @ViewChild('maxDuration')
  maxDuration!: ElementRef;
  currentMusic: MusicInterface = {} as MusicInterface;
  // at loading time consider to load first music
  musicIndex = 0;
  constructor() {}

  ngOnInit(): void {
    this.orignalMusic = this.allMusic;
    this.loadMusic();
  }

  loadMusic() {
    this.currentMusic = this.allMusic[this.musicIndex];
  }

  // To start from progress bar click
  onProgressAreaClick(event: any) {
    // this.makePlayListActive();
    let progressWidth = this.progressArea.nativeElement.clientWidth; //getting width of progress bar
    let clickedOffsetX = event.offsetX; //getting offset x value
    let songDuration = this.mainAudioRef.nativeElement.duration; //getting song total duration

    this.mainAudioRef.nativeElement.currentTime =
      (clickedOffsetX / progressWidth) * songDuration;
    this.playMusic(); //calling playMusic function
    // this.playingSong();
  }

  // To play music
  playMusic() {
    this.isSongPlaying = true;
    this.mainAudioRef.nativeElement.play();
  }

  // To pause music
  pauseMusic() {
    this.isSongPlaying = false;
    this.mainAudioRef.nativeElement.pause();
  }

  playPauseMusic() {
    this.isSongPlaying = !this.isSongPlaying;
    if (this.isSongPlaying) {
      this.mainAudioRef.nativeElement.play();
    } else {
      this.mainAudioRef.nativeElement.pause();
    }
  }

  // To play previous song
  previousMusic() {
    this.musicIndex--;
    // this.makePlayListActive();
    if (this.musicIndex < 0) {
      this.musicIndex = this.allMusic.length - 1;
    }
    this.loadMusic();
    setTimeout(() => {
      this.playMusic();
    }, 100);
  }

  // To play next song
  nextMusic() {
    this.musicIndex++;
    // this.makePlayListActive();
    if (this.musicIndex > this.allMusic.length - 1) {
      this.musicIndex = 0;
    }
    this.loadMusic();
    setTimeout(() => {
      this.playMusic();
    }, 100);
  }

  onChangeAudio(event: any) {
    const currentTime = event.target.currentTime; //getting playing song currentTime
    const duration = event.target.duration; //getting playing song total duration
    let progressWidth = (currentTime / duration) * 100;
    this.progressBar.nativeElement.style.width = `${progressWidth}%`;

    let musicCurrentTime = this.currentTime;
    // update playing song current time
    let currentMin = Math.floor(currentTime / 60);
    let currentSec: number | string = Math.floor(currentTime % 60);
    if (currentSec < 10) {
      //if sec is less than 10 then add 0 before it
      currentSec = `0${currentSec}`;
    }
    musicCurrentTime.nativeElement.innerText = `${currentMin}:${currentSec}`;
  }

  // The loadeddata event occurs when data for the current frame is loaded
  onLoadedData() {
    let musicDuartion = this.maxDuration;
    let mainAdDuration = this.mainAudioRef.nativeElement.duration;
    let totalMin = Math.floor(mainAdDuration / 60);
    let totalSec: number | string = Math.floor(mainAdDuration % 60);
    if (totalSec < 10) {
      //if sec is less than 10 then add 0 before it
      totalSec = `0${totalSec}`;
    }
    musicDuartion.nativeElement.innerText = `${totalMin}:${totalSec}`;
  }

  onSongEnd() {
    // only one can be ON either repeat or shuffle at a sametime
    if (this.isRepeatSongOn && !this.isShuffleOn) {
      // Repeat song on and shuffle is OFF
      this.mainAudioRef.nativeElement.currentTime = 0; //setting audio current time to 0
      this.loadMusic();
      this.playMusic();
    } else if (this.isShuffleOn && !this.isRepeatSongOn) {
      //shuffle is ON and repeat is OFF
      let randIndex = Math.floor(Math.random() * this.allMusic.length); //genereting random index/numb with max range of array length
      do {
        randIndex = Math.floor(Math.random() * this.allMusic.length);
      } while (this.musicIndex == randIndex); //this loop run until the next random number won't be the same of current musicIndex
      this.musicIndex = randIndex; //passing randomIndex to musicIndex
      this.loadMusic();
      setTimeout(() => {
        this.playMusic();
      }, 100);
    } else {
      // Normal flow
      this.nextMusic();
    }
  }

  repeatToggle() {
    this.isRepeatSongOn = !this.isRepeatSongOn;
    this.isShuffleOn = false;
  }

  shuffleToggle() {
    this.isShuffleOn = !this.isShuffleOn;
    this.isRepeatSongOn = false;
  }

  playListActiveSong(currentIndex: number) {
    // if same song click from playList then it's go for playPause else should play the song from list
    if (currentIndex === this.musicIndex) {
      this.playPauseMusic();
    } else {
      this.musicIndex = currentIndex;
      this.loadMusic();
      setTimeout(() => {
        this.playMusic();
      }, 100);
    }
  }

  onSearch(event: any) {
    if (event.target.value) {
      this.allMusic = this.orignalMusic.filter((music: MusicInterface) =>
        music.songName.toLowerCase().includes(event.target.value.toLowerCase())
      );
    } else {
      this.allMusic = this.orignalMusic;
    }
  }
}
