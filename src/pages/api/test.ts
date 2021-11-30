import { NextApiHandler } from "next"

const test: NextApiHandler = (req, res) => {
  res.json({ msg: "Hello API" })
}

 export default test
