const Schedule = require("../models/schedule.model");
const mongoose = require("mongoose");

const schedulesController = {};

schedulesController.find = async function (req, res) {
  //const rawFilter = req.body || {};
  //const filter = { ...rawFilter, isDeleted: false };
  const filter = req.body || {};
  try {
    const schedule = await Schedule.find(filter);
    res.status(200).json(schedule);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to load schedule", error: err.message });
  }
};

schedulesController.create = async function (req, res) {
  try {
    const newSchedule = new Schedule(req.body);
    const result = await newSchedule.save();
    res.status(201).json(result);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Schedule creation failed", error: err.message });
  }
};

schedulesController.update = async function (req, res) {
  const scheduleId = req.params.id;
  const updateData = req.body;

  if (!mongoose.Types.ObjectId.isValid(scheduleId)) {
    return res.status(400).json({ message: "Invalid schedule ID" });
  }
  try {
    const updatedSchedule = await Schedule.findByIdAndUpdate(
      scheduleId,
      updateData,
      {
        new: true,
      }
    );
    if (!updatedSchedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }
    res.status(200).json(updatedSchedule);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Schedule update failed", error: err.message });
  }
};

schedulesController.delete = async function (req, res) {
  const scheduleId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(scheduleId)) {
    return res.status(400).json({ message: "Invalid schedule ID" });
  }
  try {
    const deletedSchedule = await Schedule.findByIdAndDelete(scheduleId);
    if (!deletedSchedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }
    res.status(200).json({ message: "Schedule deleted successfully" });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Schedule deletion failed", error: err.message });
  }
};

module.exports = schedulesController;
