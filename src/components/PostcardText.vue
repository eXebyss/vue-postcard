<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue';
// @ts-ignore
import { useSanityFetcher } from 'vue-sanity';
import { SanityBlocks } from 'sanity-blocks-vue-component';

let observer: IntersectionObserver | null = null;

const text = ref(null);
const show = ref(false);

onMounted(() => {
    observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            show.value = true;
        } else {
            show.value = false;
        }
    });

    const sanityTextParagraph = document.querySelector('div#sanityTextContainer');

    sanityTextParagraph && observer.observe(sanityTextParagraph);
});

onBeforeUnmount(() => {
    observer?.disconnect();
});

const { data } = useSanityFetcher('*[_type == "postcard"][0]');

watch(data, async (requestedData) => {
    const { congratulationText } = requestedData;
    text.value = congratulationText;
});
</script>

<template>
    <div class="carousel-item h-full w-screen">
        <div class="hero min-h-screen bg-base-200">
            <div id="sanityTextContainer" class="hero-content text-center">
                <Transition>
                    <div v-if="text && show" class="max-w-md">
                        <SanityBlocks :blocks="text" />
                    </div>
                </Transition>
                <div v-if="!text" class="max-w-md">
                    <p>No text found!</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 1.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
