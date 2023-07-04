<script>
	import { deserialize } from '$app/forms';
    import { page } from '$app/stores';
    import {
        goto
    } from '$app/navigation';
    import { parseSearchString } from './../parser';
    import { markdownIt } from '../markdown';

    export let data;
    export let form;
    export let tags;

    $: (
        { tags } = parseSearchString(
            $page.url.searchParams.has('q')
                ? $page.url.searchParams.get('q')
                : ''
        )
    );

    let timer;

    async function handleSubmit() {
        const data = new FormData(this);
        console.log(data.get('search'));
        goto(`./?q=${encodeURIComponent(data.get('search'))}`);
    }

</script>

<form
    method="POST"
    on:submit|preventDefault={handleSubmit}
>
    <div class="relative mt-2 flex items-center">
        <input
            class="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            name="search"
            type="text"
            placeholder="Search here"
            value={
                form?.search ?? (
                    $page.url.searchParams.has('q')
                        ? $page.url.searchParams.get('q')
                        : ''
                )
            }
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
                    300
                );
            }}
        >
    </div>
</form>

{#each data.hits as post}
    <article class="mt-8 mb-16">
        <h1 class="text-2xl font-bold underline">
            <a
                href={post.slug}
            >{@html post?._formatted?.title ?? post?.title}</a>
        </h1>

        <div class="my-2">Publié le : {post?.date}</div>

        <ul class="flex flex-row gap-2 my-2">
            {#each post?.tags as tag}
                <li
                    class="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200"
                    class:bg-yellow-200={tags.includes(tag)}
                >
                    <a href="?q=%23{tag}">#{tag}</a>
                </li>
            {/each}
        </ul>
        <div class="prose lg:prose-lg max-w-none">
            {@html markdownIt.render(post?._formatted?.body ?? post?.body)}
        </div>
    </article>
{/each}

