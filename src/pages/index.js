import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/Seo"

const query = graphql`
  query {
    pokeApi {
      pokemons(first: 150) {
        name
        image
      }
    }
  }
`

const IndexPage = () => {
  const data = useStaticQuery(query)
  return (
    <Layout>
      <SEO title="Home" />
      {data.pokeApi.pokemons.map(({ name, image }) => (
        <Link to={name.toLowerCase()}>
          <img src={image} alt={name} />
          <p>{name}</p>
        </Link>
      ))}
    </Layout>
  )
}

export default IndexPage
