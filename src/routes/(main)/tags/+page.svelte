<script>
    export let data;
    console.log(data.facetDistribution.tags);
</script>
<ul>
{#each Object.entries(data.facetDistribution.tags) as [name, number]}
    <li><a href={`/tags/${name}/`}>{name} ({number})</a></li>
{/each}
</ul>
