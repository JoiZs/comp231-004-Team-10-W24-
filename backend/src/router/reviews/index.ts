import { Router } from "express";
import prisma from "../../utils/prismaClient";
import { checkAuth } from "../../middleware/checkauth";

const reviewRouter = Router();

reviewRouter.post("/allreviews", async (req, res) => {
  const { sitterId } = req.body;

  if (!sitterId)
    return res.json({
      type: "error",
      message: "No review is found for that user.",
    });

  const reviews = await prisma.review.findMany({
    where: {
      receiverId: sitterId,
    },
  });

  return res.json({
    type: "success",
    message: `Found ${reviews.length} reviews`,
    data: reviews,
  });
});

reviewRouter.post("/postreview", checkAuth, async (req, res) => {
  const userid = req.context.uid;
  const { sitterId, rating, comment } = req.body;

  if (!sitterId)
    return res.json({
      type: "error",
      message: "No sitter is found.",
    });

  try {
    await prisma.review.create({
      data: {
        receiverId: sitterId,
        givenById: userid,
        rating: rating,
        comment: comment,
      },
    });
  } catch (error) {
    if (error) {
      console.log(error);
      return res.json({ type: "error", message: "Cannot make a review." });
    }
  }

  return res.json({
    type: "success",
    message: "Successfully posted a reviews.",
  });
});

reviewRouter.patch("/updatereview", checkAuth, async (req, res) => {
  const userid = req.context.uid;
  const { reviewId, rating, comment } = req.body;

  try {
    await prisma.review.update({
      where: { reviewId: reviewId, givenById: userid },
      data: { ...(rating && { rating }), ...(comment && { comment }) },
    });
  } catch (error) {
    if (error) {
      console.log(error);
      res.json({
        type: "error",
        message: "Updating review is not allowed.",
      });
    }
  }

  return res.json({
    type: "success",
    message: "Successfully updated the review.",
  });
});

export default reviewRouter;
