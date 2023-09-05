<script lang='ts'>
	import { redirect } from '@sveltejs/kit';
	import { currentUser, pb } from "./pocketbase";
	import { goto } from '$app/navigation';

	export let isSignUp = true;

	let email: string
	let password: string
	let passwordConfirm: string

	async function login() {
		await pb.collection('users').authWithPassword(email, password)
		goto('/dashboard')
	}

	function switch_type() {
		isSignUp = !isSignUp
	}

	async function signUp() {
		try {
			const userData = {
				email,
				password,
				passwordConfirm
			};
			const createdUser = await pb.collection('users').create(userData);
			await login();
		} catch(err) {
			console.log(err)
		};

	}

	function signOut() {
		pb.authStore.clear();
	}

</script>

{#if $currentUser}
	<p>
		Signed in as {$currentUser.email}
	</p>
	<button type="button" class="btn variant-filled" on:click={signOut}>Sign Out</button>
{:else}
	<form class="w-full card p-4 text-token space-y-4 text-left" on:submit|preventDefault>
		<label class="label">
			<span>Email</span>
			<input class="input" type="email" placeholder="Email" bind:value={email}/>
		</label>
		<label class="label">
			<span>Password</span>
			<input class="input" type="password" placeholder="Password" bind:value={password}/>
		</label>
		{#if isSignUp}
			<label class="label">
				<span>Confirm Password</span>
				<input class="input" type="password" placeholder="Confirm Password" bind:value={passwordConfirm}/>
			</label>
			<div class="text-right">
				<button class="btn variant-filled" on:click={signUp}>Sign Up</button>
			</div>
		{:else}
			<div class="text-right">
				<button class="btn variant-filled" on:click={login}>Login</button>
			</div>
		{/if}
	</form>
	{#if isSignUp}
		<button class="btn variant-filled" on:click={switch_type}>Already have account?</button>
	{:else}
		<button class="btn variant-filled" on:click={switch_type}>Need an Account?</button>
	{/if}
{/if}