# Notes and steps to building this project

### TECHNOLOGY STACK:
- Gatsby.js, Airtable CMS, Algolia

### FEATURES:
- Context API, slider, basic filtering, submenu, styled components

### To start up Gatsby dev server:
- In the terminal, run: `gatsby develop`

--------------------------------------

### 1. Setting up the root wrapper for global styles
- Import and configure the `gatsby-plugin-styled-components` plugin
- Use createGlobalStyle from styled-components plugin to create global styles for the project
  - Export a wrapRootElement function that returns the GlobalStyle component and the element value that it receives
- In the gatsby-browser.js file, make the global styles available anywhere by importing the wrapRootElement function from root-wrapper.js file 
- Copy everything in the gatsby-browser.js file and paste it into the gatsby-ssr.js file. This will make the global styles available for server-side rendering as well

### 2. Adding a background image in the Hero section
- Install and configure both the `gatsby-background-image` and `gbimage-bridge` plugins in gatsby-config.js file
  - Make sure to install and configure the `gatsby-transformer-sharp` and `gatsby-plugin-sharp plugins` as well
- Install and configure the `gatsby-source-filesystem` plugin if querying for files on the local filesystem
- Set up a graphql to query the background image. Do this inside of the Background component
- Render the image using the BgImage component from gbimage-bridge
  - Add the preserveStackingContext props to preserve the stacking order
  - This BgImage component renders children props. This way we can have other contents such as text, overlay filter, etc. on top of the background image
- NOTE: this Background component can be reused in future projects whenever a background image is called for

### 3. Building the Navbar component
- For now, we're going to hold off on the sub-menu and the sidebar
- On a smaller size screen, we will hide the navbar menu items and show the hamburger icon instead

### 4. Building the About and Title components
- The About component will iterate over a list of service objects array and display them in the About section of home page
- The Title component accepts a title as an argument and displays a title for the section

### 5. Airtable CMS setup
- Sign up for an airtable account
- Create a workspace and create a base (project name) called 'store' for our project
- Inside the 'store' base, create a Projects table. Create the fields and define its types
- Enter in the data for the Projects table
- In order to fetch the data from airtable with Gatsby plugin, we need the API_KEY and the BASE_ID
  - Generate an api key in the account settings
  - The base ID can be found under the 'Help' menu and click on 'API Documentation'

### 6. Connecting Airtable to Gatsby
- Install and configure the `gatsby-source-airtable` plugin
  - In the config setup, provide the apiKey and baseId for the tables. Use env variables for this. Also provide the tableName

### 7. Building the Projects component, querying projects for home page
- Set up a graphql to query the latest three projects from airtable
- Use pageQuery to make the query inside of the HomePage component
- Then pass down the projects array as projects props to the Projects child component. Also pass down the title props
- Display the three projects in the Latest Projects section of the home page
- At the bottom of the Latest Projects section, add an All Projects link that redirects to the projects page

### 8. Adding Customers table, querying customers in Slider component
- In Airtable 'store' base, add a Customers table. Create the fields and define its types
- Enter in the data for the Customers table
- In the gatsby-config.js file, add another table object to the `tables` array for the Customers table
- Set up a graphql in the Slider component to query the customers data
- Render the Slider and Title components in the HomePage component

### 9. Building the customers Slider component
- In Slider component, iterate over the customers array and display one customer in a slider at a time
- Add Prev and Next buttons to see the previous or next customer's review
- Only the customer whose index is equal to the index in state will be displayed 

### 10. Building the background image slider in Hero component
- In the index.js home page, we queried for the projects data. Pass down the projects array as projects props to the Hero child component
- In the Hero component, receive the projects props
  - Iterate over the projects array, and only get back an array of images from it
  - Pass down an image props to the Background child component. The image is from the images array at a particular index. The Background component will render this image, if it exists. Else, it will render its default background image
  - Add the Prev and Next buttons to see the next or previous project image
  - Also write conditionals to handle cases where the slider reaches pass the last index of the images array and pass the first index of the array

### Adding slider dots in Hero component
- Users can click on the slider dots to navigate and see different projects
- The index of the dots corresponds to the index of the images array

### Creating Survey table in Airtable, setting up Airtable SDK in React
- Add a Survey table in Airtable and define its field types
- Install Airtable npm package
  - `npm i airtable`
- Create a new base instance and set it up in Airtable component
  - To access the base from Airtable in React Node, need to provide the airtable apiKey and baseId
  - Export the base
- Import the base in Survey component
- Render the Survey component in index.js home page

### Fetching, displaying, and updating Survey data in Survey component
- Write a getRecords() function to fetch the Survey data from Airtable. Call this function in the useEffect() hook. We want to get the data when the Survey component loads
- When a user clicks on the Vote button, call the giveVote() function to update the votes value in Airtable based on the Survey id






--------------------------------------

## Setup

- folders/files/imports
- css (styled components)
- error page, footer, seo

## Styled Components

VS-Extension

vscode-styled-components

Regular Setup

```jsx
import styled from "styled-components"
const NameOfElement = styled.htmlElement`
your
styles
go
here
`
```

Global Styles

```jsx
import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
your
global
styles
go here
`
// wrap root element
export const wrapRootElement = ({ element }) => {
  return (
    <>
      <GlobalStyle />
      {element}
    </>
  )
}

Both files
- gatsby-browser.js
- gatsby-ssr.js

```

## Gatsby Background Image

```bash
npm install --save gatsby-background-image

```

## Airtable

[airtable](https://airtable.com/invite/r/h4p0v9Vg)

## env variables

gatsby-config

```js
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
```

#### ROOT!!!!!!!!!!!!!!!

.env.development
.env.production

## Algolia

[algolia](https://www.algolia.com/);
