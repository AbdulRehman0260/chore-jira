import argon2 from "argon2";
import { Customer } from "../../db/models/userModel.js";
import jwt from "jsonwebtoken";


//password security functions

//hashing password function
export const hashedPassword = async (password) => {
  try {
    const hash = await argon2.hash(password);
    return hash;
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

//verifying password entered with hashed password in the database
export const verifyPassword = async (hashedPassword, password) => {
  try {
    if (await argon2.verify(hashedPassword, password)) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
};

//this creates a user in the database and returns the created user json
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashPassword = await hashedPassword(password);
    const newUser = {
      name,
      email,
      passwordHash: hashPassword,
    };

    const user = new Customer(newUser);
    await user.save();
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/* Create login route for user
for this we need first to verify that the password entered is correct */

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Customer.findOne({ email });

    //verify the password
    if (!verifyPassword(user.passwordHash, password)) {
      return res.status(401).json({ error: error.message });
    }

    /* Create a jwt token and attach it to a cookie. This cookie will be attached to the response object and will be checked
        to see if a cookie exists (user is authenticated) */
    const payload = { user }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return res.status(200).json(user);
  } catch (error) {
    console.log("Error logging in");
    return res.status(500).json({ error: error.message });
  }
};

export const userPoints = async (req, res) => {
  try {
    console.log("Points endpoint hit");

    // Fetch fresh user data from database to get updated points
    const freshUser = await Customer.findById(req.user.user);
    const points = freshUser?.points || 0;
    console.log("Fresh user points from database:", points);

    return res.status(200).json({ points: points });

  } catch (error) {
    console.error("Error fetching user points:", error);
    return res.status(500).json({ error: "Failed to fetch points" });
  }
}

export const userLogout = async (req, res) => {
  try {
    console.log("Logout endpoint hit");

    // Clear the authentication cookie
    res.clearCookie("token");

    return res.status(200).json({ message: "Logged out successfully" });

  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).json({ error: "Failed to logout" });
  }
}

export const checkAuthStatus = async (req, res) => {
  try {
    console.log("Auth status check endpoint hit");

    const token = req.cookies.token;

    if (!token) {
      return res.status(200).json({ authenticated: false, user: null });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded && decoded.user) {
      // Fetch fresh user data from database
      const freshUser = await Customer.findById(decoded.user);
      if (freshUser) {
        return res.status(200).json({
          authenticated: true,
          user: {
            _id: freshUser._id,
            name: freshUser.name,
            email: freshUser.email,
            status: freshUser.status,
            points: freshUser.points
          }
        });
      }
    }

    return res.status(200).json({ authenticated: false, user: null });

  } catch (error) {
    console.log("Auth check failed - user not authenticated:", error.message);
    return res.status(200).json({ authenticated: false, user: null });
  }
}
