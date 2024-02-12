const statModel = require('../model/stastics')

const mongoose = require("mongoose");
module.exports = {


  async statsData(req, res) {
    try {
      if (!req.body) {
        return res.status(200).json({ message: "Body data not found" })
      }
      const userData = await statModel.create({ user: req?.body.user, card: req?.body?.cardData, total: req?.body?.totalData });
      if (!userData) {
        return res.status(200).json({ message: "Record not found" })
      }
      return res.status(200).json({ message: "Successfully created Data", data: userData })
    }
    catch (error) {
      console.error("Error staticsData :", error.message);
      return res.status(500).json({ message: "Something went wrong", data: error.message });
    }
  },

  async getAllStatsData(req, res) {
    try {
      const userData = await statModel.find();
      if (!userData) {
        return res.status(200).json({ message: "Record not found" })
      }
      return res.status(200).json({ message: "Record fetch successfully", data: userData })
    }
    catch (error) {
      console.error("Error staticsData :", error.message);
      return res.status(500).json({ message: "Something went wrong", data: error.message });
    }
  },


  async getSingleStatsData(req, res) {
    try {
      let id = req.params.id
      const userData = await statModel.find({ user: new mongoose.Types.ObjectId(id) }).sort({createdAt:-1});
      console.log(userData)
      if (!userData) {
        return res.status(200).json({ message: "Record not found" })
      }
      return res.status(200).json({ message: "Record fetch successfully", data: userData })
    }
    catch (error) {
      console.error("Error staticsData :", error.message);
      return res.status(500).json({ message: "Something went wrong", data: error.message });
    }
  },
}