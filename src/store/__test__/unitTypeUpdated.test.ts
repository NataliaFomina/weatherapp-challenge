import reducer, { createInitialState, unitTypeUpdated } from "../ui";

it("updates type correctly", () => {
  const previousState = createInitialState();
  expect(reducer(previousState, unitTypeUpdated("imperial"))).toEqual({
    ...previousState,
    unitType: "imperial",
  });
});
