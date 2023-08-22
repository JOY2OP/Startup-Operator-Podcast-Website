<!-- NextButton.svelte -->
<script>

  import {loadNextEpisodes, fetchNextEpisodes, loadMoreEpisodes } from '../utils/app.js';
  export let nextPage;
  console.log(nextPage)


  async function handleClick() {
        await fetchNextEpisodes();
        //window.location.reload(); // Reload the page to fetch the next set of episodes
        window.location.href = nextPage;
    }

</script>




<!-- <button on:click|preventDefault={handleClick}>Next</button> -->
<div class="flex justify-center">
<button type="button" class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
  focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 
  dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" 
    on:click={handleClick}>Next</button>

</div>

