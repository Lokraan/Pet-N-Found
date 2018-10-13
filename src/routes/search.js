const db = require("../db")
const Router = require('express-promise-router')

const router = new Router()

router.get("/:url", async (req, res) => {
  const { url } = req.params
  const urls = await db.getBlogUrls()

  if(!urls) {
    res.send("Invalid URL")
    return
  }
  if(urls.includes(url)) {
    const blog = await db.getBlogByUrl(url)
    res.render("blog_post", {title: blog.title, blog: blog})
  }

  res.send("Invalid URL")

})

module.exports = router
