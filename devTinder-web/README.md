# DevTinder

- Create a Vite + React application
- Remove unecessary code and create a Hello World app
- Install Tailwind CSS
- Install Daisy UI
- Add NavBar component to App.jsx
- Create a NavBar.jsx separate Component file
- Install react router dom
- Create BrowserRouter > Routes > Route = /Body > RouteChildren
- Create an Outlet in your Body Component
- Create a Footer Component
- Create a Login Page
- Install axios
- CORS - install cors in backend => add middleware to with configurations: origin, credientials: true
- When you're making API call so pass axios => {withCredientials: true}
- Install react-redux + @reduxjs/toolkit - https://redux-toolkit.js.org/tutorials/quick-start
- configureStore => Provider => createSlice => add redcucer to store
- Add redux devtools extensions in chrome
- Login and see if your data is coming properly in the store
- NavBar should update as soon as user logs in
- Refactor our code to add constants file + create a components folder
- You should not be able to access other routes without login
- If token is not present, redirect user to login page
- Logout feature
- Get the feed and add the feed in the store
- build the user card on feed
- Edit Profile Feature
- Show Toast Message on save of profile
- New Page - See all my connections
- New Page - See all my Connection Requests
- Feature - Accept/Reject Connection Request
- Send/ignore the user card from feed
- Signup New User
- E2ETesting

Body
NavBar
Route=/ => Feed
Route=/login => Login
Route=/connections => Connections
Route=/profile => Profile
