import './css/SearchBar.css';

/* The SearchBar component contains the text bar for accepting input and the search button */
export default function SearchBar(props) {
    async function getTracks() {
        // Build the request object
        const filters = [
            document.getElementById('trackName').value,
            document.getElementById('trackAlbum').value,
            document.getElementById('trackArtist').value,
            document.getElementById('trackGenre').value,
            document.getElementById('trackYears').value
        ];
        const query = encodeURI(((filters[0] === '') ? '' : 'track:' + filters[0] + ' ') +
            ((filters[1] === '') ? '' : 'album:' + filters[1] + ' ') +
            ((filters[2] === '') ? '' : 'artist:' + filters[2] + ' ') +
            ((filters[3] === '') ? '' : 'genre:' + filters[3] + ' ') +
            ((filters[4] === '') ? '' : 'year:' + filters[4])
        );
        const url = `https://api.spotify.com/v1/search?q=${query}&type=track`;
        const req = new Request(url, {headers: props.header});

        try {
            // Send the GET request
            const res = await fetch(req);
            if (res.ok) {
                const jsonRes = await res.json();
                const tracks = [];
                // Extract the needed information from each track into a Track object
                for (const item of jsonRes.tracks.items) {
                    tracks.push({
                        key: item.id,
                        id: item.id,
                        title: item.name,
                        artist: item.artists.map(artist => artist.name).join(),
                        album: item.album.name,
                        uri: item.uri
                    })
                }
                // Update the SearchResults component
                props.onSearch(tracks);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (<div className='SearchBar'>
        <h2>SearchBar</h2>
        <input type='text' id='trackName' name='trackName' placeholder='Name'/>
        <input type='text' id='trackAlbum' name='trackAlbum' placeholder='Album'/>
        <input type='text' id='trackArtist' name='trackArtist' placeholder='Artist'/>
        <input type='text' id='trackGenre' name='trackGenre' placeholder='Genre'/>
        <input type='text' id='trackYears' name='trackYears' placeholder='Years'/>
        <h4 onClick={getTracks}>Search</h4>
    </div>);
};