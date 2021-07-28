import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;
`;

export const TaskStyled = styled.div`
    display: grid;
    grid-template-columns: 5% 80% 15%;
    align-items: center;
    padding: 10px 5px;
    transition: all 300ms;

    &.highlight {
        background-color: rgba(46, 137, 255, 0.15);
        border-radius: 5px;
    }

    .checkbox {
        cursor: pointer;
    }

    .description {
        text-align: left;
        overflow-wrap: break-word;
        flex-grow: 1;
        padding: 0 15px;

        &.done {
            text-decoration: line-through;
        }
    }

    .edit-icon-wrapper {
        width: 100%;
        cursor: pointer;
        display: grid;
        place-items: center right;

        img {
            height: 35px;
            opacity: 0.4;
        }
    }
`;

export const EditFormStyled = styled.div`
    overflow: hidden;
    height: 0px;
    padding-left: 35px;
    padding-right: 5px;

    .form-wrapper {
        padding: 3px 0;
        width: 100%;
        height: 100%;

        @media screen and (min-width: 360px) {
        }
    }

    &.close {
        animation: hide 500ms forwards;
    }

    &.open {
        animation: show 500ms forwards;
    }

    --formHeight: 100px;

    @media screen and (min-width: 360px) {
        --formHeight: 50px;
    }

    @keyframes show {
        from {
            height: 0;
        }
        to {
            height: var(--formHeight);
        }
    }

    @keyframes hide {
        from {
            height: var(--formHeight);
        }
        to {
            height: 0;
        }
    }
`;
