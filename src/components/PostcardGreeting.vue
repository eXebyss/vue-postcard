<script setup lang="ts">
import { watch, ref, nextTick } from 'vue';
// @ts-ignore
import { useSanityFetcher } from 'vue-sanity';
import { SanityBlocks } from 'sanity-blocks-vue-component';
import JSConfetti from 'js-confetti';

const confetti = new JSConfetti();

function showConfetti() {
    confetti.addConfetti();
}

function showConfettiWithInterval() {
    setInterval(() => {
        confetti.addConfetti();
    }, 10000);
}

function showMoreConfetti() {
    const emojis = ['🎉', '🎂', '🎁', '🎈', '🥳', '🌈', '✨', '💫', '🌸', '🦄'];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];

    confetti.addConfetti({
        emojis: [emoji],
        emojiSize: 50
    });
}

showConfetti();
showConfettiWithInterval();

const { data } = useSanityFetcher('*[_type == "postcard"][0]');
const title = ref(null);

watch(data, async (requestedData) => {
    const { congratulationTitle } = requestedData;
    title.value = congratulationTitle;
    await nextTick();
    const sanityTextTitle = document.querySelector('div#sanityTitleContainer h2');
    sanityTextTitle?.classList.add('typing');
});
</script>

<template>
    <div class="carousel-item h-full w-screen">
        <div class="hero min-h-screen">
            <div class="hero-content text-center">
                <div v-if="title" id="sanityTitleContainer" class="max-w-md title">
                    <SanityBlocks :blocks="title" />
                    <button
                        type="button"
                        class="btn btn-primary text-base"
                        @click="showMoreConfetti"
                    >
                        More 🎉
                    </button>
                </div>
                <div v-else class="max-w-md">
                    <h1 class="text-6xl">No title</h1>
                    <h2 class="text-5xl py-6">John Doe</h2>
                    <button type="button" class="btn btn-primary text-xl" @click="showMoreConfetti">
                        🎉 More Confetti
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
