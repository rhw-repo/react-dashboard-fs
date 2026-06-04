export interface ErrorContent {
  title: string;
  description: string;
  instruction: string;
  imageSrc: string;
  imageAlt: string;
  buttonText: string;
}

export const GENERAL_ERROR_CONTENT: ErrorContent = {
  title: "You're right.\n There's been a \n glitch somewhere.",
  description: "We're not sure what is out of sync.",
  instruction: "Refresh or click the button to go home.",
  imageSrc: "/images/tanguy-sauvin-IBEXUZBmlXg-unsplash.webp",
  imageAlt: "A turtle in the sea raises a flipper to attract attention",
  buttonText: "Restart App"
};

export const NOT_FOUND_CONTENT: ErrorContent = {
  title: "This is awkward... \n we couldn't find what\n you're looking for.",
  description: "Let's take you back.",
  instruction: "Refresh or click the button to go home.",
  imageSrc: "/images/gary-bendig-RDFaKnyd7z4-unsplash.webp",
  imageAlt: "A turtle with a bewildered expression",
  buttonText: "Go Home"
};