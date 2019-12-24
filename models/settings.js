import mongoose from 'mongoose'

const settingsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  options: { type: Object, required: true }
})

export default mongoose.model('settings', settingsSchema)
