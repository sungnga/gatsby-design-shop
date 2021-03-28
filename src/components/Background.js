import React from "react"
import styled, { keyframes } from "styled-components"
import { graphql, useStaticQuery } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import { BgImage } from "gbimage-bridge"

const query = graphql`
  {
    placeholderImage: file(relativePath: { eq: "mainBcg.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
      }
    }
  }
`

const Background = ({ children }) => {
  const { placeholderImage } = useStaticQuery(query)
  const pluginImage = getImage(placeholderImage)

  return (
    <Wrapper>
      <BgImage
        image={pluginImage}
        className="bcg"
        preserveStackingContext={true}
      >
        {children}
      </BgImage>
    </Wrapper>
  )
}

const fadeIn = keyframes`
      from{
         background-color:rgb(0,0,0,0.8);
      }
      to{
        background-color:rgba(0,0,0,0.4);
      }
      `

const Wrapper = styled.section`
  .bcg {
    /* MUST!!!!!! */
    min-height: 100vh;
    margin-top: -5rem;
    background: rgba(0, 0, 0, 0.5);
    display: grid;
    place-items: center;
    animation: ${fadeIn} 2s ease-in-out 1 forwards;
  }
  .bcg::before {
    opacity: 1;
  }
`
export default Background
