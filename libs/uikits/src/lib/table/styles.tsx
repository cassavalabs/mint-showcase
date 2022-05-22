import styled from "styled-components";
import { FullWidth } from "../styles";

export const TableContainer = styled(FullWidth)`
  box-sizing: border-box;
  overflow: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 0rem solid ${({ theme }) => theme.bg600};
  white-space: nowrap;
  border-radius: 0.5rem;
`;

export const TableHead = styled.thead`
  tr {
    border-bottom: 0.1rem solid ${({ theme }) => theme.bg600};
  }
`;

export const TableRow = styled.tr`
  cursor: pointer;
  transition: background-color 0.5s ease-in-out;
  :hover {
    background-color: ${({ theme }) => theme.bg200};
  }
  :not(:last-child) {
    border-bottom: 0.1rem solid ${({ theme }) => theme.bg600};
  }
`;

export const TableHeadCell = styled.th`
  height: 4.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text300};
  padding: 0.25rem 1rem;
  text-align: left;
  :nth-child(1) {
    width: 12.5%;
  }
  :nth-child(2) {
    width: 35%;
  }
  :nth-child(3) {
    width: 12.5%;
  }
  :nth-child(4) {
    width: 12.5%;
  }
  :nth-child(5) {
    width: 12.5%;
  }
  :nth-child(6) {
    width: 15%;
    text-align: right;
  }
`;

export const TableCell = styled.td`
  height: 5rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.text200};
  padding: 0.25rem 1rem;
  text-align: left;
  :nth-child(1) {
    width: 12.5%;
  }
  :nth-child(2) {
    width: 35%;
  }
  :nth-child(3) {
    width: 12.5%;
  }
  :nth-child(4) {
    width: 12.5%;
  }
  :nth-child(5) {
    width: 12.5%;
  }
  :nth-child(6) {
    width: 15%;
    text-align: right;
  }
`;
