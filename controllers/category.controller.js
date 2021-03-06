const Category = require('../models/category.model')
const {
    errorHandler
} = require('../helpers/dbErrorHandling')


exports.create = (req, res) => {
    const category = new Category(req.body)

    const {
        name
    } = req.body
    Category.findOne({
        name
    }, (err, categoryEx) => {
        if (categoryEx) {
            return res.status(400).json({
                error: 'Category already exists'
            })
        } else {
            category.save((err, data) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    })
                }
                res.json({
                    data
                })
            })
        }
    })

}

exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            return res.status(400).json({
                error: "category not found"
            })
        }

        req.category = category;
        next()
    })
}

exports.readCategory = (req, res) => {
    return res.json(req.category)
}

exports.listCategories = (req, res) => {
    Category.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data)
    })
}

exports.updateCategory = (req, res) => {
    const category = req.category
    category.name = req.body.name
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data)
    })
}
exports.removeCategory = (req, res) => {
    const category = req.category
    category.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message: "Category deleted"
        })
    })
}