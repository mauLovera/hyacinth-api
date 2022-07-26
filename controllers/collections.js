import { Collection } from "../models/collection.js"
import { Profile } from "../models/profile.js"

function index(req, res) {
  Profile.findById(req.user.profile)
    .populate("collections")
    .then((profile) => {
      res.json(profile.collections)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ err: err.errmsg })
    })
}

function create(req, res) {
  Collection.create(req.body)
    .then((collection) => {
      Profile.findById(req.user.profile).then((profile) => {
        profile.collections.push(collection)
        profile.save().then(() => {
          res.json(collection)
        })
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ err: err.errmsg })
    })
}

function deleteCollection(req, res) {
  Collection.findByIdAndDelete(req.params.id)
    .then((deletedCollection) => {
      res.json(deletedCollection)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ err: err.errmsg })
    })
}

function update(req, res) {
  Collection.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedCollection) => {
      res.json(updatedCollection)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ err: err.errmsg })
    })
}

export {
  index,
  create,
  deleteCollection as delete,
  update,
}