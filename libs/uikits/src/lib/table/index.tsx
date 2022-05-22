import styled from "styled-components";
import Image from "next/image";
import {
  FlexColumn,
  FlexStart,
  FlexCenter,
  FlexColumnStart,
  RightIcon,
} from "../styles";
import { Text } from "../text";
import {
  ExternalLinkIcon,
  ShoppingCartIcon,
  TransferIcon,
  SaleIcon,
} from "../icons";
import {
  TableContainer,
  Table,
  TableHead,
  TableHeadCell,
  TableRow,
  TableCell,
} from "./styles";

const EventIcon = styled.span`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.text300};
  margin-right: 0.5rem;
`;

const ItemLink = styled.a`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-decoration: none;
`;

const TableLink = styled(ItemLink)`
  font-weight: 600;
  color: ${({ theme }) => theme.primary100};
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ItemImageBox = styled(FlexCenter)`
  position: relative;
  width: 4rem;
  height: 4rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.bg200};
  overflow: hidden;
  margin-right: 0.5rem;
`;

const ItemCollectionName = styled(Text)`
  font-weight: 600;
  color: ${({ theme }) => theme.text300};
  text-align: left;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ItemName = styled(ItemCollectionName)`
  font-weight: normal;
  color: ${({ theme }) => theme.text200};
  font-size: 0.875rem;
`;

const CurrencyLogo = styled.span`
  position: relative;
  width: 1rem;
  height: 1rem;
  border-radius: 100%;
  margin-right: 0.25rem;
  overflow: hidden;
`;

export const ActivitiesTable = () => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <tr>
            <TableHeadCell>Event</TableHeadCell>
            <TableHeadCell>Item</TableHeadCell>
            <TableHeadCell>Price</TableHeadCell>
            <TableHeadCell>From</TableHeadCell>
            <TableHeadCell>To</TableHeadCell>
            <TableHeadCell>Date</TableHeadCell>
          </tr>
        </TableHead>
        <tbody>
          <TableRow>
            <TableCell>
              <FlexStart>
                <EventIcon>
                  <ShoppingCartIcon />
                </EventIcon>
                <Text color="text300" weight={600}>
                  Sale
                </Text>
              </FlexStart>
            </TableCell>
            <TableCell>
              <ItemLink href="#">
                <ItemImageBox>
                  <Image
                    src="/gorilla.jpg"
                    layout="fill"
                    objectFit="cover"
                    alt="logo"
                  />
                </ItemImageBox>
                <FlexColumn>
                  <ItemCollectionName>Mad max of siluku</ItemCollectionName>
                  <ItemName>Mad max of siluku #9001</ItemName>
                </FlexColumn>
              </ItemLink>
            </TableCell>
            <TableCell>
              <ItemLink href="#">
                <FlexColumnStart>
                  <FlexStart>
                    <CurrencyLogo>
                      <Image
                        src="/gorilla.jpg"
                        layout="fill"
                        objectFit="cover"
                        alt="logo"
                      />
                    </CurrencyLogo>
                    <Text color="text300" weight={600}>
                      2.15
                    </Text>
                  </FlexStart>
                  <Text size={0.875}>$5,634.09</Text>
                </FlexColumnStart>
              </ItemLink>
            </TableCell>
            <TableCell>
              <TableLink href="#">nftFAC</TableLink>
            </TableCell>
            <TableCell>
              <TableLink href="#">silnamato</TableLink>
            </TableCell>
            <TableCell>
              <TableLink href="#">
                21 hours ago{" "}
                <RightIcon size={1.2}>
                  <ExternalLinkIcon />
                </RightIcon>
              </TableLink>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <FlexStart>
                <EventIcon>
                  <TransferIcon />
                </EventIcon>
                <Text color="text300" weight={600}>
                  Transfer
                </Text>
              </FlexStart>
            </TableCell>
            <TableCell>
              <ItemLink href="#">
                <ItemImageBox>
                  <Image
                    src="/gorilla.jpg"
                    layout="fill"
                    objectFit="cover"
                    alt="logo"
                  />
                </ItemImageBox>
                <FlexColumn>
                  <ItemCollectionName>Mad max of siluku</ItemCollectionName>
                  <ItemName>Mad max of siluku #9001</ItemName>
                </FlexColumn>
              </ItemLink>
            </TableCell>
            <TableCell>
              <ItemLink href="#">
                <FlexColumnStart>
                  <FlexStart>
                    <CurrencyLogo>
                      <Image
                        src="/gorilla.jpg"
                        layout="fill"
                        objectFit="cover"
                        alt="logo"
                      />
                    </CurrencyLogo>
                    <Text color="text300" weight={600}>
                      2.15
                    </Text>
                  </FlexStart>
                  <Text size={0.875}>$5,634.09</Text>
                </FlexColumnStart>
              </ItemLink>
            </TableCell>
            <TableCell>
              <TableLink href="#">nftFAC</TableLink>
            </TableCell>
            <TableCell>
              <TableLink href="#">silnamato</TableLink>
            </TableCell>
            <TableCell>
              <TableLink href="#">
                21 hours ago{" "}
                <RightIcon size={1.2}>
                  <ExternalLinkIcon />
                </RightIcon>
              </TableLink>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <FlexStart>
                <EventIcon>
                  <SaleIcon />
                </EventIcon>
                <Text color="text300" weight={600}>
                  Listed
                </Text>
              </FlexStart>
            </TableCell>
            <TableCell>
              <ItemLink href="#">
                <ItemImageBox>
                  <Image
                    src="/gorilla.jpg"
                    layout="fill"
                    objectFit="cover"
                    alt="logo"
                  />
                </ItemImageBox>
                <FlexColumn>
                  <ItemCollectionName>Mad max of siluku</ItemCollectionName>
                  <ItemName>Mad max of siluku #9001</ItemName>
                </FlexColumn>
              </ItemLink>
            </TableCell>
            <TableCell>
              <ItemLink href="#">
                <FlexColumnStart>
                  <FlexStart>
                    <CurrencyLogo>
                      <Image
                        src="/gorilla.jpg"
                        layout="fill"
                        objectFit="cover"
                        alt="logo"
                      />
                    </CurrencyLogo>
                    <Text color="text300" weight={600}>
                      2.15
                    </Text>
                  </FlexStart>
                  <Text size={0.875}>$5,634.09</Text>
                </FlexColumnStart>
              </ItemLink>
            </TableCell>
            <TableCell>
              <TableLink href="#">nftFAC</TableLink>
            </TableCell>
            <TableCell>
              <TableLink href="#">silnamato</TableLink>
            </TableCell>
            <TableCell>
              <TableLink href="#">
                21 hours ago{" "}
                <RightIcon size={1.2}>
                  <ExternalLinkIcon />
                </RightIcon>
              </TableLink>
            </TableCell>
          </TableRow>
        </tbody>
      </Table>
    </TableContainer>
  );
};
