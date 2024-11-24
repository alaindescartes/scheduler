import express from "express"
import { checkPassword, hashPassword } from "../../auth/authHelper.js"
import appError from "../../error.js"
import User from "../userSchema.js"

const router = express.Router()

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      next(new appError("All fields are required", 400))
      return
    }
    const user = await User.findOne({ username })

    if (!user) {
      next(new appError("User not found", 404))
      return
    }

    //check if password matches
    const isPasswordValid = checkPassword(password, user.password)
    if (!isPasswordValid) {
      next(new appError("Invalid username or password", 401))
      return
    }

    const logged_in_user = {
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      user_id: user._id,
      role: user.role,
    }

    req.session.user = logged_in_user
    res
      .status(200)
      .json({ message: "User logged in successfully", user: logged_in_user })
  } catch (err) {
    console.log("error while logging in :" + err)
    next(err)
  }
})

router.post("/register", async (req, res, next) => {
  try {
    const { password, username, lastname, firstname } = req.body

    if (!password || !firstname || !lastname || !username) {
      next(new appError("all fields must be provided", 400))
      return
    }

    //check if user exists
    const user = await User.findOne({ lastname, firstname })
    if (user) {
      next(new appError("user already exists", 400))
      return
    }

    const hashed_password = hashPassword(password)
    const newUser = new User({
      password: hashed_password,
      lastname: lastname,
      firstname: firstname,
      username: username,
    })
    //save the user
    try {
      await newUser.save()
    } catch (err) {
      throw new Error("Error saving user: " + err.message)
    }

    const user_info = {
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      username: newUser.username,
      user_id: newUser._id,
    }
    return res
      .status(200)
      .json({ message: "User registered successfully", user: user_info })
  } catch (err) {
    next(err)
  }
})

router.post("/logout", async (req, res, next) => {
  const session = req.session
  session.destroy((err) => {
    if (err) {
      return next(new appError("Failed to log out. Please try again.", 500))
    }

    //clear the session cookie
    res.clearCookie("connect.sid", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })

    return res.status(200).json({ message: "User logged out successfully" })
  })
})

router.get("/check-session", (req, res) => {
  if (req.session && req.session.user) {
    res.status(200).json({ user: req.session.user })
  } else {
    res.status(401).json({ message: "Unauthorized" })
  }
})
export default router
