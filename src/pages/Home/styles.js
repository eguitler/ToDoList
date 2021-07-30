import styled from "@emotion/styled";

export const Container = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

`
export const HomeStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    max-width: 500px;
    min-width: 250px;
    margin: 0 auto;
    gap: 30px;

    .title-wrapper {
        margin-top: 30px;
        font-size: 1rem;

        @media screen and (min-width: 480px) {
            font-size: 1.5rem;
        }
    }

    .btn-showdonetasks-wrapper {
        height: 45px;
    }

    .form-newtask-wrapper {
        width: 100%;
    }

    .lists-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
`;
