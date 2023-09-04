<script lang='ts'>
	import { currentUser, pb } from "./pocketbase";

	let email: string
	let password: string
	let passwordConfirm: string

	async function login() {
		await pb.collection('users').authWithPassword(email, password)
	}

	async function signUp() {
		try {
			const userData = {
				email,
				password,
				passwordConfirm
			};
			console.log(userData)
			const createdUser = await pb.collection('users').create(userData);
			console.log(createdUser)
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
	<form on:submit|preventDefault>
		<input class="input" title="Email" type="text" placeholder="lastfirst@email.com" bind:value={email}/>
		<input class="input" title="Password" type="password" placeholder="supersecurepassowrd" bind:value={password}/>
		<input class="input" title="Confirm password" type="password" placeholder="supersecurepassowrd" bind:value={passwordConfirm}/>

		<button type="button" class="btn variant-filled" on:click={signUp}>Sign Up</button>
		<button type="button" class="btn variant-filled" on:click={login}>Login</button>
	</form>
{/if}