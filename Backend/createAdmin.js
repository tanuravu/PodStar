const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = require("./models/admin"); // Your admin model

const createAdmin = async () => {
  try {
    // Connect to the database
    await mongoose.connect("mongodb://localhost:27017/PodStar", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Hash the password
    const password = "ravu123";
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the admin
    const admin = new Admin({
      username: "adminRavu",
      email: "ravu@gmail.com",
      password: hashedPassword,
    });

    await admin.save();
    console.log("Admin user created successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error creating admin:", err);
    process.exit(1);
  }
};

createAdmin();


