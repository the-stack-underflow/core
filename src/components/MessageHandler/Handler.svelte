<script lang="ts" context="module">
	import Message from "./Message.svelte";
  
	function addMessage({ type, text }: MessageType) {
		let id = Math.random();
		messages.update(data => [...data, { type, text, id }] as MessageType[]);

		setTimeout(() => {
        messages.update(data => data.filter(msg => msg.id !== id));
    }, 5000);
	}

	export {addMessage}
</script>

<script lang="ts">
	import { messages } from "./shared";
	import type { MessageType } from "./types";
	
	let localMessages: MessageType[];
	messages.subscribe((value) => localMessages = value)
</script>

<div class="fixed left-[120px] bottom-8">
	{#each localMessages as message}
		<Message type={message.type} text={message.text}></Message>
	{/each}
</div>