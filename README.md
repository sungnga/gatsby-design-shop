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
- Import and configure both the `gatsby-background-image` and `gbimage-bridge` plugins in gatsby-config.js file
  - Make sure to install and configure the `gatsby-transformer-sharp` and `gatsby-plugin-sharp plugins` as well
- Set up a graphql to query the background image. Do this inside of the Background component
- Render the image using the BgImage component from gbimage-bridge
  - Add the preserveStackingContext props to preserve the stacking order
  - This BgImage component renders children props. This way we can have other contents such as text, overlay filter, etc. on top of the background image
- NOTE: this Background component can be reused in future projects whenever a background image is called for





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
