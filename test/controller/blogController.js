const Blog = require('../../models/blog');

const blog_index = (req, res) => {
    Blog.find().then((result) => {
        res.render('about', { title: 'all blogs', blogs: result });
    }).catch((err) => {
        console.log(err);
    });
}
 
const blog_creat_get = (req, res) => {
    res.render('new-blog', { title: 'new-blog' });

}
const blog_creat_post = (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            res.redirect('/all-blog');
        })
        .catch((err) => {
            console.log(err);
        });
}
const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: '/all-blog' });//give a respond to broweser in json 
        }).catch(err => console.log(err));
}

module.exports = {
    blog_index,
    // blog_detail,
    blog_creat_get,
    blog_creat_post,
    blog_delete
}