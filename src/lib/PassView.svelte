<script lang='ts'>
	import { onMount } from "svelte";
	import { currentUser, pb } from "./pocketbase";
	import type { ParkingPass } from "./types";

	let passes: ParkingPass[] = []

	onMount(async () => {
		const result = await pb.collection('parking_passes').getList(1, 3, {
			sort: 'expiration',
			expand: 'user'
		}); 

		// TODO: Clean up typescript error here
		passes = result.items as ParkingPass[]
		console.log(passes)
	})
</script>

<div>
	{#each passes as pass (pass.id)}
		<div class="card p-4 {pass.valid ? 'variant-ghost-success' : 'variant-ghost-error'} text-left p-10">
			<div class='inline-block max-w-3xl'>
				<h1>{pass.valid ? 'Valid' : 'Invalid'} Parking Pass</h1>
				<br>
				<p>User ID: {pass.user}</p>
			</div>
			<div class='inline-block p-4 text-center ml-6 border rounded'>
				<h1>{Math.round((new Date(pass.expiration).valueOf() - Date.now().valueOf()) / (1000 * 3600 * 24))}</h1>
				<br>
				<h1>Days</h1>
			</div>
		</div>
	{/each}
</div>

<style>
	h1 {
		font-size: 40px;
	}
</style>