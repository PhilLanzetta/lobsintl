import React, {useMemo} from 'react'
import Layout from '../components/layout'
import algoliasearch from "algoliasearch/lite"
import {
  InstantSearch,
  SearchBox,
  Hits,
  Pagination,
  useInstantSearch,
} from "react-instantsearch-hooks-web"
import Hit from "../components/searchResult"

function NoResultsBoundary({ children, fallback }) {
  const { results } = useInstantSearch()

  // The `__isArtificial` flag makes sure not to display the No Results message
  // when no hits have been returned yet.
  if (!results.__isArtificial && results.nbHits === 0) {
    return (
      <>
        {fallback}
        <div hidden>{children}</div>
      </>
    )
  }

  return children
}

function NoResults() {
  const { indexUiState } = useInstantSearch()

  return (
    <div>
      <p>
        No results for <q>{indexUiState.query}</q>.
      </p>
    </div>
  )
}

function EmptyQueryBoundary({ children, fallback }) {
  const { indexUiState } = useInstantSearch()

  if (!indexUiState.query) {
    return fallback
  }

  return children
}

const Search = () => {
  const searchClient = useMemo(
    () =>
      algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY
      ),
    []
  )

  return (
    <Layout>
      <div>
        <InstantSearch
          searchClient={searchClient}
          indexName='Pages'
        >
          <SearchBox
            placeholder="Search our Site"
            searchAsYouType={false}
          />
          <EmptyQueryBoundary fallback={null}>
            <NoResultsBoundary fallback={<NoResults />}>
              <Hits hitComponent={Hit} />
            </NoResultsBoundary>
            <Pagination
              showFirst={false}
              showLast={false}
              showNext={false}
              showPrevious={false}
            />
          </EmptyQueryBoundary>
        </InstantSearch>
      </div>
    </Layout>
  )
}

export default Search