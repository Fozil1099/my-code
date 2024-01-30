<script lang="ts" setup>
import { Modal, Input } from "@com";
</script>

<template>
  <Modal
    id="change-password"
    size="max-w-[560px]"
    title="Password"
    okClass="w-full"
    cancelClass="w-full"
  >
    <form>
      <Input
        id="Password"
        label="Password"
        inputClass="w-full"
        icon="Key"
        placeholder="••••••••••••"
      />
      <Input
        id="New password"
        label="NewPassword"
        inputClass="w-full"
        icon="Key"
        placeholder="••••••••••••"
      />
      <Input
        id="Confirm"
        label="Confirm"
        inputClass="w-full"
        icon="Key"
        placeholder="••••••••••••"
      />
    </form>
  </Modal>
</template>
