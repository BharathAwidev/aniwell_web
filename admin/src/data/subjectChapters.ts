export const subjectChapterTopicMap: Record<
  string,
  Record<string, string[]>
> = {
  maths: {
    Algebra: [
      "Linear Equations",
      "Quadratic Equations",
      "Polynomials",
    ],
    Geometry: [
      "Lines & Angles",
      "Triangles",
      "Circles",
    ],
    Trigonometry: [
      "Trigonometric Ratios",
      "Heights & Distances",
    ],
  },

  physics: {
    Motion: [
      "Speed & Velocity",
      "Acceleration",
      "Equations of Motion",
    ],
    Force: [
      "Newton’s Laws",
      "Friction",
      "Momentum",
    ],
  },

  chemistry: {
    "Atomic Structure": [
      "Subatomic Particles",
      "Atomic Models",
    ],
    Reactions: [
      "Types of Reactions",
      "Balancing Equations",
    ],
  },

  biology: {
    Cell: [
      "Cell Structure",
      "Cell Division",
    ],
    LifeProcesses: [
      "Nutrition",
      "Respiration",
    ],
  },
}
