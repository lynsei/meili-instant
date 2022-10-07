import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";

const search = instantsearch({
  indexName: "steam-video-games",
  searchClient: instantMeiliSearch(
    "https://integration-demos.meilisearch.com",
    "99d1e034ed32eb569f9edc27962cccf90b736e4c5a70f7f5e76b9fab54d6a185",
    {
      limitPerRequest: 30
    }
  )
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: "#searchbox"
  }),
  instantsearch.widgets.clearRefinements({
    container: "#clear-refinements"
  }),
  instantsearch.widgets.refinementList({
    container: "#genres-list",
    attribute: "genres"
  }),
  instantsearch.widgets.refinementList({
    container: "#players-list",
    attribute: "players"
  }),
  instantsearch.widgets.refinementList({
    container: "#platforms-list",
    attribute: "platforms"
  }),
  instantsearch.widgets.configure({
    hitsPerPage: 6,
    snippetEllipsisText: "...",
    attributesToSnippet: ["description:50"]
  }),
  instantsearch.widgets.refinementList({
    container: "#misc-list",
    attribute: "misc"
  }),
  instantsearch.widgets.hits({
    container: "#hits",
    templates: {
      item: `
        <div>
          <div class="hit-name">
            {{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}
          </div>
          <img src="{{image}}" align="left" />
          <div class="hit-description">
            {{#helpers.snippet}}{ "attribute": "description" }{{/helpers.snippet}}
          </div>
          <div class="hit-info">price: {{price}}</div>
          <div class="hit-info">release date: {{releaseDate}}</div>
        </div>
      `
    }
  }),
  instantsearch.widgets.pagination({
    container: "#pagination"
  })
]);

search.start();
