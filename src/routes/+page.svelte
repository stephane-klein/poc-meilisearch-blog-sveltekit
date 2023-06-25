<script>
	import { enhance, deserialize } from '$app/forms';
    import { page } from '$app/stores';

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
    <div class="relative mt-2 flex items-center">
        <input
            class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                search: event.target.value,
                                tags: (
                                    $page.url.searchParams.has('tags')
                                    ? $page.url.searchParams.get('tags')
                                    : ''
                                )
                            })
                        });
                        const result = deserialize(await response.text());
                        data = result.data;
                    },
                    300
                );
            }}
        >
    </div>
</form>

{#each data.hits as post}
    <article class="mt-8 mb-16">
        <h1 class="text-2xl font-bold underline">{@html post?._formatted?.title ?? post?.title}</h1>
        <ul class="flex flex-row gap-2 my-2">
            {#each post?.tags as tag}
                <li
                    class="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200"
                    class:bg-yellow-200={$page.url.searchParams.has('tags') && ($page.url.searchParams.get('tags') == tag)}
                >
                    <a href="?tags={tag}">#{tag}</a>
                </li>
            {/each}
        </ul>
        <div class="prose lg:prose-lg max-w-none">
            {@html post?._formatted?.body ?? post?.body}
        </div>
    </article>
{/each}

