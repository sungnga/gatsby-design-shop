import React from "react"
import { graphql } from "gatsby"
import {
  Layout,
  Hero,
  About,
  Projects,
  Survey,
  Slider,
  GridProjects,
} from "../components"
import SEO from "../components/seo"

const HomePage = ({ data }) => {
  const projects = data.allAirtable.nodes
  // console.log(projects)

  return (
    <Layout>
      <Hero />
      <About />
      <Projects projects={projects} title="latest projects" />
    </Layout>
  )
}

export const query = graphql`
  {
    allAirtable(
      filter: { table: { eq: "Projects" } }
      limit: 3
      sort: { fields: data___date, order: DESC }
    ) {
      nodes {
        id
        data {
          name
          type
          date
          image {
            localFiles {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
              }
            }
          }
        }
      }
    }
  }
`

export default HomePage
