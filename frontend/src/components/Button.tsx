import { tv } from "tailwind-variants";

const button = tv({
  base: "flex justify-center-items-center bg-cyan-600 text-neutral-50 rounded p-4",
});

const Button = () => {
  return <button className={button()}>Test</button>;
};

export default Button;
