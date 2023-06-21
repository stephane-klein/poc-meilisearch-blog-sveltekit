<script>
    export let data;
</script>

{#each data.posts as post}
    <h1>{post.title}</h1>
    <div>{@html post.body}</div>
{/each}
