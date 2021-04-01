# Notes and steps to building this project

### TECHNOLOGY STACK:
- Gatsby.js, Airtable CMS, Algolia search

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

### 11. Adding slider dots in Hero component
- Users can click on the slider dots to navigate and see different projects
- The index of the dots corresponds to the index of the images array

### 12. Creating Survey table in Airtable, setting up Airtable SDK in React
- Add a Survey table in Airtable and define its field types
- Install Airtable npm package
  - `npm i airtable`
- Create a new base instance and set it up in Airtable component
  - To access the base from Airtable in React Node, need to provide the airtable apiKey and baseId
  - Export the base
- Import the base in Survey component
- Render the Survey component in index.js home page

### 13. Fetching, displaying, and updating Survey data in Survey component
- Write a getRecords() function to fetch the Survey data from Airtable. Call this function in the useEffect() hook. We want to get the data when the Survey component loads
- When a user clicks on the Vote button, call the giveVote() function to update the votes value in Airtable based on the Survey id

### 14. Implementing search by filter functionality
- First, in the ProjectsPage, set up a graghql to query all projects data in Airtable
  - Pass down the projects array as projects props to the Projects child component, along with the page props
- In the Projects component, pass down the projects data, the setProject and the setBackToAll functions as props to the SearchButtons child component
- The SearchButtons component rendered in the Projects component allows users to search for projects by filtering the type of room they're looking for

### 15. Using Algolia for projects search
- We will be using Algolia, a popular search service for Gatsby, to search for projects in the projects page

**Setup Angolia account:**
- After signed up for an account, create an index and call it Projects
- Get the API keys and Algolia credentials in the "API Keys" menu item
- Add the API keys and credentials to the .env files for both development and production

**Setup Algolia plugin:**
- Install and configure gatsby-plugin-algolia
  - Install `npm i gatsby-plugin-algolia`
  - Configure the plugin in gatsby-config.js file
  - Important note, set the `queries` property to point to the file where queries take place

**Setup Algolia query:**
- Setup an airtable query in src/constants/algolia.js file. It's the same query we use with graphql to query projects
- Map over the project data from airtable and return a project object that has the project data
- After the query setup is fun, run: `gatsby clean && gatsby build`
- These project objects will then imported and stored in Algolia's Indices under "Projects"

**Setup basic Angolia front end functionality:**
- Install React InstantSearch: `npm i algoliasearch react-instantsearch-dom`
- Render the Algolia component in the ProjectsPage component (in pages/projects.js file)
- In src/components/Algolia.js file and in Search/Algolia component:
  - Import the algoliasearch function from algoliasearch
  - Import the InstantSearch, SearchBox, Hits, and connectHits components from react-instantsearch-dom
  - Pass in the necessary Algolia credentials to the algoliasearch() function
  - Then in the return section, render the `<InstantSearch />` component. Specify the indexName, which is Projects
    - Inside this component, render the SearchBox and Hits components

**Add styling to Algolia SearchBox component:**
- Algolia SearchBox widget docs: https://www.algolia.com/doc/api-reference/widgets/search-box/react/
- We add our own CSS custom styling to Algolia's SearchBox widget/component

**Add styling to Algolia Hits result component:**
- In src/components/Algolia.js file and in Search/Algolia component:
  - To customize the UI for the Hits component, we need to use the connectHits() function provided by Algolia
  - The connectHits() function takes `hits` as an argument. In our case, `hits` is an array of project objects that we get back from Algolia query
  - We're going to create a NewHits higher-order-component and pass in the connectHits() function as an argument. That way we can iterate over the `hits` array and apply styling to each project object
  - Then in the return section of Search/Algolia component, we're going to render the `<NewHits />` component instead of the default Hits component
  - Lastly, apply custom CSS styling to the NewHits component

### 16. Setting up context API in Gatsby
- Context API allows any components access to certain information or data in the project. Once the context provider is set up, just use the useContext() hook to access the context data
- In src/context/context.js file:
  - Create a GatsbyContext instance by calling React's createContext() function
  - From the GatsbyContext instance, we get the Provider and Consumer
  - Create a GatsbyProvider component that renders the `<GatsbyContext.Provider />` component. The GatsbyContext.Provider component can render children components
  - Export both the GatsbyContext and GatsbyProvider components
- Next, need to setup the context provider in the wrapRootElement
- In root-wrapper.js file:
  - Import the GatsbyProvider component
  - Wrap the whole application (`element`) inside of the GatsbyProvider component. This allows access to context anywhere in our application

### 17. Building the Navbar sublinks in Sidebar component
- First lets add the sublinks data to context api because we need to use it in multiple components
- In context.js file and in GatsbyProvider component:
  - Import the sublinks array data
  - Create a piece of state called isSidebarOpen that keeps track of whether the sidebar is open or not. Initialize it to false
  - Create a piece of state called links and initialize it to the sublinks array
  - Pass down these two states as objects to the `value` props of the GatsbyContext.Provider component
- In the Sidebar component:
  - Import the GatsbyContext
  - Call useContext() hook and pass in the GatsbyContext as an argument. Destructure the `links` array
  - In the return section, map over the links array and render each link its icon and label properties. Use the Gatsby's Link component to make them into links
- In the Layout component:
  - Import the GatsbyContext
  - Call useContext() hook and pass in the GatsbyContext as an argument. Destructure the `isSidebarOpen` state
  - Then in return section, write a conditional that if isSidebarOpen is true, then render the `<Sidebar />`

### 18. Building nested pages: the payments page
- To create a nested page structure in Gatsby, first create a page folder inside of the `pages` directory. Then inside this folder, create the nested page
- For example, to create a payments page that's nested in the products path, the structure will look like this:
  - /pages/products/payments.js
- The path to the nested page will look like this:
  - /products/payments
- Each time Gatsby creates a page, it passes in the props object to that page as well. We have access to the information about a page inside this props object

### 19. Toggling the Sidebar
- In context.js file and in GatsbyProvider component:
  - By default, isSidebarOpen state is set to false
  - Write a showSidebar function that sets isSidebarOpen state to true
  - Write a hideSidebar function that sets isSidebarOpen state to false
  - Pass down these two functions to the `value` props of GatsbyProvider component
- In the Navbar component: to show the Sidebar
  - Import the GatsbyContext
  - Call useContext() hook and pass in the GatsbyContext as an argument. Destructure the showSidebar function and the isSidebarOpen state
  - For the hamburger menu icon button, add an onClick event handler that executes the showSidebar function when the button is clicked. This will display the Sidebar
  - The Sidebar component is rendered in the Layout component and it's only rendered if isSidebarOpen state is true
- In the Sidebar component: to hide the Sidebar
  - Destructure the hideSidebar function from useContext()
  - For the Close button icon, add an onClick event handler that executes the hideSidebar function. Hide the Sidebar when the Close button is clicked
  - Also close the Sidebar when one of the sublinks in the Sidebar is clicked
  
### Building sublinks or nested links in Navbar menu
- In Navbar component:
  - For starter, we're going to redo our menu items in the Navbar component. We want to display the names of the parent pages as menu items in the Navbar. We get these parent pages from the `links` data from the GatsbyContext context API
  - The parent pages as menu items are rendered in the NavLink child component
- The NavLink component renders the parent menu items in the Navbar and it also renders the sub-menu or sublinks when a user hovers over the parent menu items
- We can get the sublinks data from GatsbyContext API






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
