import 'dotenv/config'

const PORT = process.env.PORT

const MONGOOSEURL = process.env.NODE_ENV === 'test' ? process.env.TEST_MONGOOSEURL : process.env.MONGOOSEURL

export default { PORT, MONGOOSEURL }