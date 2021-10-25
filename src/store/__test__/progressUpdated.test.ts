import reducer, { createInitialState, progressUpdated } from "../ui";

it("updates progress correctly", () => {
  const previousState = createInitialState();
  expect(reducer(previousState, progressUpdated(true))).toEqual({
    ...previousState,
    progress: true,
  });
});
