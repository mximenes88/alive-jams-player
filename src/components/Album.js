import React, {Component} from 'react';
import albumData from './../data/albums.js';
import PlayerBar from './PlayerBar';


class Album extends Component {
    constructor(props) {
        super(props);

        const album = albumData.find( album=>{
            return album.slug === this.props.match.params.slug
        });

        this.state ={
            album : album,
            currentSong: album.songs[0],
            isPlaying: false
        };

        this.audioElement = document.createElement('audio');
        this.audioElement.src= album.songs[0].audioSrc;
      }

        play(){
            this.audioElement.play();
            this.setState({isPlaying: true})
        }

        pause() {
            this.audioElement.pause();
            this.setState({isPlaying:false});
        }

        setSong(song) {
            this.audioElement.src= song.audioSrc;
            this.setState({currentSong:song});
        }

        handleSongClick(song){
            const isSameSong = this.state.currentSong === song;
            if (this.state.isPlaying && isSameSong){
                this.pause();
            } else{
                if(!isSameSong) {this.setSong(song);}
                this.play();
            }
        }
        
        handleHoverOn(song) {
                this.setState({hovered: song});
            }
            
        handleHoverOff(song) {
                this.setState({hovered: null});
    
            }

        btnHandler(song, index) {
                const playBtn = <ion-icon name="play"></ion-icon>;
                const pauseBtn = <ion-icon name="pause"></ion-icon>;
                const isSameSong = this.state.currentSong === song;
                const played = this.state.currentSong;

                if (this.state.isPlaying === false && this.state.hovered === song)  {
                    return playBtn;
                  } else if (this.state.isPlaying === true && this.state.hovered === song && isSameSong) {
                    return pauseBtn;
                  } else {
                    return (index +1);
                }
            }

        handlePrevClick() {
            const currentIndex= this.state.album.songs.findIndex(song => this.state.currentSong === song);
            const newIndex = Math.max(0,currentIndex -1);
            const newSong = this.state.album.songs[newIndex];
            this.setSong(newSong);
            this.play();
        }
            

        render(){
            return(
            <section className='album'>
                <section id="album-info">
                    <img id="album-cover art" src= {this.state.album.albumCover} alt={this.state.album.title}/>
                    <div className="album-details">
                        <h1 id="album-title">{this.state.album.title}</h1>
                        <h2 id className="artist">{this.state.album.artist}</h2>
                        <div id="release-info">{this.state.album.releaseInfo}</div>
                    </div>
                </section>
                <table id="song-list">
                    <colgroup>
                        <col id="song-number-column" />
                        <col id="song-title-column" />
                        <col id="song-duration-column" />
                    </colgroup>
                    <tbody>
                        {this.state.album.songs.map((songs,index) =>
                            <tr className="song" key={index} onClick={()=> this.handleSongClick(songs)}  onMouseEnter={() => this.handleHoverOn(songs)} onMouseLeave={() => this.handleHoverOff(songs)}>
                                <td> {this.btnHandler(songs, index)} </td>
                                <td className="song-title">{songs.title}</td>
                                <td className="song-duration">{songs.duration}</td>
                            </tr>
                            )}

                    </tbody>
                </table>
                < PlayerBar 
                    isPlaying={this.state.isPlaying} 
                    currentSong={this.state.currentSong}
                    handleSongClick ={()=>this.handleSongClick(this.state.currentSong)}
                    handlePrevClick = {()=> this.handlePrevClick()}
                />
            </section>
            );
        }
    }



export default Album;