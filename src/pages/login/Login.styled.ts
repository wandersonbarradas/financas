import { display } from "@mui/system";
import styled from "styled-components";
import { ThemeValues } from "../../reducers/ThemeReducer";

type Props = {
    Theme: ThemeValues;
    margin: boolean;
};

export const Container = styled.div<Props>`
    width: 100%;
    background-color: #f4f3fa;
    transition: all 0.3s ease;
    padding: 0 20px;
    font-family: "Poppins", sans-serif;
    min-height: 100vh;
    display: flex;
    flex-direction: column;

    header {
        .logo {
            display: flex;
        }
    }

    main {
        flex: 1;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        .content {
            max-width: 1440px;
            display: flex;
            flex-direction: column;
            align-items: center;

            h1 {
                font-size: 2rem;
                max-width: 500px;
                text-align: center;
                font-family: "Kanit", sans-serif;
                font-weight: 700;
                color: rgba(0, 0, 0, 0.9);
                margin: 20px 0 0 0;
            }

            img {
                width: 100%;
                max-width: 550px;
                margin: 15px 0;
            }

            .btnStart {
                font-family: "Poppins", sans-serif;
                padding: 1.3em 3em;
                font-size: 0.75rem;
                text-transform: uppercase;
                letter-spacing: 2.5px;
                font-weight: 500;
                color: #fff;
                background-color: #4c49ed;
                border: none;
                border-radius: 45px;
                box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
                transition: all 0.3s ease 0s;
                cursor: pointer;
                outline: none;
                margin: 20px 0;

                &:hover {
                    background-color: #23c483;
                    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
                    color: #fff;
                    transform: translateY(-7px);
                }
                &:active {
                    transform: translateY(-1px);
                }
            }
            p {
                font-family: "Poppins", sans-serif;
                color: #7f8589;
                max-width: 500px;
                text-align: center;
                font-size: 1rem;
            }
        }
    }
    .rightSide,
    .leftSide {
        height: 100%;
    }

    .leftSide {
        min-width: 400px;
        max-width: 600px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        h1 {
            max-width: 500px;
            text-align: center;
            font-family: "Kanit", sans-serif;
            font-weight: 700;
            color: rgba(0, 0, 0, 0.9);
            margin: 0;
        }

        img {
            width: 100%;
            max-width: 550px;
            margin: 15px 0;
        }

        p {
            font-family: "Poppins", sans-serif;
            color: #7f8589;
            max-width: 500px;
            text-align: center;
        }
    }

    .contentLogin {
        width: 470px;
        margin: 200px 20px;
        background-color: #ffffff;
        padding: 16px 0;
        border-radius: 20px;
        box-shadow: 8px 13px 44px -6px rgba(0, 0, 0, 0.5);
        overflow-x: hidden;

        .headerLogin {
            display: flex;
            padding: 0 26px;
            button {
                font-family: "Poppins", sans-serif;
                flex: 1;
                padding: 15px;
                background-color: #fff;
                border: 0;
                outline: 0;
                font-weight: 600;
                font-size: 16px;
                border-bottom: 2px solid transparent;
                color: rgba(0, 0, 0, 0.6);
                cursor: pointer;
                transition: all 0.3s ease-out;

                &.active {
                    border-color: #4c49ed;
                    color: rgba(0, 0, 0, 0.9);
                }
            }
            margin-bottom: 40px;
        }

        .content {
            display: flex;
            width: calc(100% * 2);
            transition: all 0.3s ease;
            margin-left: ${(props) => (props.margin ? -100 : 0)}%;
        }

        .bodyLogin {
            flex: 1;
            padding: 0 16px;
        }

        .loginGoogle {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            color: rgba(0, 0, 0, 0.9);
            font-family: "Poppins", sans-serif;
            font-weight: 500;
            width: 100%;
            background-color: #fff;
            padding: 6px 16px;
            font-size: 16px;
            min-height: 2.8rem;
            transition: all 0.2s ease;
            box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
                0px 2px 2px 0px rgb(0 0 0 / 14%),
                0px 1px 5px 0px rgb(0 0 0 / 12%);
            border-radius: 10px;
            border: 0;
            outline: 0;
            margin-bottom: 50px;
            cursor: pointer;

            &:hover {
                box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
                    0px 4px 5px 0px rgb(0 0 0 / 14%),
                    0px 1px 10px 0px rgb(0 0 0 / 12%);
            }

            .icon {
                width: 20px;
                height: 20px;
                img {
                    width: 100%;
                }
            }
        }
        .cont {
            display: flex;
            align-items: center;
            justify-content: center;
            transform: scale(1);
            gap: 15px;
            color: #7f8589;
            font-weight: 400;
        }

        input[type="checkbox"] {
            height: 1.3rem;
            width: 1.3rem;
            margin: 5px;
            display: inline-block;
            appearance: none;
            position: relative;
            background-color: #f2ecff;
            border-radius: 15%;
            cursor: pointer;
            overflow: hidden;
        }

        input[type="checkbox"]::after {
            content: "";
            display: block;
            height: 0.5rem;
            width: 0.2rem;
            border-bottom: 0.31rem solid #afaefe;
            border-right: 0.31rem solid #afaefe;
            opacity: 0;
            transform: rotate(45deg) translate(-50%, -50%);
            position: absolute;
            top: 45%;
            left: 21%;
            transition: 0.25s ease;
        }

        input[type="checkbox"]::before {
            content: "";
            display: block;
            height: 0;
            width: 0;
            background-color: #4c49ed;
            border-radius: 50%;
            opacity: 0.5;
            transform: translate(-50%, -50%);
            position: absolute;
            top: 50%;
            left: 50%;
            transition: 0.3s ease;
        }

        input[type="checkbox"]:checked::before {
            height: 130%;
            width: 130%;
            opacity: 100%;
        }

        input[type="checkbox"]:checked::after {
            opacity: 100%;
        }

        span {
            font-size: 2rem;
        }
    }
`;
