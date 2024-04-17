<script lang="ts">
	export let style: string = '';
</script>

<div class={`card p-4 flex flex-col gap-4 ${style}`}>
	<slot />
</div>
