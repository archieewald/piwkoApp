import styled from 'styled-components';

export const Container = styled.div`
    eidth: 100%;
    padding: 5rem 0;
    display: flex;
    justify-content: center;
`;

 export const BoxWrapper = styled.div`
    width: 70%;
    border: 1px solid grey;
    border-radius: 10px;
    padding: 2rem;
    display: flex;
    justify-content: center;
`;

export const Wrapper = styled.div`
    display: flex;
    flex: 1 1 50%;
`;

export const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 2rem;
`;

export const Answers = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 50%;
    padding: 0 2rem;
`;

export const Row = styled.div`
    display flex;
    flex-direction: column;
`;

export const Answer = styled.div`
    box-sizing: content-box;
    width: 100%;
    height: 17px;
    padding: 1px;
    border: 0.5px solid green;
    background-color: white;
`;

export const Label =styled.div`
    margin: 5px 0;
`;