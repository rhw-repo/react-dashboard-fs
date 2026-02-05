import { tv } from "tailwind-variants";

const test_button = tv({
  base: "flex justify-center-items-center bg-cyan-600 text-neutral-50 rounded p-4",
});

const TestButton = () => {
  return (
    <button className={test_button()}>Conventional Component Button</button>
  );
};

export default TestButton;
