import reducer, { createInitialState, dateUpdated } from "../ui";

it("updates date correctly", () => {
  const previousState = createInitialState();
  const now = new Date().toISOString();
  expect(reducer(previousState, dateUpdated(now))).toEqual({
    ...previousState,
    date: now,
  });
});
