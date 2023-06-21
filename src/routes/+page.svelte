<script>
    export let data;
</script>

<form method="POST">
    <input name="search" type="text" placeholder="Search here" />
</form>

{#each data.hits as post}
    <h1>{post.title}</h1>
    <div>{@html post.body}</div>
{/each}
