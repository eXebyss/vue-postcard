import { createClient } from '@sanity/client';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET;
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION;

const sanityClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: import.meta.env.VITE_NODE_ENV === 'production'
});

export default sanityClient;
