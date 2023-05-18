import './App.css';
import { useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
import validate from './login';

let accessHeader;

// If there is no hash string, then an access token is needed from the Spotify API
if (window.location.hash.length < 1) {
    validate();
}
// Otherwise, a response has already been sent by the Spotify API. 
else {
    // Extract arguments from final URL hash fragment object
    const hash = window.location.hash
        .substring(1)
        .split('&')
        .reduce(function (initial, item) {
            if (item) {
                const parts = item.split('=');
                initial[parts[0]] = decodeURIComponent(parts[1]);
            }
            return initial;
        }, {});
    // If there is an access token in the response, construct a header containing it
    if (Object.hasOwn(hash, 'access_token')) {
        accessHeader = new Headers({ 'Authorization': `Bearer ${hash.access_token}` });
    }
    else {
        alert('Failed to obtain access token from the Spotify API. Refresh the page to try again.');
        console.log(`Access denied: ${hash.error}`)
    }
    window.location.hash = '';
}

export default function App() {
    const [searchResultTracks, setSearchResultTracks] = useState([]);
    const [playlist, setPlaylist] = useState({
        name: '',
        tracks: []
    });

    function handleAddPlaylistTrack(track) {
        if (playlist.tracks?.every((t) => { return t.id !== track.id; })) {
            setPlaylist({ ...playlist, tracks: [...playlist.tracks, track] });
        }
    }

    function handleRemovePlaylistTrack(trackId) {
        setPlaylist({ ...playlist, tracks: playlist.tracks?.filter((t) => { return t.id !== trackId; }) });
    }

    return (
        <div className="App">
            <SearchBar header={accessHeader} onSearch={setSearchResultTracks} />
            <SearchResults onAddPlaylistTrack={handleAddPlaylistTrack} tracks={searchResultTracks} />
            <Playlist onRemoveTrack={handleRemovePlaylistTrack}
                onSavePlaylist={setPlaylist}
                header={accessHeader}
                name={playlist.name}
                tracks={playlist.tracks} />
        </div>
    );
};
