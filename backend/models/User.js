const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      text: true,
    },

    last_name: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      text: true,
    },

    username: {
      type: String,
      required: [true, "username is required"],
      trim: true,
      text: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      text: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    picture: {
      type: String,
      trim: true,
    },
    cover: {
      type: String,
      trim: true,
    },

    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: ["male", "female", "other"],
    },
    birth_year: {
      type: Number,
      required: [true, "Birth year is required!"],
      trim: true,
    },
    birth_month: {
      type: Number,
      required: [true, "Birth month is required!"],
      trim: true,
    },
    birth_day: {
      type: Number,
      required: [true, "Birth day is required!"],
      trim: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    friends: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    requests: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
    search: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    details: {
      bio: {
        type: String,
      },
      other_name: {
        type: String,
      },
      job: {
        type: String,
      },
      work_place: {
        type: String,
      },
      high_school: {
        type: String,
      },
      current_city: {
        type: String,
      },
      hometown: {
        type: String,
      },
      relationship: {
        type: String,
        enum: ["Single", "In a relationship", "Married", "Divorced"],
      },
      instagram: {
        type: String,
      },
      saved_posts: [
        {
          post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
          },
          saved_at: {
            type: Date,
            default: new Date(),
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
