# Introduction
Jammming is a web application that allows the user to search for tracks on Spotify and create and export a playlist to the user's Spotify account. Notable technologies used to build Jammming include Javascript, React and the Spotify API. Access to a Spotify account is also required to use Jammming. The main purpose of Jammming is to demonstrate my capabilities with Javascript, React and sending requests to web APIs.

The application can be accessed [here](https://gabrielchan1.github.io/Jammming/).

# Quick Start
Jammming consists of three main components: a search bar section, a search results section and a playlist section. 

![alt text](./src/images/jammming-screenshot.png 'screenshot of Jammming application')

The search bar consists of five text fields which allows the user to search for tracks by name, album, artist, genre or year range respectively. All fields are optional; the user may search with one filter alone but can also add input into multiple fields for a more specific search.

The search results will display the tracks that match the user's query. Each track will display its title, artists and the album it belongs to. From this section, the user can also add tracks to the playlist section.

The playlist section contains a single text field which allows the user to name the playlist that would be saved to Spotify. A playlist name is required before it can be saved. This section also displays the tracks to be added to the playlist being saved. If the user decides that they no longer want a track in their playlist, they can remove this track in this section.

# Design
![alt text](./src/images/implicit-grant-diagram.png 'implicit grant flow diagram')

Each HTML element was rendered through React as a function component. As part of launching the web application, the user is first authenticated using Implicit Grant Flow. Implicit Grant Flow is an authentication method carried out on the client-side and thus, secret keys and server-side code is not required. If the authentication is successful, then an access code will be extracted from the response and a header object will be constructed from it to be used for API requests.

![alt text](./src/images/design-diagram.png 'Jammming design diagram')

The search bar and playlist components, in addition to rendering their respective sections, also sent API requests to the Spotify API. The search bar component parses the input from the text fields into the query parameter of the endpoint before sending the GET request to the Spotify API to search for tracks. The playlist component sends a GET request to obtain the user's Spotify id before sending a POST request to create a new playlist for the user and then finally sending another POST request to populate the newly created playlist with the selected tracks.

# Next Steps
I hope to continue learning new skills and building my current skills when it comes to front-end development. I also plan to learn back-end development as well. I will continue to build more projects and applications in each field and eventually become a skilled Full-Stack Developer.
