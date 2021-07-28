import styled from "@emotion/styled";

export const TasksListStyled = styled.article`
    border: 1px solid rgba(1, 1, 1, 0.1);
    border-radius: 5px;
    box-shadow: 3px 3px 10px rgba(1, 1, 1, 0.3);
    padding: 10px 20px;

    .divider {
        height: 1px;
        border-bottom: 1px solid rgba(1, 1, 1, 0.2);
        margin: 5px 0;
    }

    .empty-msg {
        color: rgba(1, 1, 1, 0.5);
    }
`;
