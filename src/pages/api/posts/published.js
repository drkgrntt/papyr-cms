import connect from 'next-connect'
import common from '../../../middleware/common/'
import Post from '../../../models/post'


const handler = connect()
handler.use(common)


handler.get(async (req, res) => {
  const posts = await Post.find({ published: true }).sort({ created: -1 }).lean()
  return res.status(200).send(posts)
})


export default (req, res) => handler.apply(req, res)