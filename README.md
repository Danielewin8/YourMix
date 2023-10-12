# CapstoneProject - YourMix - Daniel Lewin
# https://yourmix.onrender.com/

![YourMixPreview](https://github.com/Danielewin8/YourMix/assets/113627851/6776dc90-2232-4108-9ea6-0f9d7d639853)

# About
I created a ReactJS app called "YourMix." This is a Spotify playlist maker that can create diverse playlists based on specific queries. These queries use AI and ChatGPT to offer more quick and specific music based on your mood or interest. I have integrated seamless authentication and playlist creation through Spotify's API, offering an ephemeral and easy to use application.

The site uses the following technologies:
<ul>
  <li>Javascript</li>
  <li>ReactJS</li>
  <li>HTML</li>
  <li>CSS</li>
</ul> 

# Typical User Flow
The website uses two api's, Spotify's and ChatGPT's which are listed below. First, a user can authenticate and login with their own Spotify account, saving this information for use in creating playlists later. Then a user is able to search and ask for a list of songs ranging from 1 to 30 based on any request. These search queries are powered by AI and ChatGPT, allowing for a user to get more unique and different options in terms of results. These queries could be anything from asking for "Running music of a specific genre", or "Music similar to a specific artist or soundtrack" etc. ChatGPT takes these requests and responds in JSON allowing the data to then be translated and sent to Spotify to retrieve the corresponding music from there. The songs and their information are then displayed for the user, including some basic info and even a song preview for those that allow it. An option to then actually add and name this generated playlist to their own Spotify account is available. After submitting this, the user can check their  Spotify account/playlists and see their newly added mix.

# API's: 
# https://developer.spotify.com/documentation/web-api
# https://platform.openai.com/docs/introduction

# Other Comments
Overall for this project I aimed to make a simple and easy to use app that I could actually see myself using. Spotify has an incredible library of content, but I felt that sometimes searching in a more organic and specific way could be difficult. Working with AI and ChatGPT was extremely exciting and fun, and was a great way to integrate a fix to this issue to a certain degree, allowing for broader and more unique requests. I learned a lot about using and intertwining the functionality of multiple API's at once, and got a lot more practice working with React. I felt my approach and workflow I took with this really benefited me and increased my overall skills. This app was a ton of fun to make!



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
