<script setup>
import { defineProps } from 'vue';
defineProps({
  count: Number
})
</script>

<template>
    <h2>Your current guess streak is: {{count}}</h2>
</template>