import sanityClient from '@/lib/sanity.client';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(sanityClient);

export default function imageUrl(source: {}): string {
    return builder.image(source) as unknown as string;
}
