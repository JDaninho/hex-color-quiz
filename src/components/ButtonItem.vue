<script setup>
import {defineProps} from 'vue'
defineProps({
  value: String
})
</script>

<template>
    <button :id="value">{{value}}</button>
</template>
