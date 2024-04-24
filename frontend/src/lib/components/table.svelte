<script lang="ts">
	export let data: any[];
	export let fields: { key: string; label: string }[];
	export let actions:
		| [{ icon: string | undefined; name: string; action: (e: Event) => void }]
		| undefined = undefined;
</script>

<div class="table-container">
	<table class="table table-compact">
		<thead>
			<tr>
				{#each fields as field}
					<th>{field.label}</th>
				{/each}
				{#if actions}
					<th>Actions</th>
				{/if}
			</tr>
		</thead>
		<tbody>
			{#if data}
				{#each data as item}
					<tr>
						{#each fields as field}
							<td>{item[field.key]}</td>
						{/each}
						{#if actions}
							<td>
								{#each actions as action}
									<button
										class="chip variant-soft hover:variant-filled"
										on:click={(e) => action.action(e)}
									>
										{#if action.icon}
											<span><iconify-icon icon={action.icon} /></span>
										{/if}
										<span>{action.name}</span>
									</button>
								{/each}
							</td>
						{/if}
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</div>
