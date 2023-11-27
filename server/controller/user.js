const userModel = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer=require("nodemailer")
module.exports = {
  async signup(req, res) {
    // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>REGISTER",user)
    try {
      const { firstName, lastName, email, password, phone } = req.body;
      if ((!firstName, !lastName, !email, !password, !phone)) {
        return res.status(400).send("required the data");
      }
      const find = await userModel.findOne({ email: email });
      if (find) {
        return res.status(400).send("Email is already in use!");
      }
      const hash = bcrypt.hashSync(password, 10);
      const CreateUser = new userModel({
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
        password: hash,
      });
      await CreateUser.save();
      return res.status(201).send("Registered Successfully");
    } catch (err) {
      console.log(err);
      return res.status(201).send(err);
    }
  },
  async login(req, res) {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        return res.status(400).send("Veuillez fournir les informations requises.");
      }
      const exist = await userModel.findOne({ email: email });
      if (!exist) {
        return res.status(400).send("L'utilisateur n'existe pas");
      }
      const match = await bcrypt.compare(password, exist.password);
      if (!match) {
        return res.status(400).send("Mot de passe incorrect");
      } else {
        const token = jwt.sign(
          { _id: exist._id, email: exist.email },
          process.env.SECRET_KEY,
          {
            expiresIn: "30d",
          }
        );
        const userData = await userModel.findOneAndUpdate(
          { email: email },
          { token: token, status: true },
          { new: true }
        );
        return res
          .status(200)
          .json({ data: userData, message: "login successfully" });
      }
    } catch (error) {
      return res.status(400).send(error);
    }
  },

async forgotpassword (req, res) {
  const { email } = req.body;

  try {
    // Check if the user with the provided email exists
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

  
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.Nodemailer_id,
        pass: process.env.Nodemailer_pass,
      },
    });

    const mailOptions = {

      from: process.env.Nodemailer_id,
      to: user.email,
      subject: "Password Reset",
      text: `Click the following link to reset your password: ${process.env.AppURL}/reset-password/${user.email}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: "Failed to send reset email" });
      }

      console.log("Email sent: " + info.response);
      res.json({ message: "Password reset instructions sent to your email" });
    });
  } catch (error) {
    console.error("Error handling forgot password request:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
},

// Reset Password API endpoint
async resetpassword (req, res) {
  const { email, newPassword } = req.body;

  try {
    const user = await userModel.findOne({email:email});

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    res.json({ message: "Réinitialisation du mot de passe réussie" });
  } catch (error) {
    console.error("Error resetting password:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
};