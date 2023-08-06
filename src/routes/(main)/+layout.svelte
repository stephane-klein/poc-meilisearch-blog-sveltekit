<script>
    import { page } from '$app/stores';
</script>
<div class="my-4 flex flex-row items-center">
    <div class="grow flex flex-row space-x-4 font-semibold text-gray-600">
        <a
            class="hover:text-gray-900 border-red-400 px-2 py-1"
            class:border-b-4={$page.url.pathname == '/'}
            href="/">Index</a>
        <a
            class="hover:text-gray-900 border-red-400 px-2 py-1"
            class:border-b-4={$page.url.pathname == '/tags/'}
            href="/tags/"
        >Tags</a>
    </div>

    <input
        class="rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        name="q"
        type="text"
        placeholder="Search here"
        on:focus={() => { window.location = '/search/' }}
    >
</div>

<slot />
