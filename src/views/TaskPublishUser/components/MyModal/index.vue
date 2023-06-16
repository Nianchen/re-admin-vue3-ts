<template>
  <a-modal
    :visible="visibleshow"
    title="弹窗"
    ok-text="Create"
    cancel-text="Cancel"
    @ok="onOk"
    @cancel="onCancel"
    
  >
    <slot name="ModalContent"> </slot>
  </a-modal>
</template>
<script setup lang="ts">
const props = defineProps({
  visibleshow: Boolean,
  formState: Object,
  onOk: Function,
  onCancel:Function
});
</script>
<style scoped></style>
