# Kusapoting-frontend

Frontend for Kusaposting - a social media webapp.
Cloud functions for this project can be found [here](https://github.com/Azargaz/Kusaposting-backend).

### Technologies

This project was created in order to learn fullstack React using Google's Firebase.
Technologies used:
- [Google's Firebase](https://firebase.google.com/) including Cloud Functions, Database, Storage and Authentication,
- [React](https://reactjs.org) as a core of this frontend,
- [React-Redux](https://react-redux.js.org/) for state storage,
- [Material-UI](https://material-ui.com/) for styling.

### Running

Use `npm start` to run the React app locally.

### Building and deployment

Use `npm build` to build the React app.
If you want to deploy the app to Firebase hosting you will need to:
- Initialize firebase directory with `firebase init`, choose your firebase project and select only the hosting option.
- Set the `public` directory to `build`.
- Configure as a single-page app.
- Don't override the `index.html`.
- Use `firebase deploy` to deploy and you should be finished.

### Credits

- [Full Stack React & Firebase Tutorial](https://youtu.be/m_u6P5k0vP0) by [Classed](https://github.com/hidjou)
