<script>
    import { markdownIt } from '../../markdown';
    export let data;
</script>

<div class="flex flex-col h-screen justify-between">
    <article class="mt-8 mb-16">
        <h1 class="text-2xl font-bold underline">
            <a
                href={data.post.slug}
            >{data.post?.title}</a>
        </h1>

        <div class="my-2">Publié le : {data.post?.date}</div>

        <ul class="flex flex-row gap-2 my-2">
            {#each data.post?.tags as tag}
                <li
                    class="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200"
                >
                    <a href="/?q=%23{tag}">#{tag}</a>
                </li>
            {/each}
        </ul>
        <div class="prose lg:prose-lg max-w-none">
            {@html markdownIt.render(data.post?.body)}
        </div>
    </article>

    <footer class="my-4">
        <form
            method="GET"
            action="/"
        >
            <div class="relative mt-2 flex items-center">
                <input
                    class="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    name="q"
                    type="text"
                    placeholder="Search here"
                >
            </div>
        </form>
    </footer>
</div>
