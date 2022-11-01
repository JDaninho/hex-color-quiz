<script setup>
import ButtonItem from "./components/ButtonItem.vue";
import ScoreText from "./components/ScoreText.vue";
import ImageItem from "./components/ImageItem.vue";
import { reactive, ref } from "vue";

const hexValues = ["A", "B", "C", "D", "E", "F", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const hexList = ref(generateHex(3));
const backgroundValue = ref(hexList.value[Math.floor(Math.random() * 3)].value);
const state = reactive({
  count: 0,
  showImage: false,
  imageUrl: "",
});

console.log(hexList.value + " " + backgroundValue.value);

function generateHex(amount = 1) {
  let result = [];
  let iteration = 0;

  while (iteration < amount) {
    let value = "#";
    for (let i = 0; i < 6; i++) {
      value += hexValues[Math.floor(Math.random() * 15)].toString();
    }
    iteration++;
    result.push({ id: iteration, value: value });
  }
  return result;
}

function checkValues(value) {
  if (backgroundValue.value === value) {
    state.imageUrl = "./assets/correct.png";
    state.showImage = true;
    setTimeout(function () {
      state.showImage = false;
    }, 1000);
    state.count++;

    hexList.value = generateHex(3);
    backgroundValue.value = hexList.value[Math.floor(Math.random() * 3)].value;
  } else {
    state.imageUrl = "./assets/incorrect.png";
    state.showImage = true;
    setTimeout(function () {
      state.showImage = false;
    }, 1000);
    state.count = 0;
  }
}
</script>

<template>
  <div class="container-body" :style="{ backgroundColor: backgroundValue }">
    <ImageItem
      class="result"
      :image-url="state.imageUrl"
      v-show="state.showImage"
    ></ImageItem>
    <div class="score-body">
      <ScoreText class="score-text" :count="state.count"></ScoreText>
    </div>
    <div class="button-list">
      <ButtonItem
        class="button"
        v-for="item in hexList"
        :key="item.id"
        :value="item.value"
        @click="checkValues(item.value)"
      >
      </ButtonItem>
    </div>
  </div>
</template>
<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  overflow: hidden;
}

.container-body {
  min-width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.score-body {
  background-color: white;
  font-size: 24px;
  padding: 25px;
  border-radius: 25px;
}

.score-body h2 {
  margin: 0;
}

.button {
  font-size: 36px;
  z-index: 0;
  border-radius: 25px;
  margin: 25px;
  min-height: 250px;
  min-width: 750px;
}

.result {
  background-size: cover;
  z-index: 100;
  position: absolute;
  display: none;
  width: 100%;
  height: 100%;
}
</style>
