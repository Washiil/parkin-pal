<script>
	import AdminView from "$lib/AdminView.svelte";
	import Login from "$lib/Login.svelte";
	import PassView from "$lib/PassView.svelte";
	import { currentUser } from "$lib/pocketbase";
</script>
<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">

		{#if $currentUser}
			<AdminView/>
		{/if}
		
		<Login/>

	</div>
</div>

<style lang="postcss">
	@keyframes glow {
		0% {
			@apply bg-primary-400/50;
		}
		33% {
			@apply bg-secondary-400/50;
		}
		66% {
			@apply bg-tertiary-400/50;
		}
		100% {
			@apply bg-primary-400/50;
		}
	}
	@keyframes pulse {
		50% {
			transform: scale(1.5);
		}
	}
</style>
