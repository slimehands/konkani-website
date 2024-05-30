<script lang="ts">
    import { createPopover, melt } from '@melt-ui/svelte';
    
    const {
      elements: { trigger, content},
      states: { open },
    } = createPopover();
    export let title: String
  </script>
  
  <span
    type="button"
    class="trigger"
    use:melt={$trigger}
    aria-label="Update dimensions"
  >
    <div class="content" use:melt={$content}>
    {title}
    </div>
    <slot />
  </span>
  <style>
    .trigger {
      font-style: oblique;
      text-decoration: #6fbeff underline wavy
    }
    .content {
      background-color: hsl(207, 100%, 31%);
      color: whitesmoke;
    }
  </style>