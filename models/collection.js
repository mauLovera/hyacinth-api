import mongoose from 'mongoose'

const bookmarkSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  tags: {
    type: [String]
  },
},{
  timestamps: true,
})

const collectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  bookmarks: [bookmarkSchema],
  date: {
    type: String,
  },
  emoji: {
    type: String,
  }
},{
  timestamps: true,
})

const Collection = mongoose.model('Collection', collectionSchema)

export { Collection }
