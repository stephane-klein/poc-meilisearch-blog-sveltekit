<script>
    import { markdownIt } from '../../markdown';

    export let data;
</script>

{#each data.hits as post}
    <article class="my-6">
        <h1 class="text-2xl font-bold underline">
            <a
                href={`/posts/${post.slug}/`}
            >{@html post?._formatted?.title ?? post?.title}</a>
        </h1>

        <div class="inline-flex items-center gap-x-1.5">
            <div class="my-2">Publié le : {post?.date}</div>

            <ul class="flex flex-row gap-2 my-2">
                {#each post?.tags as tag}
                    <li
                        class="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200"
                    >
                        <a href="?q=%23{tag}">#{tag}</a>
                    </li>
                {/each}
            </ul>
        </div>
    </article>
{/each}

