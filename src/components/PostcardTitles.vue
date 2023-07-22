<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue';
// @ts-ignore
import { useSanityFetcher } from 'vue-sanity';
import { SanityBlocks } from 'sanity-blocks-vue-component';
// @ts-ignore
import imageUrl from '@/utils'

let observer: IntersectionObserver | null = null;

const postcardAuthors = ref(null);
const postcardYear = ref(null);
const postcardAvatars = ref(null)
const show = ref(false);

const { data } = useSanityFetcher('*[_type == "postcard"][0]{authors, year, avatars}');

onMounted(() => {
    observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            show.value = true;
        } else {
            show.value = false;
        }
    });

    const sanityTitlesContainer = document.querySelector('div#sanityTitlesContainer');

    sanityTitlesContainer && observer.observe(sanityTitlesContainer);
});

onBeforeUnmount(() => {
    observer?.disconnect();
});

watch(data, async (requestedData) => {
    const { authors, year, avatars } = requestedData;
    postcardAuthors.value = authors;
    postcardYear.value = year;
    postcardAvatars.value = avatars

});
</script>

<template>
    <div class="carousel-item h-full w-screen">
        <div class="hero min-h-screen">
            <div id="sanityTitlesContainer" class="hero-content text-center">
                <div v-if="!postcardAuthors && !postcardYear" class="max-w-md">
                    <p>No text found!</p>
                </div>
                <Transition name="slide-fade">
                    <div v-if="postcardAuthors && postcardYear && show">
                        <div className="hero-content text-center">
                            <div className="max-w-xl">
                                <SanityBlocks :blocks="postcardAuthors" />
                                <div v-if="postcardAvatars" class="my-4 flex gap-x-4 justify-center">
                                    <div v-for="avatar in postcardAvatars" :key="avatar">
                                        <div className="avatar">
                                            <div className="w-24 mask mask-squircle">
                                                <img :src="imageUrl(avatar)" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p class="text-xl my-4 italic font-bold text-primary text-center">{{ postcardYear }}</p>
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
        </div>
    </div>
</template>

<style scoped>
.slide-fade-enter-active {
    transition: all 2s ease-out;
}

.slide-fade-leave-active {
    transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}
</style>
