import styled from "@emotion/styled";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Home = () => {
    return (
        <Container>
            <h1>Lista de Tareas</h1>
        </Container>
    );
};

export default Home;
