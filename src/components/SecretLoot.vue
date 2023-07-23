<script setup lang="ts">
import { watch, ref } from 'vue';
// @ts-ignore
import { useSanityFetcher } from 'vue-sanity';
// @ts-ignore
import imageUrl from '@/utils/sanity.imageUrl';

const { data } = useSanityFetcher('*[_type == "postcard"][0]{secretLoot}');
const images = ref(null);

watch(data, async (requestedData) => {
    const { secretLoot } = requestedData;
    images.value = secretLoot;
});
</script>

<template>
    <div class="carousel-item h-full w-screen">
        <div class="hero min-h-screen">
            <div class="hero-content text-center flex-wrap">
                <h2 class="text-warning">❓Secret Loot</h2>
                <div v-if="images" id="sanityTitleContainer" class="max-w-md title">
                    <div v-for="image in images" :key="image">
                        <img :src="imageUrl(image)" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
