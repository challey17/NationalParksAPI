"use strict";

// put your own value below!
const apiKey = "H4ICqlHFH8sNsOGrkkMIyIK9sNkUAQl3sFPdjV03";
const searchURL = "https://developer.nps.gov/api/v1/parks";

function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(
    key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  );
  return queryItems.join("&");
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $("#results-list").empty();
  // iterate through the items array

  for (let i = 0; i < responseJson.data.length; i++) {
    //for each item, add html to results list
    console.log("forloop runs");
    $("#results-list").append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      
      <a href='${responseJson.data[i].url}'>${responseJson.data[i].url}</a>
      </li>`
    );
  }
  $("#results").removeClass("hidden");
  //display the results section

  console.log("displayResults running ok");
}

function getParks(query, maxResults) {
  const params = {
    //key: apiKey,
    stateCode: query,

    limit: maxResults
  };
  const queryString = formatQueryParams(params);
  const url = searchURL + "?" + queryString + "&api_key=" + apiKey;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $("#js-error-message").text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  console.log("watchForm running ok");
  $("form").submit(event => {
    event.preventDefault();
    const searchTerm = $("#js-search-term").val();
    const maxResults = $("#js-max-results").val();
    getParks(searchTerm, maxResults);
  });
}

$(watchForm);
