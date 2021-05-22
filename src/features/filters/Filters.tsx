import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components/macro";
import {
  filtersNames,
  selectActiveFilter,
  selectFilters,
  updateFilter,
} from "./filtersSlice";

type ButtonProps = {
  active: boolean;
};
const Button = styled.button<ButtonProps>`
  background-color: ${({ active, theme }) =>
    active ? theme.colors.ted : theme.colors.background};
  color: ${({ active, theme }) => (active ? "white" : theme.colors.ted)};
  font-weight: ${({ active }) => (active ? "900" : "700")};
  padding: 0.5em 1em;
  border: ${({ theme }) => `2px solid ${theme.colors.ted}`};
  cursor: ${({ active }) => (active ? "inherit" : "pointer")};
  border-radius: 0.5rem;
`;

const Filters = () => {
  const filters = useSelector(selectFilters);
  const activeFilter = useSelector(selectActiveFilter);
  const dispatch = useDispatch();

  return (
    <>
      {filters.map((filter) => (
        <Button
          active={filter === activeFilter}
          disabled={filter === activeFilter}
          key={filter}
          onClick={() => dispatch(updateFilter(filter))}
          type="button"
        >
          {filtersNames[filter]}
        </Button>
      ))}
    </>
  );
};

export default Filters;
