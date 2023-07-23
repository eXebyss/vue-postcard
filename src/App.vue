<script setup lang="ts">
// @ts-ignore
import { useSanityClient } from 'vue-sanity';
import PostcardGreeting from './components/PostcardGreeting.vue';
import PostcardText from './components/PostcardText.vue';
import PostcardTitles from './components/PostcardTitles.vue';
import SecretLoot from './components/SecretLoot.vue';

useSanityClient({
    projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
    dataset: import.meta.env.VITE_SANITY_DATASET,
    apiVersion: import.meta.env.VITE_SANITY_API_VERSION,
    useCdn: import.meta.env.VITE_NODE_ENV === 'production'
});
</script>

<template>
    <div class="h-screen carousel carousel-vertical rounded-box">
        <PostcardGreeting />
        <PostcardText />
        <PostcardTitles />
        <SecretLoot />
    </div>
</template>

<style scoped></style>
