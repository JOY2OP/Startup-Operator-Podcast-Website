<script>
    import { onMount } from 'svelte';
    import EpisodeCard from '../components/EpisodeCard.astro';

    
    onMount(async () => {
      const accessToken = await getAccessToken();
      const fetchedEpisodes = await getShowEpisodes(accessToken, showId, offset, limit);
      episodes = [...episodes, ...fetchedEpisodes];
    });
    export let episodes;
</script>
  
  {#each episodes as episode (episode.id)}
    <EpisodeCard 
      href={`/episodes/${episode.id}`} 
      title={episode.name} 
      body={episode.description.slice(0, 145) + '...'} 
      img={episode.images[0].url} 
    />
  {/each}