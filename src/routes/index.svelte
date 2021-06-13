<script>
	import { request } from 'graphql-request';
	import { onMount } from 'svelte';

	const query = `
query {
  books {
    title
  }
}
`;

	onMount(async () => {
		const fetcher = await request('/graphql', query);
		console.log('fetcher:', fetcher);
	});

</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
