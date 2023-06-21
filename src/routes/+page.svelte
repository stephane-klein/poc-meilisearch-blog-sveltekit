<script>
	import { enhance, deserialize } from '$app/forms';

    export let data;
    export let form;
    let timer;
</script>

<form
    method="POST"
    use:enhance={() => {
        return async ({ result }) => {
            data = result.data;
        }
    }}
>
    <input
        name="search"
        type="text"
        placeholder="Search here"
        value={form?.search ?? ''}
        on:keyup={(event) => {
            clearTimeout(timer);
            timer = setTimeout(async () => {
                    const response = await fetch('./', {
                        method: 'POST',
                        body: new URLSearchParams({
                            search: event.target.value
                        })
                    });
                    const result = deserialize(await response.text());
                    data = result.data;
                },
                500
            );
        }}
    />
</form>

{#each data.hits as post}
    <h1>{@html post?._formatted?.title ?? post?.title}</h1>
    <div>{@html post?._formatted?.body ?? post?.body}</div>
{/each}
