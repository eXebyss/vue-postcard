export default {
  name: 'postcard',
  title: 'Postcard',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'congratulationTitle',
      title: 'Congratulation Title',
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      name: 'congratulationText',
      title: 'Congratulation Text',
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      name: 'year',
      title: 'Year',
      type: 'string',
    },
    {
      name: 'avatars',
      title: 'Avatars',
      type: 'array',
      of: [{type: 'avatar'}],
    },
  ],
}
