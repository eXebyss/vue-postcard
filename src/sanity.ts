import { createClient } from '@sanity/client';

export default createClient({
    projectId: '3xsa4y7h',
    dataset: 'production',
    useCdn: process.env.NODE_ENV === 'production'
});
