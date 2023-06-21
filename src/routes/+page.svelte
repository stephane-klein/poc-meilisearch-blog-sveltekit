<script>
	import { enhance } from '$app/forms';

    export let data;
    export let form;
</script>

<form
    method="POST"
    use:enhance={() => {
        return async ({ result }) => {
            data = result.data;
        }
    }}
>
    <input name="search" type="text" placeholder="Search here" value={form?.search ?? ''} />
</form>

{#each data.hits as post}
    <h1>{post.title}</h1>
    <div>{@html post.body}</div>
{/each}
