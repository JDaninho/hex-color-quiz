<script setup>
import { defineProps } from "vue";

defineProps({
  imageUrl: String,
});
</script>

<template>
  <img class="result" id="result" :src="imageUrl" />
</template>
