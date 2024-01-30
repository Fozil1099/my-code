<script lang="ts" setup>
import { FormControl, Input, Modal, Textarea } from "@com";
</script>

<template>
  <Modal
    id="add-schedule-modal"
    title="Add task"
    size="max-w-[32rem]"
    okClass="w-full"
    cancelClass="w-full"
  >
    <FormControl for="Day" label="Day">
      <v-select
        id="Day"
        :options="['Canada', 'United States']"
        placeholder="Day"
        clearable
      ></v-select>
    </FormControl>
    <FormControl
      for="time-from"
      label="Time"
      inputClass="grid md:grid-cols-2 gap-3"
    >
      <DatePicker
        id="Birth date"
        :autoApply="true"
        format="HH:mm"
        placeholder="From"
        time-picker
        :locale="'en'"
      ></DatePicker>
      <DatePicker
        id="Birth date"
        :autoApply="true"
        format="HH:mm"
        placeholder="To"
        time-picker
        :locale="'en'"
      ></DatePicker>
    </FormControl>
    <Input id="title" inputClass="w-full" label="Title" placeholder="Title" />
    <Textarea
      for="Description"
      label="Description"
      placeholder="Description"
      inputClass="w-full"
    />
  </Modal>
</template>
