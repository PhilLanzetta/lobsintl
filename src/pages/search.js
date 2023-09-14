import React, { useMemo } from "react"
import Layout from "../components/layout"
import algoliasearch from "algoliasearch/lite"
import {
  InstantSearch,
  SearchBox,
  Hits,
  Pagination,
  useInstantSearch,
  Configure,
  useStats,
} from "react-instantsearch-hooks-web"
import Hit from "../components/searchResult"
import Seo from "../components/seo"
import { BsArrowRight, BsArrowLeft } from "react-icons/bs"

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

function CustomStats() {
  const { nbHits } = useStats()

  return <span>All results &#40;{nbHits.toLocaleString()}&#41;</span>
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
      <div className="search-page">
        <InstantSearch
          searchClient={searchClient}
          indexName="Pages"
          routing={true}
        >
          <SearchBox
            placeholder="Search"
            id="search-box"
            searchAsYouType={false}
            classNames={{
              root: "search-box",
              form: "search-box-form",
              input: "search-box-input",
              reset: "search-box-reset",
              submit: "search-box-submit",
              submitIcon: "search-box-icon",
              resetIcon: "search-box-icon",
            }}
          />
          <EmptyQueryBoundary fallback={null}>
            <NoResultsBoundary fallback={<NoResults />}>
              <CustomStats />
              <Hits
                hitComponent={Hit}
                classNames={{ root: "hits-container" }}
              />
              <Configure hitsPerPage={10}></Configure>
              <Pagination
                padding={2}
                showFirst={false}
                showPrevious={true}
                showNext={true}
                showLast={false}
                translations={{
                  previousPageItemText: (
                    <button
                      className="search-prev"
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      <BsArrowLeft></BsArrowLeft> Previous page
                    </button>
                  ),
                  nextPageItemText: (
                    <button
                      onClick={() => window.scrollTo(0, 0)}
                      className="search-next"
                    >
                      Next page <BsArrowRight></BsArrowRight>
                    </button>
                  ),
                  previousPageItemAriaLabel: "Go to previous page",
                  nextPageItemAriaLabel: "Go to next page",
                }}
                classNames={{
                  root: "pagination-root",
                  list: "pagination-list",
                  pageItem: "pagination-page",
                  disabledItem: "pagination-disabled",
                  selectedItem: "pagination-selected",
                }}
              ></Pagination>
            </NoResultsBoundary>
          </EmptyQueryBoundary>
        </InstantSearch>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title="Search" />

export default Search
