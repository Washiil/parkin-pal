<script lang="ts">
	import { Table, tableMapperValues } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';

	const sourceData = [
		{ position: 1, email: 'example@gmail.com', grade: 11, expiration: '5 Days' },
		{ position: 2, email: 'somethingcool@gmail.com', grade: 11, expiration: '5 Days' },
		{ position: 3, email: 'othercoolthing@gmail.com', grade: 12, expiration: '5 Days' },
		{ position: 4, email: 'somethjingelsecool@gmail.com', grade: 11, expiration: '5 Days' },
		{ position: 5, email: 'polkadot@gmail.com', grade: 12, expiration: '5 Days' },
	];

	const tableSimple: TableSource = {
		// A list of heading labels.
		head: ['Email', 'Grade', 'Expires In'],
		// The data visibly shown in your table body UI.
		body: tableMapperValues(sourceData, ['email', 'grade', 'expiration']),
		// Optional: The data returned when interactive is enabled and a row is clicked.
		meta: tableMapperValues(sourceData, ['position', 'email', 'grade', 'expiration']),
		// Optional: A list of footer labels.
		foot: ['Total', '', '<code class="code">5</code>']
	};

	function onSelected(meta: unknown): void {
		console.log('on:selected', meta.detail);
	}
</script>

<div class="text-left">
	<Table source={tableSimple} interactive={true} on:selected={onSelected}/>
</div>


<style>

</style>