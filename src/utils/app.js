'use strict';
console.log("working");

import axios from 'axios';
import { Buffer } from 'buffer'


//Credentials
const clientId     = `${import.meta.env.PUBLIC_CLIENT_ID}`;
const clientSecret = `${import.meta.env.PUBLIC_CLIENT_SECRET}`;

const showId = '1kRdGSsgqVpKmQJ4PWXhh3'; // The ID of the show- episodes you want to fetch
//=======================================================================================================================

let allEpisodes = [];
let offset = 0;
const limit = 50;

async function getAccessToken() {
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    return response.data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error.message);
    throw error;
  }
}

//===================

async function getShowEpisodes(accessToken, showId, page = 1, limit=50) {
  const offset = (page - 1) * limit;
  try {
    const response = await axios.get(`https://api.spotify.com/v1/shows/${showId}/episodes?market=IN&offset=${offset}&limit=${limit}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    return response.data.items;
  } catch (error) {
    console.error('API Response:', error.response?.data || error.message);
    throw error;
  }
}

//==================

export async function main(page=1) {
  try {
    const accessToken = await getAccessToken();
    const episodes = await getShowEpisodes(accessToken, showId,page);
    
    allEpisodes = episodes;
    //get episodes names
    //console.log('Show Episodes:', episodes);
    return episodes
  
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

/*
async function getEpisode(accessToken, episodeId) {
  try {
    const response = await axios.get(`https://api.spotify.com/v1/episodes/${episodeId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('API Response:', error.response?.data || error.message);
    throw error;
  }
}
*/

//No effect if kept or commented- remember to call the function below
/*
export async function mainWithEpId(episodeId) {
  try {
    const accessToken = await getAccessToken();
    if (episodeId) {
      const episode = await getEpisode(accessToken, episodeId);
      return episode;
    } else {
      const episodes = await getShowEpisodes(accessToken, showId);
      return episodes;
    }
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}
*/

//load more episodes as user scrolls
/*
export async function handleScroll(){
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const bodyHeight = document.body.offsetHeight;

  if (scrollY + windowHeight >= bodyHeight){
    loadMoreEpisodes()
  }

}
*/

//
export async function loadMoreEpisodes(){
  try {
    const accessToken = await getAccessToken();
    const episodes = await getShowEpisodes(accessToken, showId, offset, limit);
    offset += limit;

    // Handle the fetched episodes (e.g., append to the existing list)
    console.log('Fetched Episodes:', episodes);
    // Append the episodes to your current list of episodes
    allEpisodes = [...allEpisodes, ...episodes]; 
    
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}


// mainWithEpId()
main()

//Testing function 
let currentPage = 1;

// export async function getNextEpisodes() {
//   try{
//   const accessToken = await getAccessToken();
//   const episodes = await getShowEpisodes(accessToken, showId, currentPage+1, limit);
//   currentPage += 1;
//   console.log(episodes);
//   allEpisodes.push(...episodes);
// } catch (error){
//   console.error('An error occurred:', error.message);
// }}
  
export async function fetchNextEpisodes() {
  currentPage++; // Increment the page
  try {
    const accessToken = await getAccessToken();
    const episodes = await getShowEpisodes(accessToken, showId, currentPage);

    // Append the fetched episodes to the existing episodes array
    // allEpisodes = allEpisodes.concat(episodes);

    // Update the UI or trigger a reactivity update with the new episodes data
    console.log('Show Episodes:', episodes);
      return episodes;

    // You can update your UI with the new episodes here
    // For example, if you're using a framework like React, Vue, etc.
    // updateEpisodesUI(allEpisodes);
  } catch (error) {
    console.error('An error occurred:', error.message);
   
  }
}

//Load Next with page increment
export async function loadNextEpisodes() {
  const newEpisodes = await fetchNextEpisodes(); // Fetch the next episodes
  episodes = newEpisodes; // Replace existing episodes with new ones
  currentPage++; // Update the current page
}