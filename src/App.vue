<script setup>
	import "bootstrap/dist/css/bootstrap.min.css";
	import ButtonItem from "./components/ButtonItem.vue";
	import ScoreText from "./components/ScoreText.vue";
	import ImageItem from "./components/ImageItem.vue";
	import { reactive, ref } from "vue";

	const hexValues = [
		"A",
		"B",
		"C",
		"D",
		"E",
		"F",
		0,
		1,
		2,
		3,
		4,
		5,
		6,
		7,
		8,
		9,
	];
	const hexList = ref(generateHex(3));
	const backgroundValue = ref(
		hexList.value[Math.floor(Math.random() * 3)].value
	);
	const highscore = ref(0);

	if (localStorage.getItem("highscore") !== null) {
		highscore.value = localStorage.getItem("highscore");
	}

	const state = reactive({
		count: 0,
		showImage: false,
		imageUrl: "",
	});

	console.log(localStorage.getItem("highscore"));

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
			state.imageUrl = "~/src/assets/correct.png";
			state.showImage = true;
			setTimeout(function () {
				state.showImage = false;
			}, 1000);
			state.count++;
			hexList.value = generateHex(3);
			backgroundValue.value =
				hexList.value[Math.floor(Math.random() * 3)].value;
		} else {
			state.imageUrl = "~/src/assets/incorrect.png";
			state.showImage = true;

			setTimeout(function () {
				state.showImage = false;
			}, 1000);
			if (state.count >= highscore.value) {
				localStorage.setItem("highscore", state.count);
				highscore.value = state.count;
			}
			state.count = 0;
			hexList.value = generateHex(3);
			backgroundValue.value =
				hexList.value[Math.floor(Math.random() * 3)].value;
		}
	}
</script>

<template>
	<div class="game-body" :style="{ backgroundColor: backgroundValue }">
		<ImageItem
			class="result"
			:image-url="state.imageUrl"
			v-if="state.showImage"></ImageItem>
		<div class="row justify-content-center score-body">
			<ScoreText class="score-text" :count="state.count"></ScoreText>
			<p>Highscore: {{ highscore }}</p>
		</div>
		<div class="row button-list">
			<div class="col-12">
				<ButtonItem
					class="col-md-4 col-12 button"
					v-for="item in hexList"
					:key="item.id"
					:value="item.value"
					@click="checkValues(item.value)">
				</ButtonItem>
			</div>
		</div>
	</div>
</template>
