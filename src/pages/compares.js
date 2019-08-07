import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'unistore/react';
import styled from 'styled-components';
import { useStaticQuery, graphql, Link } from 'gatsby';

import EmptyState from '../components/EmptyCompares';
import { comparesStats } from '../utils/format';

const CELL_WIDTH = 150;

const query = graphql`
  query {
    pokeApi {
      pokemons(first: 150) {
        id
        name
        number
        image
        classification
        fleeRate
        maxCP
        maxHP
        height {
          minimum
          maximum
        }

        weight {
          minimum
          maximum
        }

        ...AttacksDifference
      }
    }
  }
`;

const Wrapper = styled.div`
  max-height: calc(100vh - 133px);
`;

const ScrollableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  overflow-y: hidden;
  max-height: calc(100vh - 133px);
`;

const Inner = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
`;

const Image = styled.img`
  max-width: 50px;
  max-height: 50px;
  height: auto;
  width: auto;
`;

const Head = styled.div`
  display: flex;
`;

const HeadCard = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: ${CELL_WIDTH}px;
  max-width: ${CELL_WIDTH}px;
  height: 80px;
  color: #000;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const StatTitle = styled.p`
  font-size: 13px;
  color: #9e9e9e;
`;

const RowWrapper = styled.div`
  margin: 8px 0;
`;

const Row = styled.div`
  display: flex;
`;

const Cell = styled.div`
  min-width: ${CELL_WIDTH}px;
  max-width: ${CELL_WIDTH}px;
`;

const Title = styled.h2`
  padding: 16px 16px 12px;
`;

const Compares = ({ compare }) => {
  const data = useStaticQuery(query);
  const pokemons = data.pokeApi.pokemons.filter(({ id }) => compare.includes(id));

  if (pokemons.length === 0) {
    return (
      <Wrapper>
        <Title>Compare pokemons</Title>
        <EmptyState />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Title>Compare pokemons</Title>
      <ScrollableWrapper>
        <Head>
          {pokemons.map(p => (
            <HeadCard to={`/${p.id}`}>
              <div>
                <Image src={p.image} alt={p.name} />
              </div>
              <p>{p.name}</p>
            </HeadCard>
          ))}
        </Head>
        <Inner style={{ width: pokemons.length * CELL_WIDTH }}>
          {comparesStats.map(s => (
            <RowWrapper>
              <StatTitle>{s.title}</StatTitle>
              <Row>
                {pokemons.map(p => (
                  <Cell>{s.extractor(p)}</Cell>
                ))}
              </Row>
            </RowWrapper>
          ))}
        </Inner>
      </ScrollableWrapper>
    </Wrapper>
  );
};

Compares.propTypes = {
  compare: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const enhance = connect('compare');

export default enhance(Compares);