<script lang="ts">
    import { createPopover, melt } from '@melt-ui/svelte';
    
    const {
      elements: { trigger, content},
      states: { open },
    } = createPopover();
    export let is: String
  </script>
  
  <button
    type="button"
    class="trigger"
    use:melt={$trigger}
    aria-label="Update dimensions"
  >
    <div use:melt={$content}>
    {is}
    </div>
    <slot />
  </button>
  