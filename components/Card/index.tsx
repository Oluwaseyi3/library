import styled from 'styled-components';

const Card = styled.div`
    width: 100%;
    border-radius: 15px;
    background-color: ${(props) => props.theme.white};
    box-shadow: ${(props) => props.theme.darkMode ? '0px 2px 4px #ffffff4d' : '0px 2px 4px #0000004d'};
    margin: 10px 0px;
    overflow: hidden;
`;

export default Card;
