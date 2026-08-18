
export interface TestimonialItem {
  id: number;
  content: string;
  name: string;
  role: string;
  rating?: number;
}

export const testimonials: TestimonialItem[] = [
  {
    id: 9,
    content: "We hired Domain Dude to create a billing and tracking website plus a mobile app. The solution is easy to use, works well across desktop and mobile, and has improved our operational workflow. The team was professional, communicative, and supportive throughout the project.",
    name: "Gulf Cargo",
    role: "2 reviews · 2 photos",
    rating: 5,
  },
  {
    id: 10,
    content: "Excellent service! Professional website development, effective SEO, and great digital marketing support. Highly recommended for growing your business online.",
    name: "Prajitha Prakash",
    role: "3 reviews",
    rating: 5,
  },
  {
    id: 11,
    content: "Good service and a very professional experience overall. The team communicated clearly, delivered the work on time, and made the entire process smooth from start to finish. I would definitely recommend Domain Dude to anyone looking for reliable digital work.",
    name: "Ebin Jacob",
    role: "4 reviews",
    rating: 5,
  },
  {
    id: 12,
    content: "God service and a very positive experience overall. The team was responsive, easy to communicate with, and delivered exactly what was needed with a professional finish. I would happily recommend Domain Dude to others looking for dependable digital support.",
    name: "Sreejith Sahadevan",
    role: "",
    rating: 5,
  },
];
